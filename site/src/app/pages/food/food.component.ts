import { ConfirmationDialogComponent } from '@shared/components/confirmation-dialog/confirmation-dialog.component';
import { Component, Inject, DoCheck } from '@angular/core';
import { Food } from '@shared/interfaces/foodInterface';
import { FoodService } from '@shared/services/food.service';
import { Router } from '@angular/router';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { DialogCreateFoodComponent } from '@shared/components/dialog-create-food/dialog-create-food.component';
import { DialogUpdateFoodComponent } from '@shared/components/dialog-update-food/dialog-update-food.component';
import { DiaryService } from '@shared/services/diary.service';
import { FoodInstance } from '@shared/interfaces/foodInstanceInterface';
import { Day } from '@shared/interfaces/dayInterface';
import { AuthService } from '@shared/services/auth.service';
import { User } from '@shared/interfaces/userInterface';
import { GramosDialogComponent } from '@shared/components/gramos-dialog/gramos-dialog.component';
import { DateService } from '@shared/services/date.service';

@Component({
  selector: 'app-list-food',
  templateUrl: './food.component.html',
  styleUrls: ['./food.component.scss'],
  providers: [{ provide: MAT_DIALOG_DATA, useValue: {} }],
})
export class FoodComponent {
  filterFood = '';
  searchText = '';

  habilitarEditar = true;
  modoAgregar = false;
  datosEncontrados: boolean = true;

  foods: Food[] = [];
  socialAuthService: any;
  user: any;

  constructor(
    private foodService: FoodService,
    private router: Router,
    private matDialog: MatDialog,
    private diaryService: DiaryService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fitcalAuthService: AuthService,
    private dateService: DateService
  ) {
    this.user = fitcalAuthService.getUser();
  }

  ngOnInit() {
    const habilitarEditar = this.diaryService.getHabilitarEditar();

    if (habilitarEditar != null) {
      this.habilitarEditar = habilitarEditar;
    }
    this.diaryService.setHabilitarEditar(true);
    this.foodService.getFood().subscribe((data) => {
      this.foods = data;

      if (data.length === 0) {
        this.datosEncontrados = false;
      }
    });
  }


  /** 1. ABRIMOS MODAL DE GRAMOS*/
  /** 2. DAMOS DE ALTA UN DÍA */
  /** 3. Creamos instancia de alimento */
  // WHEN: Al clickar en el '+' en el alimento.
  anadirAlimento(food: Food) {
    const fechaGlobal: Date = this.dateService.getFecha();
    const fechaFormateada = this.formatearFecha(fechaGlobal);

    /** 1. ABRIMOS MODAL DE GRAMOS*/
    const gramosDialogRef = this.matDialog.open(GramosDialogComponent);
    gramosDialogRef.afterClosed().subscribe((grams) => {
      if (grams === undefined || grams === null) {
        return;
      }

      /** 2. DAMOS DE ALTA UN DÍA */
      this.diaryService.searchByDateAndUser(fechaFormateada, this.user.id).subscribe(
        (daysParam: Day[]) => {
          const day = daysParam[0];
          if (Array.isArray(daysParam) && daysParam.length === 0) {
            //No hay un registro con esta fecha y dicho usuario

            /** 3.a. Si no hay dia primero lo creamos y despues llamamos al crearFoodInstance dentro */
            this.crearDia(food, grams);
          } else {
            //Ya hay un registro con esta fecha y dicho usuario

            /** 3.b. Creamos instancia de alimento */
            this.crearFoodInstance(day, food, grams);
          }
        }, (error) => {
          console.error('Error al verificar la existencia del dia en diario:', error);
        }
      );
    });
  }

  /**
   * Formateo de la fecha
   */
  formatearFecha(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  }

  /**
   * Crea el dia, con el alimento y los gramos
   * @param food Alimento para insertar
   * @param grams Gramos para insertar
   */
  crearDia(food: Food, grams: number): void {
    const fechaGlobal: Date = this.dateService.getFecha();
    const dayCrear: Day = {
      date: fechaGlobal,
      user: this.user,
    };

    this.diaryService.createDay(dayCrear).subscribe((day) => {
      this.crearFoodInstance(day, food, grams);
    });
  }

  /**
   * Pasa los tipos para poder insertarlos en la base de datos
   */
  transformMealType(mealtype: string): string {
    switch (mealtype) {
      case "DESAYUNO":
        return "BREAKFAST";
      case "COMIDA":
        return "LUNCH";
      case "CENA":
        return "DINNER";
      case "SNACKS":
        return "SNACKS";
      default:
        return mealtype;
    }
  }


  /**
   * Crear FoodInstance en la base de datos
   * @param day Dia en el que esta en la pantalla
   * @param food Alimento seleccionado
   * @param grams Gramos del alimento
   */
  crearFoodInstance(day: Day, food: Food, grams: number) {
    const mealTypeUpper = this.diaryService.getMealType().toUpperCase();
    const mealTypeEspañolUpper = this.transformMealType(mealTypeUpper);

    const foodInstance: FoodInstance = {
      day: day,
      food: food,
      grams: grams,
      mealType: mealTypeEspañolUpper
    }
    this.diaryService.createFoodInstance(foodInstance).subscribe(()=> {
      window.location.reload();
    }, (error) =>{
      console.error('Error al dar de alta el foodInstance:', error);
    });

  }

  /**
   * Elimina el alimento seleccionado, muestra un modal para ver si estas seguro
   * y lo elimina en la base de datos.
   */
  removeFood(food: Food) {
    const dialogRef = this.matDialog.open(ConfirmationDialogComponent, {
      width: '400px',
      data: '¿Estás seguro que quieres eliminar este alimento?',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.foodService.deleteFood(food.id!).subscribe((result) => {
          //Se elimino con exito.
          window.location.reload();
        }, (error) => {
          console.log("Error al eliminar. Food id: ", food.id!, error);
        });
      }
    });
  }

  /**
   * Abre el modal para crear alimentos
   */
  openCreateFood() {
    this.matDialog.open(DialogCreateFoodComponent, {
      width: '800px',
      height: '660px',
    });
  }

  /**
   * Abre el modal para editar alimentos
   * @param food Alimento que queremos editar
   */
  openUpdateFood(food: any) {
    this.matDialog.open(DialogUpdateFoodComponent, {
      width: '800px',
      height: '660px',
      data: { food: food },
    });
  }
}
