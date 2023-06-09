import { Component, Inject, ViewChild, ElementRef } from '@angular/core';
import { FoodService } from '@shared/services/food.service';
import { Food } from '@shared/interfaces/foodInterface';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FoodImageComponent } from '../food-image/food-image.component';

@Component({
  selector: 'app-dialog-update-food',
  templateUrl: './dialog-update-food.component.html',
  styleUrls: ['./dialog-update-food.component.scss'],
})
export class DialogUpdateFoodComponent {
  @ViewChild('foodImage', { static: false }) foodImage!: FoodImageComponent;

  food: Food;

  constructor(
    public dialogRef: MatDialogRef<DialogUpdateFoodComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { food: Food },
    private foodService: FoodService,
    private router: Router
  ) {
    this.food = data.food;
  }

  updateFood(): void {
    const foodEdited: Food = {
      id: this.food.id,
      name: (document.getElementById('nameInput') as HTMLInputElement).value,
      image: this.foodImage.imageUrl!,
      brand: (document.getElementById('brandInput') as HTMLInputElement).value,
      kcal: Number(
        (document.getElementById('kcalInput') as HTMLInputElement).value.replace(',', '.')
      ),
      proteins: Number(
        (document.getElementById('proteinsInput') as HTMLInputElement).value.replace(',', '.')
      ),
      carbs: Number(
        (document.getElementById('carbsInput') as HTMLInputElement).value.replace(',', '.')
      ),
      fats: Number(
        (document.getElementById('fatsInput') as HTMLInputElement).value.replace(',', '.')
      ),
    };

    this.foodService.updateFood(foodEdited).subscribe((data) => {
      this.dialogRef.close();
      window.location.reload();
    });
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
