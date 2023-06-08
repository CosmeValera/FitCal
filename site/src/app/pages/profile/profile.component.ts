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

  ngOnInit() {
    this.socialAuthService.authState.subscribe((user) => {
      this.fitcalAuthService.login();

      this.userService.checkUserExists(user.email).subscribe((userParam?) => {
        if (userParam) {
          console.log('El usuario existe en la base de datos', userParam);
          this.user = userParam;
        } else {
          console.log('El usuario no existe en la base de datos, lo creamos');
          this.crearUsuario(user);
        }
      }, (error) => {
        console.error('Error al verificar la existencia del usuario:', error);
        this.crearUsuario(user);
      });

      console.log(this.user);

    });
  }

  crearUsuario(user: any):void {
    this.loginService.createUser({
      idToken: user.idToken,
      name: user.name,
      email: user.email,
      photoUrl: user.photoUrl,
    })
    .subscribe({
      next: (res: HttpResponse<IGoogleAuth>) => {
        console.log(res.body);
        this.user = res.body;
        this.user.googleId = user.idToken;
      },
      error: (err: any) => {
        console.error(err)
      },
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
      id: this.user.id,
      email: this.user.email,
      googleId: this.user.googleId,
      name: this.user.name,
      photoUrl: this.user.photoUrl,
      weight: this.user.weight,
      height: this.user.height,
      gender: this.user.gender,
      birth_date: this.selectedDate,
      goal: this.user.goal,
      activityLevel: this.user.activityLevel,
      calories: this.user.calories,
      days: this.user.days,
    }

    if(this.user.gender === "F") {
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
          case "GAIN1000":
            userEdited.goal = "GAIN1000"
            break;
          case "GAIN750":
            userEdited.goal = "GAIN750"
            break;
          case "GAIN500":
            userEdited.goal = "GAIN500"
            break;
          case "GAIN250":
            userEdited.goal = "GAIN250"
            break;
          case "MAINTENANCE":
            userEdited.goal = "MAINTENANCE"
            break;
          case "LOSE1000":
            userEdited.goal = "LOSE1000"
            break;
          case "LOSE750":
            userEdited.goal = "LOSE750"
            break;
          case "LOSE500":
            userEdited.goal = "LOSE500"
            break;
          case "LOSE250":
          userEdited.goal = "LOSE250"
          break;
        }
      }else if(component.selectTipo === "Nivel de Actividad:"){
        console.log(component.selectedOption);
        switch(component.selectedOption){
          case "ANY":
            userEdited.activityLevel = "ANY"
            break;
          case "LOW":
            userEdited.activityLevel = "LOW"
            break;
          case "MEDIUM":
            userEdited.activityLevel = "MEDIUM"
            break;
          case "HIGH":
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
