import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FoodComponent } from 'src/app/pages/food/food.component';
import { DialogCreateFoodComponent } from '../dialog-create-food/dialog-create-food.component';
import { FoodService } from '@shared/services/food.service';
import { DiaryService } from '@shared/services/diary.service';

@Component({
  selector: 'app-meal',
  templateUrl: './meal.component.html',
  styleUrls: ['./meal.component.scss']
})

export class MealComponent {
  @Input() meal: string = '';
  foods: string[] = [];
  habilitarEditar = false;
  idBoton = '';
  modalAlimentoAbierto = false;

  constructor(
    private matDialog: MatDialog,
    private foodService: FoodService,
    private diaryService: DiaryService
  ) {}

  ngOnInit() {

    this.foodService.alimentoSeleccionado$.subscribe(alimento => {
      if (alimento && this.meal === this.idBoton) {
        this.foods.push(alimento.name);
        this.idBoton = "";
      }
    });
  }

  removeItem(index: number): void {
    this.foods.splice(index, 1);
  }

  /**
   * Con el boton añadir alimento conseguimos cual mealtype es y entonces
   *  lo debemos añadir en el que corresponde.
   */
  anadirAlimentoModal(){
    this.diaryService.setHabilitarEditar(false);

    this.idBoton = document.getElementById(this.meal)!.id;
    console.log(this.idBoton);

    this.matDialog.open(FoodComponent,{
      width: '1300px',
      height: '600px',
      data: { habilitarEditar: this.habilitarEditar}
    })
  }

}
