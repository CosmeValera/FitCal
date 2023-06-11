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
    this.traerAlimentos();
  }

  // FECHA
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
          console.log(`No hay un registro para ${fechaFormateada} y el usuario ${this.user.id}.`);
          // this.foodInstances = [];
          this.foodDataArray = [];
          this.defaultChart();
        } else {
          console.log(`Ya hay un registro para ${fechaFormateada} y el usuario ${this.user.id}.`);
          console.log(day);

          // 2. Sacamos FoodInstances
          this.diaryService.getFoodInstancesByDay(day.id!).subscribe((foodInstances: FoodInstance[])=> {
            if (foodInstances.length === 0) {
              this.defaultChart();
            }
            this.updateChartWithData(foodInstances);
          });
        }
    });
  }
  private updateChartWithData(foodInstances: FoodInstance[]) {
    const foodDataArray: { food: Food; foodInstance: FoodInstance }[] = [];

    // Calculate the total macros from food instances
    let totalProteins = 0;
    let totalCarbs = 0;
    let totalFats = 0;

    // Prepare an array of observables to fetch food data for each food instance
    const fetchFoodObservables = foodInstances.map((foodInstance) =>
      this.foodService.getFoodById(foodInstance.food.id!)
    );

    // Use forkJoin to combine multiple observables into a single observable
    forkJoin(fetchFoodObservables).subscribe((foods: Food[]) => {
      foods.forEach((food: Food, index: number) => {
        const foodInstance = foodInstances[index];
        totalProteins += (food.proteins / 100) * foodInstance.grams;
        totalCarbs += (food.carbs / 100) * foodInstance.grams;
        totalFats += (food.fats / 100) * foodInstance.grams;

        foodDataArray.push({food, foodInstance});
      });
      this.foodDataArray = foodDataArray;
      console.log(this.foodDataArray);

      const totalCalories = totalProteins * 4 + totalCarbs * 4 + totalFats * 9;

      const macros = [
        { name: 'Carbohidratos', y: parseFloat(totalCarbs.toFixed(2)), color: '#00ffff' },
        { name: 'Grasas', y: parseFloat(totalFats.toFixed(2)), color: '#ff00ff' },
        { name: 'Proteínas', y: parseFloat(totalProteins.toFixed(2)), color: '#ffa800' },
      ];

      this.donutChart.ref$.subscribe((chartRef) => {
        chartRef.series[0].setData(macros);
        chartRef.setTitle({ text: 'Macros' });
        chartRef.setSubtitle({ text: 'Calorías totales: ' + totalCalories.toFixed(2) });
      });
    });
  }
  private defaultChart() {
    const macros = [
      { name: 'Carbohidratos', y: 0, color: '#00ffff' },
      { name: 'Grasas', y: 0, color: '#ff00ff' },
      { name: 'Proteínas', y: 0, color: '#ffa800' },
    ];

    this.donutChart.ref$.subscribe((chartRef) => {
      chartRef.series[0].setData(macros);
      chartRef.setTitle({ text: 'Macros' });
      chartRef.setSubtitle({ text: 'Calorías totales: 0' });
    });
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

}
