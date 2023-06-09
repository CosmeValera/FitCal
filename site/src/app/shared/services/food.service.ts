import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Food } from '@shared/interfaces/foodInterface';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FoodService {
  private readonly API_URL = environment.foodUrl;

  private alimentoSeleccionadoSubject = new BehaviorSubject<any>(null);
  alimentoSeleccionado$ = this.alimentoSeleccionadoSubject.asObservable();

  seleccionarAlimento(alimento: any) {
    console.log(alimento)
    this.alimentoSeleccionadoSubject.next(alimento);
  }

  constructor(private http: HttpClient) { }

  getFood() {
    return this.http.get<Food[]>(this.API_URL);
  }

  getFoodById(id: number) {
    return this.http.get<Food>(`${this.API_URL}/${id}`);
  }

  createFood(food: Food) {
    return this.http.post<Food>(this.API_URL, food);
  }

  updateFood(food: Food) {
    console.log("Alimento para actualizar: " + food);
    console.log(food.id);
    return this.http.put<Food>(`${this.API_URL}/${food.id}`, food);
  }
}
