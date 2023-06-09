import { Component, ElementRef, ViewChild } from '@angular/core';
import { ChartModule, Chart } from 'angular-highcharts';
import { donutChartOptions } from '@shared/helpers/donutChartOptions';
import { AuthService } from '@shared/services/auth.service';
import { User } from '@shared/interfaces/userInterface';
import { Day } from '@shared/interfaces/dayInterface';
import { FoodInstance } from '@shared/interfaces/foodInstanceInterface';
import { Food } from '@shared/interfaces/foodInterface';
import { DateService } from '@shared/services/date.service';
import { DiaryService } from '@shared/services/diary.service';
import { FoodService } from '@shared/services/food.service';
import { NutricionService } from '@shared/services/nutricion.service';
import { FechaComponentComponent } from '@shared/components/fecha-component/fecha-component.component';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-nutrition',
  templateUrl: './nutrition.component.html',
  styleUrls: ['./nutrition.component.scss'],
})
export class NutritionComponent {
  @ViewChild('appFecha', { static: false }) appFecha!: FechaComponentComponent;

  donutChart: Chart;
  caloriasTotales: number = 120;
  user: any;
  fecha: Date;
  foodDataArray: { food: Food; foodInstance: FoodInstance }[] = [];

  carbsPercentage: number = 50;
  proteinsPercentage: number = 25;
  fatsPercentage: number = 25;
  carbsGrams: number = 0;
  proteinsGrams: number = 0;
  fatsGrams: number = 0;

  constructor(
    private fitcalAuthService: AuthService,
    private dateService: DateService,
    private diaryService: DiaryService,
    private foodService: FoodService,
    private nutricionService: NutricionService
  ) {
    this.donutChart = new Chart(donutChartOptions);
    this.user = fitcalAuthService.getUser();
    this.fecha = diaryService.fecha;
  }

  ngOnInit() {
    // Theme
    const currentTheme = localStorage.getItem('theme');
    document.documentElement.style.setProperty('--card-background-color', currentTheme === 'light' ? '#A8CCC9' : '#49433d');
    document.documentElement.style.setProperty('--card-color', currentTheme === 'light' ? '#333' : 'white');

    // LOGIC
    this.traerAlimentos();
  }

  onDiaIncrementado(fecha: Date) {
    this.traerAlimentos();
  }
  onDiaDecrementado(fecha: Date) {
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


  traerAlimentos() {
    const fecha = this.dateService.getFecha();
    const fechaFormateada = this.transformarDia(fecha);

    // 1. Sacamos dia
    this.diaryService.searchByDateAndUser(fechaFormateada, this.user.id)
      .subscribe((daysParam: Day[]) => {
        const day = daysParam[0];
        if (Array.isArray(daysParam) && daysParam.length === 0) {
          //No hay registros

          this.updateChartNothing();
        } else {
          //Ya hay registros

          // 2. Sacamos FoodInstances
          this.diaryService.getFoodInstancesByDay(day.id!).subscribe((foodInstances: FoodInstance[])=> {
            if (foodInstances.length === 0) {
              this.updateChartNothing();
            }
            this.updateChartWithData(foodInstances);
          });
        }
    });
  }

  private updateChartWithData(foodInstances: FoodInstance[]) {
    const foodDataArray: { food: Food; foodInstance: FoodInstance }[] = [];

    // Calcular el total de macros de las instancias de comida
    let totalProteins = 0;
    let totalCarbs = 0;
    let totalFats = 0;

    // Preparar una matriz de observables para obtener datos de alimentos para cada instancia de alimentos
    const fetchFoodObservables = foodInstances.map((foodInstance) =>
      this.foodService.getFoodById(foodInstance.food.id!)
    );

    // Usa forkJoin para combinar múltiples observables en uno solo
    forkJoin(fetchFoodObservables).subscribe((foods: Food[]) => {
      foods.forEach((food: Food, index: number) => {
        const foodInstance = foodInstances[index];
        totalProteins += (food.proteins / 100) * foodInstance.grams;
        totalCarbs += (food.carbs / 100) * foodInstance.grams;
        totalFats += (food.fats / 100) * foodInstance.grams;

        foodDataArray.push({food, foodInstance});
      });
      this.carbsGrams = Math.round(totalCarbs);
      this.proteinsGrams = Math.round(totalProteins);
      this.fatsGrams = Math.round(totalFats);

      this.foodDataArray = foodDataArray;

      const totalCalories = totalProteins * 4 + totalCarbs * 4 + totalFats * 9;
      this.proteinsPercentage = parseFloat(((totalProteins * 4 / totalCalories) * 100).toFixed(1));
      this.fatsPercentage = parseFloat(((totalFats * 9 / totalCalories) * 100).toFixed(1));
      this.carbsPercentage = parseFloat(((totalCarbs * 4 / totalCalories) * 100).toFixed(1));


      const macros = [
        { name: 'Carbohidratos', y: this.carbsPercentage, color: '#2ed6e5' },
        { name: 'Grasas', y: this.fatsPercentage, color: '#cc2ea8' },
        { name: 'Proteínas', y: this.proteinsPercentage, color: '#ffa800' },
      ];

      this.donutChart.ref$.subscribe((chartRef) => {
        chartRef.series[0].setData(macros);
        chartRef.setTitle({ text: 'Macros' });
        chartRef.setSubtitle({ text: 'Calorías totales: ' + totalCalories.toFixed(2) });
      });
    });
  }

  private updateChartNothing() {
    this.foodDataArray = [];
    this.defaultChart();
  }

  private defaultChart() {
    const macros = [
      [
        { name: 'Carbohidratos', y: 0, color: '#8AC2D1' },
        { name: 'Grasas', y: 0, color: '#fcb3e6' },
        { name: 'Proteínas', y: 0, color: '#ffd89e' },
      ]
    ];

    this.donutChart.ref$.subscribe((chartRef) => {
      chartRef.series[0].setData(macros);
      chartRef.setTitle({ text: 'Macros' });
      chartRef.setSubtitle({ text: 'Calorías totales: 0' });
    });
  }

  isFirstOccurrence(mealType: string, foodDataArray: { food: Food; foodInstance: FoodInstance }[], currentIndex: number): boolean {
    if (currentIndex === 0) {
      return true;
    }

    const previousMealType = foodDataArray[currentIndex - 1].foodInstance.mealType;
    return mealType !== previousMealType;
  }

  getMealTypeLabel(mealType: string): string {
    const mealTypeLabels: { [key: string]: string } = {
      BREAKFAST: 'Desayuno',
      LUNCH: 'Comida',
      DINNER: 'Cena',
      SNACKS: 'Snacks',
    };

    return mealTypeLabels[mealType] || '';
  }

  // Añadir linea gruesa
  shouldAddThickRow(foodDataArray: { food: Food; foodInstance: FoodInstance }[], currentIndex: number): boolean {
    if (currentIndex === 0) {
      return true; // Add thick row for the first row
    }

    const currentMealType = foodDataArray[currentIndex].foodInstance.mealType;
    const previousMealType = foodDataArray[currentIndex - 1].foodInstance.mealType;

    return currentMealType !== previousMealType;
  }

  // Ordenar filas
  getSortedFoodData(foodDataArray: { food: Food; foodInstance: FoodInstance }[]): { food: Food; foodInstance: FoodInstance }[] {
    const mealTypeOrder: { [key: string]: number } = {
      BREAKFAST: 1,
      LUNCH: 2,
      DINNER: 3,
      SNACKS: 4,
    };

    return foodDataArray.sort((a, b) => {
      const mealTypeA = a.foodInstance.mealType.toUpperCase();
      const mealTypeB = b.foodInstance.mealType.toUpperCase();

      const orderA = mealTypeOrder[mealTypeA];
      const orderB = mealTypeOrder[mealTypeB];

      if (orderA && orderB) {
        if (orderA < orderB) {
          return -1;
        }
        if (orderA > orderB) {
          return 1;
        }
      }

      return a!.foodInstance.id! - b!.foodInstance.id!;
    });
  }

}
