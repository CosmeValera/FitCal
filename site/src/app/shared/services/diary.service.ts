import { Injectable } from '@angular/core';
import { AlimentoSeleccionado } from '@shared/interfaces/AlimentoSeleccionado';

@Injectable({
  providedIn: 'root'
})
export class DiaryService {
  alimentoSeleccionado: AlimentoSeleccionado | null = null;

  constructor() { }

  agregarAlimentoSeleccionado(alimento: AlimentoSeleccionado) {
    this.alimentoSeleccionado = alimento;
  }

  obtenerAlimentoSeleccionado(): AlimentoSeleccionado | null {
    return this.alimentoSeleccionado;
  }
}
