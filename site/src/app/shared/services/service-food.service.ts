import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Food } from 'src/app/modelos/Food';

@Injectable({
  providedIn: 'root'
})
export class ServiceFoodService {

  urlGetFood:string = 'http://localhost:8080/fitcal/food';
  urlPostFood:string = 'http://localhost:8080/fitcal/food';
  urlPutFood:string = 'http://147.189.175.230:3306/';

  constructor(private http:HttpClient) { }

  getFood(){
    return this.http.get<Food[]>(this.urlGetFood);
  }

  getFoodId(id:number){
    return this.http.get<Food>(this.urlGetFood+"/"+id);
  }

  postFood(food:Food){
    console.log(food);
    return this.http.post<Food>(this.urlPostFood,food);
  }



}
