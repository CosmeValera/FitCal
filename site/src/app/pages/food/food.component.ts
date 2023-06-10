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
  mealtype = '';
  modoAgregar = false;
  datosEncontrados: boolean = true;

  foods: Food[] = [];
  socialAuthService: any;
  user: any;
  fecha!: Date;
  fechaFormateda!: string;

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
    this.fecha = diaryService.fecha;
  }

  ngOnInit() {
    const mealtype = this.diaryService.getMealType();
    const habilitarEditar = this.diaryService.getHabilitarEditar();

    this.mealtype = mealtype;

    if (habilitarEditar != null) {
      this.habilitarEditar = habilitarEditar;
    }

    this.foodService.getFood().subscribe((data) => {
      this.foods = data;

      if (data.length === 0) {
        this.datosEncontrados = false;
      }
    });
  }

  crearDia(): void {
    this.fechaFormateada();

    const fechaGlobal: Date = this.dateService.getFecha();
    const dayCrear: Day = {
      date: fechaGlobal,
      user: this.user,
    };

    this.diaryService.createDay(dayCrear).subscribe((data) => {
      console.log('fecha Frontend: ', this.fecha);

      console.log('fecha Backend añadida: ', data);
    });
  }

  creamosInstanciaAlimento(alimento: Food): void {
    const foodInstanceCrear: FoodInstance = {
      food: alimento,
      mealType: this.mealtype,
      grams: 200,
      day: {
        date: new Date(this.fecha),
        user: this.user,
        foodInstances: [],
      },
    };

    console.log('FoodInstance: ' + foodInstanceCrear);
    //Creamos el dia
    this.diaryService
      .createFoodInstance(foodInstanceCrear)
      .subscribe((data) => {
        console.log('Alimento añadido en FoodInstance correctamente.');
      });
  }

  fechaFormateada(): void {
    const date = new Date(this.fecha);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    this.fechaFormateda = `${year}-${month}-${day}`;
  }

  anadirAlimento(alimento: Food) {
    this.fechaFormateada();

    // const dialogRef = this.matDialog.open(GramosDialogComponent, {
    //   data: '¿Cuantos gramos?',
    // });

    // dialogRef.afterClosed().subscribe((result) => {
    //   if (result) {
    //     console.log(result)
    //     // this.guardarDatos();
    //   }
    // });

    this.diaryService
      .searchByDateAndUser(this.fechaFormateda, this.user.id)
      .subscribe(
        (dayParam) => {
          if (Array.isArray(dayParam) && dayParam.length === 0) {
            this.crearDia();
          } else {
            console.log(
              `Ya hay un registro para ${this.fechaFormateda} y el usuario ${this.user.id}.`
            );
            // this.creamosInstanciaAlimento(alimento);
          }
        },
        (error) => {
          console.error(
            'Error al verificar la existencia del dia en diario:',
            error
          );
          // Manejar el error si ocurre alguna falla en la verificación
        }
      );

    this.matDialog.closeAll();
  }

  openCreateFood() {
    this.matDialog.open(DialogCreateFoodComponent, {
      width: '700px',
      height: '600px',
    });
  }

  openUpdateFood(food: any) {
    this.matDialog.open(DialogUpdateFoodComponent, {
      width: '700px',
      height: '600px',
      data: { food: food },
    });
  }
}
