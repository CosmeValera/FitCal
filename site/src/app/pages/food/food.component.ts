import { Component } from '@angular/core';
import { Food } from '@shared/interfaces/foodInterface';
import { FoodService } from '@shared/services/food.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DialogCreateFoodComponent } from '../../shared/components/dialog-create-food/dialog-create-food.component';

@Component({
  selector: 'app-list-food',
  templateUrl: './food.component.html',
  styleUrls: ['./food.component.scss']
})
export class FoodComponent {
  filterFood = '';
  searchText = '';

  foods: Food[] = [];

  constructor(
    private foodService: FoodService,
    private router: Router,
    private matDialog: MatDialog
  ) {}

  ngOnInit() {
    this.foodService.getFood()
      .subscribe(data => {
        this.foods = data;
        console.log(this.foods)
      });
  }

  openCreateFood(){
    this.matDialog.open(DialogCreateFoodComponent,{
      width: '700px',
      height: '600px',
    })
  }
}
