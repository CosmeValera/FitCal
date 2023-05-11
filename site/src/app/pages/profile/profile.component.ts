import { Component } from '@angular/core';
import { GoalDialogComponent } from '@shared/components/goal-dialog/goal-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {

  constructor(private matDialog:MatDialog) { }

  ngOnInit(): void {
  }

  openDialog(){
    this.matDialog.open(GoalDialogComponent,{
      width:'650px',
    })
  }

}
