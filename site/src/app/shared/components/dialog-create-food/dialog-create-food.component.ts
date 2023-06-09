import { Component } from '@angular/core';
import { FoodService } from '@shared/services/food.service';
import { Food } from '@shared/interfaces/foodInterface';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dialog-create-food',
  templateUrl: './dialog-create-food.component.html',
  styleUrls: ['./dialog-create-food.component.scss']
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
    console.log("save");

    const food: Food = {
      name: (document.getElementById('nameInput') as HTMLInputElement).value,
      image: (document.getElementById('imageInput') as HTMLInputElement).value,
      brand: (document.getElementById('brandInput') as HTMLInputElement).value,
      kcal: Number((document.getElementById('kcalInput') as HTMLInputElement).value),
      proteins: Number((document.getElementById('proteinsInput') as HTMLInputElement).value),
      carbs: Number((document.getElementById('carbsInput') as HTMLInputElement).value),
      fats: Number((document.getElementById('fatsInput') as HTMLInputElement).value),
    }


    this.foodService.createFood(food)
      .subscribe(data => {
        console.log("Alimento dado de alta:", data);
        this.dialogRef.close();
        window.location.reload();
      });

  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
