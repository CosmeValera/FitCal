import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { food } from '@shared/interfaces/foodInterface';

@Injectable({
  providedIn: 'root'
})
export class FoodService {

  urlGetFood: string = 'http://localhost:8080/fitcal/food';
  urlPostFood: string = 'http://localhost:8080/fitcal/food';
  urlPutFood: string = 'http://147.189.175.230:3306/';

  constructor(private http:HttpClient) { }

  getFood(){
    return this.http.get<food[]>(this.urlGetFood);
  }

  getFoodId(id:number){
    return this.http.get<food>(this.urlGetFood+"/"+id);
  }

  postFood(food:food){
    console.log(food);
    return this.http.post<food>(this.urlPostFood,food);
  }

}
