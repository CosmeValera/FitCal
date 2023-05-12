import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CaloriesDialogComponent } from '@shared/components/calories-dialog/calories-dialog.component';


@Component({
  selector: 'app-diary',
  templateUrl: './diary.component.html',
  styleUrls: ['./diary.component.scss']
})
export class DiaryComponent {
  calories: number = 2500;

  constructor(public dialog: MatDialog) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(CaloriesDialogComponent, {
      width: '250px',
      data: {
        goalCalories: '3000',
        foodCalories: '500',
        leftCalories: '2500'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
    });
  }

}
