import { Component } from '@angular/core';
import { GoalDialogComponent } from '@shared/components/goal-dialog/goal-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { SocialAuthService } from '@abacritt/angularx-social-login';
import { AuthService } from '@shared/services/auth.service';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { LoginService } from '@shared/services/login/login.service';
import { IGoogleAuth } from './model/GoogleAuth.model';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {
  user: any;
  modalOpen = false;

  constructor(
    private matDialog: MatDialog,
    private fitcalAuthService: AuthService,
    private socialAuthService: SocialAuthService,
    private httpClient: HttpClient,
    private loginService: LoginService
  ) {}

  ngOnInit() {
    this.socialAuthService.authState.subscribe((user) => {
      this.user = user;
      this.fitcalAuthService.login();
      console.log(this.user);

      this.loginService
        .createUser({
          idToken: user.idToken,
          name: user.name,
          email: user.email,
          photoUrl: user.photoUrl,
        })
        .subscribe({
          next: (res: HttpResponse<IGoogleAuth>) => console.log(res.body),
          error: (err: any) => console.error(err),
        });
    });
  }

  openDialog() {
    this.matDialog.open(GoalDialogComponent, {
      width: '650px',
    });
  }

  abrirModal() {
    this.modalOpen = true;
  }

  cerrarModal() {
    this.modalOpen = false;
  }

  logout() {
    this.fitcalAuthService.logout();
    this.user = null;
  }
}
