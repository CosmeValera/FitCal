import { Component, EventEmitter, Output } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-gramos-dialog',
  templateUrl: './gramos-dialog.component.html',
  styleUrls: ['./gramos-dialog.component.scss'],
})
export class GramosDialogComponent {
  grams: number = 0;

  constructor(public dialogRef: MatDialogRef<GramosDialogComponent>) { }

  onAcceptClick(): void {
    this.dialogRef.close(this.grams);
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }
}
