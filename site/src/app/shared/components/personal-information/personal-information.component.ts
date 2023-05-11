import { Component, Input } from '@angular/core';

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

  guardarDato() {
    console.log("Guardar datgo");
    this.datoPrincipal = '' + this.nuevoDato;

    this.editarDato = false;
  }

  cancelarDato() {
    console.log("caneclar datgo");

    this.editarDato = false;
  }
}
