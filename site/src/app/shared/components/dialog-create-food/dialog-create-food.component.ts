import { Component } from '@angular/core';
import { FoodService } from '@shared/services/food.service';
import { Food } from '@shared/interfaces/foodInterface';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dialog-create-Food',
  templateUrl: './dialog-create-Food.component.html',
  styleUrls: ['./dialog-create-Food.component.scss']
})
export class DialogCreateFoodComponent {
  constructor(
    public dialogRef: MatDialogRef<DialogCreateFoodComponent>,
    private foodService: FoodService,
    private router: Router
  ) { }

  // No se está usando
  crearAlimento(food: Food){
    this.foodService.createFood(food)
    .subscribe(data => {
      alert("Se Agrego con Exito...!!");
      this.dialogRef.close();
    })
  }

  saveFood(): void {

    let foodMock: Food = {
      name: 'galleta',
      image: '',
      brand: 'nestle',
      kcal: 100,
      proteins: 10,
      carbs: 30,
      fats: 40,
    }

    this.foodService.createFood(foodMock)
      .subscribe(data => {
        console.log("Alimento dado de alta:", data);
      });

  }
}
