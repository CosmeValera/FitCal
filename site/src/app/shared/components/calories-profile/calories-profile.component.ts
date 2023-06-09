import { Component, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-calories-profile',
  templateUrl: './calories-profile.component.html',
  styleUrls: ['./calories-profile.component.scss'],
})
export class CaloriesProfileComponent {
  @Input() dato: string = '';
  @Input() datoPrincipal: string = '';
  @Input() tipo: string = '';
  @Input() calRecomendada: string = '2000';
  @Input() user: any; // Para recalcular

  nuevoDato: number = 0;
  editarDato = false;

  constructor(private snackBar: MatSnackBar) {}

  guardarDato() {
    console.log('Guardar dato');
    this.datoPrincipal = '' + this.nuevoDato;

    this.editarDato = false;
  }

  cancelarDato() {
    console.log('Cancelar dato');

    this.editarDato = false;
  }

  recalcularKcal(): void {
    const peso = this.user.weight || 0;
    const altura = this.user.height || 0;
    const genero = this.user.gender || '';
    const edad = this.calculateAge(this.user.birth_date);
    const metaSemanal = this.user.goal || 'MAINTENANCE';

    let calorias = peso * 10 + altura * 6.25 + edad * 5; // Formula metabolismo basal

    console.log(
      'Peso ' +
        peso +
        ' x 10 +' +
        ' Altura ' +
        altura +
        ' x 6,25 + edad ' +
        edad +
        ' * 5 = ' +
        calorias
    );

    if (genero === 'F') {
      calorias -= 161;
    } else if (genero === 'M') {
      calorias += 5;
    }

    const nivelActividad = this.user.activityLevel || '';

    // Damos el sumplemento de calorias segun el nivel de actividad
    switch (nivelActividad) {
      case 'ANY':
        calorias *= 1.2;
        break;
      case 'LOW':
        calorias *= 1.375;
        break;
      case 'MEDIUM':
        calorias *= 1.55;
        break;
      case 'HIGH':
        calorias *= 1.725;
        break;
    }
    console.log('+ ' + nivelActividad + ' ' + calorias);

    // Sumamos/Restamos segun el objetivo y si es mantenimiento mantenemos las calorias
    switch (metaSemanal) {
      case 'GAIN1000':
        calorias += 1000;
        break;
      case 'GAIN750':
        calorias += 750;
        break;
      case 'GAIN500':
        calorias += 500;
        break;
      case 'GAIN250':
        calorias += 250;
        break;
      case 'LOSE1000':
        calorias -= 1000;
        break;
      case 'LOSE750':
        calorias -= 750;
        break;
      case 'LOSE500':
        calorias -= 500;
        break;
      case 'LOSE250':
        calorias -= 250;
        break;
    }

    calorias = Math.round(calorias);

    this.datoPrincipal = calorias.toString();

    const aviso =
      '¡Se han recalculado las calorias correctamente según tus necesidades!';
    const recordatorio = '¡No olvides guardar los cambios!.';
    const snackBarRef = this.snackBar.open(aviso, recordatorio, {
      duration: 5000, // Duración de la notificación en milisegundos
      panelClass: 'custom-snackbar', // Clase CSS para personalizar el estilo de la notificación
    });

    // Opcional: Agregar acciones a la notificación
    snackBarRef.onAction().subscribe(() => {});
  }

  // Metodo para calcular edad para la formula
  calculateAge(birthDate: string): number {
    const today = new Date();
    const birthDateObj = new Date(birthDate);
    let age = today.getFullYear() - birthDateObj.getFullYear();
    const monthDiff = today.getMonth() - birthDateObj.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDateObj.getDate())
    ) {
      age--;
    }

    return age;
  }
}
