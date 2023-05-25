import { Component } from '@angular/core';
import { GoalDialogComponent } from '@shared/components/goal-dialog/goal-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { SocialAuthService } from '@abacritt/angularx-social-login';
import { AuthService } from '@shared/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  user: any;

  constructor(
    private matDialog: MatDialog,
    private fitcalAuthService: AuthService,
    private socialAuthService: SocialAuthService
  ) { }

  ngOnInit() {
    this.socialAuthService.authState.subscribe((user) => {
      this.user = user;
      this.fitcalAuthService.login();
      console.log(this.user)
    });
  }

  openDialog(){
    this.matDialog.open(GoalDialogComponent,{
      width:'650px',
    })
  }

  modalOpen = false;

  abrirModal() {
    this.modalOpen = true;
  }

  cerrarModal() {
    this.modalOpen = false;
  }
}
