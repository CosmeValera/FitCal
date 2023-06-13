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

  ngOnInit() {
    // Theme
    const currentTheme = localStorage.getItem('theme');
    document.documentElement.style.setProperty('--card-background-color', currentTheme === 'light' ? '#A8CCC9' : '#49433d');
    document.documentElement.style.setProperty('--card-color', currentTheme === 'light' ? '#333' : 'white');
  }

  // Se ejecuta después de que la vista se haya inicializado completamente.
  ngAfterViewInit() {
    this.traerAlimentos();  // Llama al método para obtener los alimentos.
  }

  traerAlimentos() {
    const fecha = this.appFecha.fecha;
    if (!fecha) return;

    const fechaFormateada = this.transformarDia(fecha);

    // 1. Obtener el día correspondiente a la fecha y usuario actual.
    this.diaryService.searchByDateAndUser(fechaFormateada, this.user.id).subscribe((daysParam: Day[]) => {
      const day = daysParam[0];
      if (!day) {
          // No hay datos para el día seleccionado.
          // Se establecen los alimentos como vacíos y se calculan las calorías consumidas.
          this.foodInstances = [];
          this.calcularCaloriasConsumidas();
      } else {
          // 2. Obtener las instancias de alimentos correspondientes al día.
          this.diaryService.getFoodInstancesByDay(day.id!).subscribe((foodInstances: FoodInstance[]) => {
          this.foodInstances = foodInstances;

          // 3. Calcular calorías consumidas
          this.calcularCaloriasConsumidas();
        });
      }
    });
  }

  calcularCaloriasFoodInstance(foodInstance: FoodInstance): number {
    // Calcula las calorías totales de una instancia de alimento
    const pesoEnGramos = foodInstance.grams;
    const caloriasPorGramo = foodInstance.food.kcal;

    const caloriasTotales = (pesoEnGramos * caloriasPorGramo) / 100;
    return caloriasTotales;
  }

  calcularCaloriasConsumidas() {
    // Calcula las calorías consumidas en base a las instancias de alimentos obtenidas.
    let caloriasConsumidas = 0;
    this.foodInstances.forEach((foodInstance: FoodInstance) => {
      const caloriasFoodInstance = this.calcularCaloriasFoodInstance(foodInstance);
      caloriasConsumidas += caloriasFoodInstance;
    });

    // Calcula las calorías restantes y actualiza las variables correspondientes.
    const caloriasRestantes = this.user.calories - caloriasConsumidas;
    this.leftCalories = caloriasRestantes;
    this.caloriasConsumidas = caloriasConsumidas;
  }

  onDiaIncrementado(fecha: Date) {
    // Se ejecuta cuando se incrementa la fecha.
    // Recalcula las calorías consumidas y obtiene los alimentos actualizados.
    this.calcularCaloriasConsumidas();
    this.traerAlimentos();
  }

  onDiaDecrementado(fecha: Date) {
    // Se ejecuta cuando se decrementa la fecha.
    // Recalcula las calorías consumidas y obtiene los alimentos actualizados.
    this.calcularCaloriasConsumidas();
    this.traerAlimentos();
  }

  transformarDia(fecha: Date): string {
    // Transforma una fecha en el formato "YYYY-MM-DD".
    const date = new Date(fecha);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    const selectedDate = `${year}-${month}-${day}`;
    return selectedDate;
  }

  getMealFoods(mealType: string): FoodInstance[] {
    // Obtiene las instancias de alimentos correspondientes a un tipo de comida específico.
    return this.foodInstances.filter(foodInstance => foodInstance.mealType === mealType);
  }


  getTotalCalories(mealType: string): number {
    // Obtiene el total de calorías de un tipo de comida específico.
    const foods = this.getMealFoods(mealType);
    let totalCaloriesOfMeal = 0;

    foods.forEach((foodInstance: FoodInstance) => {
      const caloriesFoodInstance = this.calcularCaloriasFoodInstance(foodInstance);
      totalCaloriesOfMeal += caloriesFoodInstance;
    });

    return parseFloat(totalCaloriesOfMeal.toFixed(0));
  }

}
