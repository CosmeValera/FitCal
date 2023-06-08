import { Component, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { GoalDialogComponent } from '@shared/components/goal-dialog/goal-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { SocialAuthService } from '@abacritt/angularx-social-login';
import { AuthService } from '@shared/services/auth.service';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { LoginService } from '@shared/services/login/login.service';
import { IGoogleAuth } from './model/GoogleAuth.model';
import { PersonalInformationComponent } from '@shared/components/personal-information/personal-information.component';
import { CaloriesDialogComponent } from '@shared/components/calories-dialog/calories-dialog.component';
import { User } from '@shared/interfaces/userInterface';
import { CaloriesProfileComponent } from '@shared/components/calories-profile/calories-profile.component';
import { UserService } from '@shared/services/user.service';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {
  @ViewChildren(PersonalInformationComponent)
  informacionPersonal!: QueryList<PersonalInformationComponent>;

  @ViewChildren(GoalDialogComponent)
  metasPersonales!: QueryList<GoalDialogComponent>;

  @ViewChild(CaloriesProfileComponent)
  caloriasPerfil!: CaloriesProfileComponent;

  id: number = 0;
  idToken: string = "";
  name: string = "";
  email: string = "";
  photoUrl: string = "";
  selectedGender: string = "";

  selectedDate: string = '2001-01-01';
  user: any;
  modalOpen = false;
  autenticacion: IGoogleAuth | undefined;

  constructor(
    private matDialog: MatDialog,
    private fitcalAuthService: AuthService,
    private socialAuthService: SocialAuthService,
    private httpClient: HttpClient,
    private loginService: LoginService,
    private userService: UserService,
  ) {}

  userExists: boolean | undefined;

  ngOnInit() {
    this.socialAuthService.authState.subscribe((user) => {
      this.user = user;
      this.fitcalAuthService.login();
      console.log(this.user);

      this.userService.checkUserExists(user.email).subscribe((exists?) => {
        if (exists) {
          console.log('El usuario existe en la base de datos', exists);
          // getUserByID not working
          this.userService.getUserById(parseInt(user.id))
          .subscribe(data => {
            this.user = data;
            console.log(this.user)
          });
        } else {
          console.log('El usuario no existe en la base de datos, lo creamos');

          this.loginService.createUser({
            idToken: user.idToken,
            name: user.name,
            email: user.email,
            photoUrl: user.photoUrl,
          })
          .subscribe({
            next: (res: HttpResponse<IGoogleAuth>) => console.log(res.body),
            error: (err: any) => console.error(err),
          });

        }
      }, (error) => {
        console.error('Error al verificar la existencia del usuario:', error);
        // Manejar el error si ocurre alguna falla en la verificación
      });

      this.id = 1;
      this.idToken = user.idToken;
      this.name = user.name;
      this.email = user.email;
      this.photoUrl = user.photoUrl;
    });
  }

  dateChanged(event: MatDatepickerInputEvent<Date>) {
    let fechaPrevia = event.value;
    const date = new Date(fechaPrevia!);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    this.selectedDate = `${year}-${month}-${day}`;
    console.log('Selected date:', this.selectedDate);

  }

  guardarDatos(): void {
    let userEdited: User = {
      id: this.id,
      email: this.email,
      googleId: this.idToken,
      name: this.name,
      photoUrl: this.photoUrl,
      weight: 0,
      height: 0,
      gender: this.selectedGender,
      birth_date: this.selectedDate,
      goal: "",
      activityLevel: "",
      calories: 0,
      days: [],
    }

    console.log(this.selectedGender)
    if(this.selectedGender === "f") {
      userEdited.gender = "F"
    } else {
      userEdited.gender = "M"
    }

    this.informacionPersonal.forEach((component: PersonalInformationComponent) => {
      if(component.dato === "Altura:"){
        userEdited.height = parseInt(component.datoPrincipal.toString());
      } else if(component.dato === "Peso:"){
        userEdited.weight = parseInt(component.datoPrincipal.toString());
      }
    });

    this.metasPersonales.forEach((component: GoalDialogComponent) => {
      if(component.selectTipo === "Meta Semanal:"){
        console.log(component.selectedOption);

        switch(component.selectedOption){
          case "ganar1000":
            userEdited.goal = "GAIN1000"
            break;
          case "ganar750":
            userEdited.goal = "GAIN750"
            break;
          case "ganar500":
            userEdited.goal = "GAIN500"
            break;
          case "ganar250":
            userEdited.goal = "GAIN250"
            break;
          case "mantener":
            userEdited.goal = "MAINTENANCE"
            break;
          case "perder1000":
            userEdited.goal = "LOSE1000"
            break;
          case "perder750":
            userEdited.goal = "LOSE750"
            break;
          case "perder500":
            userEdited.goal = "LOSE500"
            break;
          case "perder250":
          userEdited.goal = "LOSE250"
          break;
        }
      }else if(component.selectTipo === "Nivel de Actividad:"){
        console.log(component.selectedOption);
        switch(component.selectedOption){
          case "pocoActivo":
            userEdited.activityLevel = "ANY"
            break;
          case "algoActivo":
            userEdited.activityLevel = "LOW"
            break;
          case "activo":
            userEdited.activityLevel = "MEDIUM"
            break;
          case "muyActivo":
            userEdited.activityLevel = "HIGH"
            break;
        }}
    });

    userEdited.calories = parseInt(this.caloriasPerfil.datoPrincipal);

    console.log(userEdited)
    this.userService.updateUser(userEdited)
      .subscribe((data: any) => {
        console.log("Perfil actualizado:", data);
        window.location.reload();
      });
  }

  logout() {
    this.fitcalAuthService.logout();
    this.user = null;
  }
}
