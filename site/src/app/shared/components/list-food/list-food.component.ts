import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { FiltroPipe } from '@shared/pipes/filtro.pipe';
import {CommonModule } from '@angular/common'
import { Food } from 'src/app/modelos/Food';
import { ServiceFoodService } from '@shared/services/service-food.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-food',
  templateUrl: './list-food.component.html',
  styleUrls: ['./list-food.component.scss']
})
export class ListFoodComponent {
  filterFood = '';
  searchText = '';
  
  food:Food[] = [];

  constructor(private service:ServiceFoodService, private router:Router){}

  ngOnInit(){
    this.service.getFood()
    .subscribe(data=>{
      this.food=data;
      console.log(this.food)
    });
  }



}
