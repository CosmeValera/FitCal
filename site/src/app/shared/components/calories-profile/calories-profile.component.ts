import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-calories-profile',
  templateUrl: './calories-profile.component.html',
  styleUrls: ['./calories-profile.component.scss']
})
export class CaloriesProfileComponent {
  @Input() dato: string = '';
  @Input() datoPrincipal: string = '';
  @Input() tipo: string = '';
  @Input() calRecomendada: string = '2000';
  
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

  recalcularCalorias(){

  }
}
