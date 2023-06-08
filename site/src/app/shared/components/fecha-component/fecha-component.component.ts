import { Component, EventEmitter, LOCALE_ID, Output } from '@angular/core';

@Component({
  selector: 'app-fecha',
  templateUrl: './fecha-component.component.html',
  styleUrls: ['./fecha-component.component.scss'],
  providers: [{ provide: LOCALE_ID, useValue: 'es' }]
})
export class FechaComponentComponent {
  @Output() diaIncrementado: EventEmitter<Date> = new EventEmitter<Date>();
  @Output() diaDecrementado: EventEmitter<Date> = new EventEmitter<Date>();

  fecha: Date = new Date();

  ngOnInit() {
  }
  incrementarDia() {
    this.fecha = new Date(this.fecha.getTime() + 24 * 60 * 60 * 1000);
    this.diaIncrementado.emit(this.fecha); // Emit the event with the updated date
  }

  decrementarDia() {
    this.fecha = new Date(this.fecha.getTime() - 24 * 60 * 60 * 1000);
    this.diaDecrementado.emit(this.fecha); // Emit the event with the updated date
  }
}
