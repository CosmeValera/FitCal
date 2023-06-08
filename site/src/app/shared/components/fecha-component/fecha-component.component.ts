import { Component, EventEmitter, LOCALE_ID, Output } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

@Component({
  selector: 'app-fecha',
  templateUrl: './fecha-component.component.html',
  styleUrls: ['./fecha-component.component.scss'],
  providers: [{ provide: LOCALE_ID, useValue: 'es' }]
})
export class FechaComponentComponent {
  fecha: Date = new Date();

  ngOnInit() {
  }
  incrementarDia() {
    this.fecha = new Date(this.fecha.getTime() + 24 * 60 * 60 * 1000);
  }

  decrementarDia() {
    this.fecha = new Date(this.fecha.getTime() - 24 * 60 * 60 * 1000);
  }
}
