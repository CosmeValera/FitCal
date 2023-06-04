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

  // TODO: REFACTORIZAR; cambiar !habilitarEditar por habilitarEditar
  // habilitarEditar = true;
  habilitarEditar = true;
  modoAgregar = false;
  datosEncontrados: boolean = true;


  foods: Food[] = [];
  // foods: Food[] = [
  //   {
  //     id: 2,
  //     brand: "Marca A",
  //     image: "https://source.unsplash.com/600x900/?food",
  //     name: "Mandarina",
  //     kcal: 52,
  //     proteins: 14,
  //     fats: 0.2,
  //     carbs: 0.3
  //   },
  //   {
  //     id: 2,
  //     brand: "Marca A",
  //     image: "https://source.unsplash.com/600x900/?food,gym",
  //     name: "Pera",
  //     kcal: 52,
  //     proteins: 14,
  //     fats: 0.2,
  //     carbs: 0.3
  //   },
  //   {
  //     id: 2,
  //     brand: "Marca A",
  //     image: "https://source.unsplash.com/600x900/?food,healthy",
  //     name: "Mandazo",
  //     kcal: 52,
  //     proteins: 14,
  //     fats: 0.2,
  //     carbs: 0.3
  //   },
  //   {
  //     id: 2,
  //     brand: "Marca A",
  //     image: "https://source.unsplash.com/600x900/?food,wellness",
  //     name: "Mandarina",
  //     kcal: 52,
  //     proteins: 14,
  //     fats: 0.2,
  //     carbs: 0.3
  //   }
  // ];

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
    this.foodService.seleccionarAlimento(alimento);

    //Aqui debemos añadirlo a la base de datos:


    this.matDialog.closeAll();
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
