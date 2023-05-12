import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-calories-dialog',
  templateUrl: './calories-dialog.component.html',
  styleUrls: ['./calories-dialog.component.scss']
})
export class CaloriesDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<CaloriesDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
