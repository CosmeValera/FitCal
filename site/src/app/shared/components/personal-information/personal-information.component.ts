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
  
  nuevoDato: number=0;
  editarDato = false;

  guardarDato() {
    // this.user.peso = this.nuevoPeso;
    // this.editarPeso = false;
  }

  cancelarDato() {
    // this.editarPeso = false;
  }
}
