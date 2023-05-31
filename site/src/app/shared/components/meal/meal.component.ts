import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FoodComponent } from 'src/app/pages/food/food.component';
import { DialogCreateFoodComponent } from '../dialog-create-food/dialog-create-food.component';
import { FoodService } from '@shared/services/food.service';

@Component({
  selector: 'app-meal',
  templateUrl: './meal.component.html',
  styleUrls: ['./meal.component.scss']
})

export class MealComponent {
  @Input() meal: string = '';
  foods: string[] = [];
  showOptions = false;
  mostrarBotonModal = true;

  desayuno: string[] = [];
  comida: string[] = [];
  idBoton = '';

  constructor(
    private matDialog: MatDialog,
    private foodService: FoodService
  ) {}

  ngOnInit() {
    console.log("Pulsamos... " + this.meal);
    console.log("Cogemos.. " + this.idBoton);

    this.foodService.alimentoSeleccionado$.subscribe(alimento => {
      if (alimento && this.meal === this.idBoton) {
        console.log(alimento);

        this.foods.push(alimento.name);
        this.idBoton = "";
      }
    });
  }

  readonly ingredients = [
    'lettuce',
    'tomato',
    'avocado'
  ];

  addItem(food: string): void {
    this.showOptions = false;

    if (food == '') {
      return;
    }
    this.foods.push(food);
  }

  removeItem(index: number): void {
    this.foods.splice(index, 1);
  }

  /**
   * Con el boton añadir alimento conseguimos cual mealtype es y entonces
   *  lo debemos añadir en el que corresponde.
   */
  anadirAlimentoModal(){
    this.idBoton = document.getElementById(this.meal)!.id;
    console.log(this.idBoton);

    this.matDialog.open(FoodComponent,{
      width: '1300px',
      height: '600px',      
    })
  }

  crearAlimentoModal(){
    this.matDialog.open(DialogCreateFoodComponent,{
      width: '800px',
      height: '670px',
    })
  }

}
