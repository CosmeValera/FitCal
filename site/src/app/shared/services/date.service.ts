import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateService {
  private fechaKey = 'fecha';
  private fecha: Date;

  constructor() {
    const fechaString = localStorage.getItem(this.fechaKey);
    if (fechaString) {
      this.fecha = new Date(fechaString);
    } else {
      this.fecha = new Date();
    }
  }

  setFecha(newFecha: Date): void {
    this.fecha = newFecha;
    localStorage.setItem(this.fechaKey, this.fecha.toISOString());
  }

  getFecha(): Date {
    return this.fecha;
  }
}
