import { Component, Inject, DoCheck} from '@angular/core';
import { Food } from '@shared/interfaces/foodInterface';
import { FoodService } from '@shared/services/food.service';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DialogCreateFoodComponent } from '@shared/components/dialog-create-food/dialog-create-food.component';
import { DialogUpdateFoodComponent } from '@shared/components/dialog-update-food/dialog-update-food.component';
import { DiaryService } from '@shared/services/diary.service';

@Component({
  selector: 'app-list-food',
  templateUrl: './food.component.html',
  styleUrls: ['./food.component.scss'],
  providers: [
    { provide: MAT_DIALOG_DATA, useValue: {} }
  ]
})
export class FoodComponent{
  filterFood = '';
  searchText = '';

  habilitarEditar = true;
  modoAgregar = false;
  datosEncontrados: boolean = true;

  foods: Food[] = [];
  socialAuthService: any;

  constructor(
    private foodService: FoodService,
    private router: Router,
    private matDialog: MatDialog,
    private diaryService: DiaryService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit() {
    // Para que salga el boton o editar o crear.
    const habilitarEditar = this.diaryService.getHabilitarEditar();
    if (habilitarEditar != null) {
      this.habilitarEditar = habilitarEditar;
    }

    this.foodService.getFood()
      .subscribe(data => {
        this.foods = data;

        if(data.length === 0) {
          this.datosEncontrados = false;
        }
      });
  }

  anadirAlimento(alimento: any) {
    console.log("Alimento: " + alimento);
    this.matDialog.closeAll();
  }

  openCreateFood() {
    this.matDialog.open(DialogCreateFoodComponent,{
      width: '700px',
      height: '600px',
    })
  }

  openUpdateFood(food: any) {
    this.matDialog.open(DialogUpdateFoodComponent,{
      width: '700px',
      height: '600px',
      data: {food: food}
    })
  }
}
