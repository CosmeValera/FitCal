import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Food } from '@shared/interfaces/foodInterface';

@Injectable({
  providedIn: 'root'
})
export class FoodService {
  private readonly API_URL = environment.foodUrl;

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
}
