import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { AlimentoSeleccionado } from '@shared/interfaces/AlimentoSeleccionado';
import { Day } from '@shared/interfaces/dayInterface';
import { FoodInstance } from '@shared/interfaces/foodInstanceInterface';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DiaryService {
  private readonly API_URL_DAY = environment.dayUrl;
  private readonly API_URL_FOODINSTANCE = environment.foodInstanceUrl;

  alimentoSeleccionado: AlimentoSeleccionado | null = null;

  constructor(private http: HttpClient) { }

  agregarAlimentoSeleccionado(alimento: AlimentoSeleccionado) {
    this.alimentoSeleccionado = alimento;
  }

  obtenerAlimentoSeleccionado(): AlimentoSeleccionado | null {
    return this.alimentoSeleccionado;
  }

  private habilitarEditar: boolean = true;

  setHabilitarEditar(value: boolean) {
    this.habilitarEditar = value;
  }

  getHabilitarEditar() {
    return this.habilitarEditar;
  }

  /**
   * Consultas a la base de datos.
   */

  /** Tabla Day */
  getDayByFechaAndUser(fecha: Date, id_user: number) {
    return this.http.get<Day>(`${this.API_URL_DAY}/${fecha}`);
  }

  createDay(day: Day) {
    return this.http.post<Day>(this.API_URL_DAY, day);
  }

  /** Tabla FoodInstance */
  getFoodInstanceByFechaAndUser(fecha: Date, id_user: number) {
    return this.http.get<FoodInstance>(`${this.API_URL_FOODINSTANCE}/${fecha}`);
  }

  createFoodInstance(foodInstance: FoodInstance) {
    return this.http.post<FoodInstance>(this.API_URL_FOODINSTANCE, foodInstance);
  }

  //Al pulsar añadir alimento, se comprueba si existe en day (primera consulta)
  //y entonces añadimos el dato en day (Usa lo anterior)




}
