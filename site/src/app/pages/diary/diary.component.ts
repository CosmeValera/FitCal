import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatDialog } from '@angular/material/dialog';
import { CaloriesDialogComponent } from '@shared/components/calories-dialog/calories-dialog.component';
import { FechaComponentComponent } from '@shared/components/fecha-component/fecha-component.component';
import { Day } from '@shared/interfaces/dayInterface';
import { FoodInstance } from '@shared/interfaces/foodInstanceInterface';
import { Food } from '@shared/interfaces/foodInterface';
import { AuthService } from '@shared/services/auth.service';
import { DateService } from '@shared/services/date.service';
import { DiaryService } from '@shared/services/diary.service';
import { FoodService } from '@shared/services/food.service';

@Component({
  selector: 'app-diary',
  templateUrl: './diary.component.html',
  styleUrls: ['./diary.component.scss']
})
export class DiaryComponent implements AfterViewInit {
  @ViewChild('appFecha', { static: false }) appFecha!: FechaComponentComponent;

  leftCalories: number = 2500;
  caloriasConsumidas: number = 0;
  day: any;
  user: any;
  foodInstances: FoodInstance[] = [];

  constructor(
    private alimentoService: FoodService,
    public dialog: MatDialog,
    private diaryService: DiaryService,
    private fitcalAuthService: AuthService,
    private dateService: DateService
  ) {
    this.user = fitcalAuthService.getUser();
    this.leftCalories = this.user.calories;
  }

  ngAfterViewInit() {
    const fechaHoy = new Date();
    this.appFecha.fecha = fechaHoy; // Establecer la fecha actual en el componente FechaComponent

    this.appFecha.diaIncrementado.subscribe((fecha: Date) => {
      this.onDiaIncrementado(fecha);
    });

    this.appFecha.diaDecrementado.subscribe((fecha: Date) => {
      this.onDiaDecrementado(fecha);
    });

    this.traerAlimentos();
  }

  traerAlimentos() {
    const fecha = this.appFecha.fecha;
    if (!fecha) return;

    const fechaFormateada = this.transformarDia(fecha);

    // 1. Sacamos día
    this.diaryService.searchByDateAndUser(fechaFormateada, this.user.id).subscribe((daysParam: Day[]) => {
      const day = daysParam[0];
      if (!day) {
        console.log(`No hay un registro para ${fechaFormateada} y el usuario ${this.user.id}.`);
        this.foodInstances = [];
        this.calcularCaloriasConsumidas();

      } else {
        console.log(`Ya hay un registro para ${fechaFormateada} y el usuario ${this.user.id}.`);
        console.log(day);

        // 2. Sacamos FoodInstances
        this.diaryService.getFoodInstancesByDay(day.id!).subscribe((foodInstances: FoodInstance[]) => {
          this.foodInstances = foodInstances;

          // 3. Calcular calorías consumidas
          this.calcularCaloriasConsumidas();
        });
      }
    });
  }

  calcularCaloriasFoodInstance(foodInstance: FoodInstance): number {
    const pesoEnGramos = foodInstance.grams;
    const caloriasPorGramo = foodInstance.food.kcal;

    const caloriasTotales = (pesoEnGramos * caloriasPorGramo) / 100;
    return caloriasTotales;
  }

  calcularCaloriasConsumidas() {
    let caloriasConsumidas = 0;
    this.foodInstances.forEach((foodInstance: FoodInstance) => {
      const caloriasFoodInstance = this.calcularCaloriasFoodInstance(foodInstance);
      caloriasConsumidas += caloriasFoodInstance;
    });

    const caloriasRestantes = this.user.calories - caloriasConsumidas;
    console.log(`Calorías consumidas: ${caloriasConsumidas}`);
    console.log(`Calorías restantes: ${caloriasRestantes}`);
    this.leftCalories = caloriasRestantes;
    this.caloriasConsumidas = caloriasConsumidas;

  }

  onDiaIncrementado(fecha: Date) {
    this.calcularCaloriasConsumidas();
    this.traerAlimentos();
  }

  onDiaDecrementado(fecha: Date) {
    this.calcularCaloriasConsumidas();
    this.traerAlimentos();
  }

  transformarDia(fecha: Date): string {
    const date = new Date(fecha);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    const selectedDate = `${year}-${month}-${day}`;
    return selectedDate;
  }

  getMealFoods(mealType: string): FoodInstance[] {
    return this.foodInstances.filter(foodInstance => foodInstance.mealType === mealType);
  }

  openCaloriesDialog(): void {
    const dialogRef = this.dialog.open(CaloriesDialogComponent, {
      width: '250px',
      data: {
        goalCalories: '3000',
        foodCalories: '500',
        leftCalories: '2500'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
    });
  }
}
