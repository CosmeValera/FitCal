import { Component, Inject, ViewChild } from '@angular/core';
import { FoodService } from '@shared/services/food.service';
import { Food } from '@shared/interfaces/foodInterface';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FoodImageComponent } from '../food-image/food-image.component';

@Component({
  selector: 'app-dialog-create-food',
  templateUrl: './dialog-create-food.component.html',
  styleUrls: ['./dialog-create-food.component.scss'],
})
export class DialogCreateFoodComponent {
  @ViewChild('foodImage', { static: false }) foodImage!: FoodImageComponent;
  constructor(
    public dialogRef: MatDialogRef<DialogCreateFoodComponent>,
    private foodService: FoodService,
    private router: Router
  ) {}

  // No se está usando
  crearAlimento(food: Food) {
    this.foodService.createFood(food).subscribe((data) => {
      alert('Se Agrego con Exito...!!');
      this.dialogRef.close();
    });
  }

  saveFood(): void {
    const food: Food = {
      name: (document.getElementById('nameInput') as HTMLInputElement).value,
      image: this.foodImage.imageUrl!,
      brand: (document.getElementById('brandInput') as HTMLInputElement).value,
      kcal: Number(
        (document.getElementById('kcalInput') as HTMLInputElement).value
      ),
      proteins: Number(
        (document.getElementById('proteinsInput') as HTMLInputElement).value
      ),
      carbs: Number(
        (document.getElementById('carbsInput') as HTMLInputElement).value
      ),
      fats: Number(
        (document.getElementById('fatsInput') as HTMLInputElement).value
      ),
    };

    this.foodService.createFood(food).subscribe((data) => {
      this.dialogRef.close();
      window.location.reload();
    });
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
