import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { FiltroPipe } from '@shared/pipes/filtro.pipe';
import { CommonModule } from '@angular/common'
import { Food } from '@shared/interfaces/foodInterface';
import { FoodService } from '@shared/services/food.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-food',
  templateUrl: './list-food.component.html',
  styleUrls: ['./list-food.component.scss']
})
export class ListFoodComponent {
  filterFood = '';
  searchText = '';

  foods: Food[] = [];

  constructor(private foodService: FoodService, private router: Router){}

  ngOnInit() {
    this.foodService.getFood()
      .subscribe(data => {
        this.foods = data;
        console.log(this.foods)
      });
  }
}