import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation-dialog',
  template: '',
})
export class GramosDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<GramosDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string
  ) {}
}
