import { Component, Inject } from '@angular/core';
import { FoodService } from '@shared/services/food.service';
import { Food } from '@shared/interfaces/foodInterface';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dialog-update-food',
  templateUrl: './dialog-update-food.component.html',
  styleUrls: ['./dialog-update-food.component.scss']
})
export class DialogUpdateFoodComponent {
  food: Food;

  constructor(
    public dialogRef: MatDialogRef<DialogUpdateFoodComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {food: Food},
    private foodService: FoodService,
    private router: Router
  ) {
    this.food = data.food;
    console.log(this.food);
  }


  updateFood(): void {
    console.log("save");

    let foodEdited: Food = {
      id: this.food.id,
      name: (document.getElementById('nameInput') as HTMLInputElement).value,
      image: (document.getElementById('imageInput') as HTMLInputElement).value,
      brand: (document.getElementById('brandInput') as HTMLInputElement).value,
      kcal: Number((document.getElementById('kcalInput') as HTMLInputElement).value),
      proteins: Number((document.getElementById('proteinsInput') as HTMLInputElement).value),
      carbs: Number((document.getElementById('carbsInput') as HTMLInputElement).value),
      fats: Number((document.getElementById('fatsInput') as HTMLInputElement).value),
    }


    this.foodService.updateFood(foodEdited)
      .subscribe(data => {
        console.log("Alimento editado:", data);
        this.dialogRef.close();
        window.location.reload();
      });

  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
