import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { AlimentoSeleccionado } from '@shared/interfaces/AlimentoSeleccionado';
import { Day } from '@shared/interfaces/dayInterface';
import { FoodInstance } from '@shared/interfaces/foodInstanceInterface';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NutricionService {
  private readonly API_URL_FOODINSTANCE = environment.foodInstanceUrl;

  constructor(private http: HttpClient) { }

  searchByIdDay(dayId: number): Observable<FoodInstance[]> {
    const url = `${this.API_URL_FOODINSTANCE}/search?dayId=${dayId}`;
    return this.http.get<FoodInstance[]>(url);
  }
}
