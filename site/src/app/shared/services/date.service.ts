import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateService {
  private fecha: Date = new Date();

  constructor() { }

  setFecha(newFecha: Date): void {
    this.fecha = newFecha;
  }

  getFecha(): Date {
    return this.fecha;
  }
}
