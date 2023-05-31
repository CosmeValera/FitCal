import { Component } from '@angular/core';
import { Food } from '@shared/interfaces/foodInterface';
import { FoodService } from '@shared/services/food.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DialogCreateFoodComponent } from '@shared/components/dialog-create-food/dialog-create-food.component';
import { DialogUpdateFoodComponent } from '@shared/components/dialog-update-food/dialog-update-food.component';

@Component({
  selector: 'app-list-food',
  templateUrl: './food.component.html',
  styleUrls: ['./food.component.scss']
})
export class FoodComponent {
  filterFood = '';
  searchText = '';

  // foods: Food[] = [];
  foods: Food[] = [{
    id: 2,
    brand: "Marca A",
    image: "https://ejemplo.com/imagenes/manzana.jpg",
    name: "Mandarina",
    kcal: 52,
    proteins: 14,
    fats: 0.2,
    carbs: 0.3},
  {
    brand: "Marca B",
    carbs: 14,
    fats: 0.2,
    id: 2,
    image: "https://ejemplo.com/imagenes/manzana.jpg",
    kcal: 52,
    name: "Platanos",
    proteins: 0
  }];

  constructor(
    private foodService: FoodService,
    private router: Router,
    private matDialog: MatDialog
  ) {}

  ngOnInit() {
    // this.foodService.getFood()
    //   .subscribe(data => {
    //     this.foods = data;
    //     console.log(this.foods)
    //   });
  }

  openCreateFood(){
    this.matDialog.open(DialogCreateFoodComponent,{
      width: '700px',
      height: '600px',
    })
  }

  openUpdateFood(){
    this.matDialog.open(DialogUpdateFoodComponent,{
      width: '700px',
      height: '600px',
    })
  }
}
