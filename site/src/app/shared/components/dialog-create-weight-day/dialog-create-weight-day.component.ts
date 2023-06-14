import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { WeightDay } from '@shared/interfaces/weightDayInterface';
import { AuthService } from '@shared/services/auth.service';

@Component({
  selector: 'app-dialog-create-weight-day',
  templateUrl: './dialog-create-weight-day.component.html',
  styleUrls: ['./dialog-create-weight-day.component.scss']
})
export class DialogCreateWeightDayComponent {
  user: any;
  weightDay: WeightDay;

  constructor(
    public dialogRef: MatDialogRef<DialogCreateWeightDayComponent>,
    @Inject(MAT_DIALOG_DATA) public data: WeightDay,
    private fitcalAuthService: AuthService
  ) {
    this.user = this.fitcalAuthService.getUser(); //Conseguimos el usuario
    this.weightDay = {
      id: undefined,
      date: new Date(),
      weight: 50,
      user: this.user
    };

    if (data) {
      // If data is provided, initialize the form with the existing weight day values
      this.weightDay = data;
    }

  }

  transformarDia(fecha: Date): string {
    // Transforma una fecha en el formato "YYYY-MM-DD".
    const date = new Date(fecha);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    const selectedDate = `${year}-${month}-${day}`;
    return selectedDate;
  }

  saveWeightDay() {
    // Close the dialog and pass the weight day object back to the calling component
    this.dialogRef.close(this.weightDay);
  }

  cancel() {
    // Close the dialog without passing any data
    this.dialogRef.close();
  }
}
