import { Component, EventEmitter, Output } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-gramos-dialog',
  templateUrl: './gramos-dialog.component.html',
  styleUrls: ['./gramos-dialog.component.scss'],
})
export class GramosDialogComponent {
  grams: number = 100;

  constructor(public dialogRef: MatDialogRef<GramosDialogComponent>) { }

  onAcceptClick(): void {
    if (this.grams >= 0) {
      this.dialogRef.close(this.grams);
    } else {
      console.log("La cantidad no puede ser negativa");
    }
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }
}
