import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DisableRecalculator } from '@shared/services/disableRecalculator.service';

@Component({
  selector: 'app-personal-information',
  templateUrl: './personal-information.component.html',
  styleUrls: ['./personal-information.component.scss']
})
export class PersonalInformationComponent {
  @Input() dato: string = '';
  @Input() datoPrincipal: string = '';
  @Input() tipo: string = '';

  nuevoDato: number = 0;
  editarDato = false;
  previousValue: string = '';

  @Output() datoPrincipalChange = new EventEmitter<string>();

  constructor(private disableRecalculator: DisableRecalculator) {}

  onInputChange(event: any) {
    const value = event.target.value;
    if ((this.dato === 'Altura:' || this.dato === 'Peso:') && parseInt(value) < 0) {
      console.error(this.dato === 'Altura:' ? 'La altura no puede ser negativa' : 'El peso no puede ser negativo');
      this.nuevoDato = parseInt(this.datoPrincipal); // Restablecer el valor anterior
    } else {
      this.nuevoDato = parseInt(value);
    }
  }

  guardarDato() {
    if ((this.dato === 'Altura:' || this.dato === 'Peso:') && this.nuevoDato < 0) {
      console.error(this.dato === 'Altura:' ? 'La altura no puede ser negativa' : 'El peso no puede ser negativo');
      this.nuevoDato = parseInt(this.datoPrincipal); // Restablecer el valor anterior
      return;
    }

    this.datoPrincipal = '' + this.nuevoDato;
    this.disableRecalculator.disableRecalculate();
    this.editarDato = false;
    this.datoPrincipalChange.emit(this.datoPrincipal);
  }

  cancelarDato() {
    this.editarDato = false;
    this.nuevoDato = parseInt(this.datoPrincipal); // Restablecer el valor anterior
  }
}
