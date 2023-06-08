import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation-dialog',
  template: `
    <h1 mat-dialog-title>Confirmación</h1>
    <div mat-dialog-content>
      <p>{{ data }}</p>
    </div>
    <div mat-dialog-actions class="d-flex justify-content-center">
      <button mat-button [mat-dialog-close]="false" class="btn btn-danger">
        Cancelar
      </button>
      <button
        mat-button
        [mat-dialog-close]="true"
        cdkFocusInitial
        class="btn btn-success"
      >
        Aceptar
      </button>
    </div>
  `,
})
export class ConfirmationDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string
  ) {}
}
