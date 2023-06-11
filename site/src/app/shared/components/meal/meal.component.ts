import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FoodComponent } from 'src/app/pages/food/food.component';
import { DialogCreateFoodComponent } from '../dialog-create-food/dialog-create-food.component';
import { FoodService } from '@shared/services/food.service';
import { DiaryService } from '@shared/services/diary.service';
import { FoodInstance } from '@shared/interfaces/foodInstanceInterface';
import { DateService } from '@shared/services/date.service';
import { Day } from '@shared/interfaces/dayInterface';
import { AuthService } from '@shared/services/auth.service';

@Component({
  selector: 'app-meal',
  templateUrl: './meal.component.html',
  styleUrls: ['./meal.component.scss']
})
export class MealComponent {
  @Input() meal: string = '';
  @Input() foods: FoodInstance[] = []; // Update the type of foods to FoodInstance[]
  habilitarEditar = false;
  idBoton = '';
  modalAlimentoAbierto = false;
  user: any;

  constructor(
    private matDialog: MatDialog,
    private foodService: FoodService,
    private diaryService: DiaryService,
    private dateService: DateService,
    private fitcalAuthService: AuthService,
  ) {
    this.user = fitcalAuthService.getUser();
  }

  ngOnInit() {
    this.foodService.alimentoSeleccionado$.subscribe(alimento => {
      if (alimento && this.meal === this.idBoton) {
        this.foods.push(alimento);
        this.idBoton = "";
      }
    });

    // Call a function to filter and set the foods based on the meal type
    this.setFoodsByMealType();
  }



  removeItem(index: number, id:number): void {
    const idSenalado = this.foods[index].id!;
    this.diaryService.deleteFoodInstance(idSenalado).subscribe(correcto=>{
      console.log(correcto)
      window.location.reload();
    })


  }


  anadirAlimentoModal() {
    this.idBoton = document.getElementById(this.meal)!.id;

    this.diaryService.setHabilitarEditar(false);
    this.diaryService.setMealType(this.idBoton);

    const dialogRef = this.matDialog.open(FoodComponent, {
      width: '1300px',
      height: '600px',
      data: {
        habilitarEditar: this.habilitarEditar,
        mealType: this.idBoton
      }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log(result);
        // this.guardarDatos();
      }
    });

  }

  // Function to filter and set the foods based on the meal type
  setFoodsByMealType() {
    this.foods = this.foods.filter(food => food.mealType === this.meal.toUpperCase());
  }
}
