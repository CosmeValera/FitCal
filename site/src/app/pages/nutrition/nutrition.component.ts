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
  foodInstances: FoodInstance[] = [];

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
          this.foodInstances = [];
        } else {
          console.log(`Ya hay un registro para ${fechaFormateada} y el usuario ${this.user.id}.`);
          console.log(day);

          // 2. Sacamos FoodInstances
          this.diaryService.getFoodInstancesByDay(day.id!).subscribe((foodInstances: FoodInstance[])=> {
            this.updateChartWithData(foodInstances);
          });
        }
    });
  }
  private updateChartWithData(foodInstances: FoodInstance[]) {
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
      });

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
  // //Buscamos el dia mediante el id de usuario y fecha
  // private getDayByIdAndDate(){
  //   const fechaGlobal: Date = this.dateService.getFecha();
  //   const fechaFormateda = this.formatearFecha(fechaGlobal);

  //   this.diaryService.searchByDateAndUser(fechaFormateda, this.user.id)
  //     .subscribe((daysParam) => {
  //         if (Array.isArray(daysParam) && daysParam.length === 0) {
  //           console.log("El dia no existe");
  //         } else {
  //           this.datosDia = daysParam[0];
  //           const idDia = this.datosDia.id!;
  //           console.log("Id de DAY: ", idDia) //NECESITAMOS EL ID

  //           this.updateChartWithData();
  //         }
  //       }, (error) => {
  //         console.error('Error al verificar la existencia del dia en diario:', error);
  //       }
  //     );
  // }


  // HELPERS métodos
  // getFoodName(foodId: number): string {
  //   const food: Food = this.foodService.getFoodById(foodId);
  //   return food ? food.name : '';
  // }
  // getFoodCarbs(foodId: number): number {
  //   // console.log(foodId);
  //   const food: Food = this.foodService.getFoodById(foodId);
  //   return food ? food.carbs : 0;
  // }
  // getFoodProteins(foodId: number): number {
  //   const food: Food = await this.foodService.getFoodById(foodId);
  //   return food ? food.proteins : 0;
  // }
  // getFoodFats(foodId: number): number {
  //   const food: Food = this.foodService.getFoodById(foodId);
  //   return food ? food.fats : 0;
  // }
  // getFoodCalories(foodId: number, grams: number): number {
  //   const food: Food = this.foodService.getFoodById(foodId);
  //   return food ? (food.kcal / 100) * grams : 0;
  // }

  // BORRAR
  // getFoodById(foodId: number) {
  //   return {} as Food;
  // }

  // // Ordenar filas
  // getSortedFoodInstances(foodInstances: FoodInstance[]): FoodInstance[] {
  //   const mealTypeOrder: { [key: string]: number } = {
  //     BREAKFAST: 1,
  //     LUNCH: 2,
  //     DINNER: 3,
  //     SNACKS: 4,
  //   };

  //   return foodInstances.sort((a, b) => {
  //     const mealTypeA = a.mealType.toLowerCase();
  //     const mealTypeB = b.mealType.toLowerCase();

  //     const orderA = mealTypeOrder[mealTypeA];
  //     const orderB = mealTypeOrder[mealTypeB];

  //     if (orderA && orderB) {
  //       if (orderA < orderB) {
  //         return -1;
  //       }
  //       if (orderA > orderB) {
  //         return 1;
  //       }
  //     }

  //     return a!.id! - b!.id!;
  //   });
  // }

  // Añadir linea gruesa
  shouldAddThickRow(foodInstances: FoodInstance[], currentIndex: number): boolean {
    if (currentIndex === 0) {
      return true; // Add thick row for the first row
    }

    const currentMealType = foodInstances[currentIndex].mealType;
    const previousMealType = foodInstances[currentIndex - 1].mealType;

    return currentMealType !== previousMealType;
  }


  // private mockInfo() {
  //   const fechaGlobal: Date = this.dateService.getFecha();
  //   this.formatearFecha(fechaGlobal);

  //   // Usuario registrado
  //   const user: User = {
  //     email: this.user.email,
  //     googleId: this.user.googleId,
  //     name: this.user.name,
  //     photoUrl: this.user.photoUrl,
  //     weight: this.user.weight,
  //     height: this.user.height,
  //     gender: this.user.gender,
  //     birth_date: this.user.birth_date,
  //     goal: this.user.goal,
  //     activityLevel: this.user.activityLevel,
  //     calories: this.user.calories,
  //     days: [],
  //   };

  //   // Day Real
  //   const day: Day = {
  //     date: fechaGlobal,
  //     user: this.user,
  //     foodInstances: [],
  //   };

  //   // Example food instances
  //   // const foodInstance4: FoodInstance = {
  //   //   food_id: 2,
  //   //   day_id: 1,
  //   //   meal_type: 'Snacks',
  //   //   grams: 200,
  //   // };

  //   // const foodInstance1: FoodInstance = {
  //   //   food_id: 1,
  //   //   day_id: 1,
  //   //   meal_type: 'Breakfast',
  //   //   grams: 200,
  //   // };

  //   // const foodInstance2: FoodInstance = {
  //   //   food_id: 2,
  //   //   day_id: 1,
  //   //   meal_type: 'Lunch',
  //   //   grams: 300,
  //   // };

  //   // const foodInstance3: FoodInstance = {
  //   //   food_id: 1,
  //   //   day_id: 1,
  //   //   meal_type: 'Breakfast',
  //   //   grams: 200,
  //   // };

  //   // const foodInstance5: FoodInstance = {
  //   //   food_id: 2,
  //   //   day_id: 1,
  //   //   meal_type: 'Dinner',
  //   //   grams: 200,
  //   // };

  //   // const foodInstance6: FoodInstance = {
  //   //   food_id: 1,
  //   //   day_id: 1,
  //   //   meal_type: 'Snacks',
  //   //   grams: 200,
  //   // };

  //   // day.foodInstances!.push(foodInstance1, foodInstance2, foodInstance3, foodInstance4, foodInstance5, foodInstance6);
  //   user.days.push();

  //   return user;
  // }

  // TODO: en vez de esto llamar al servicio

  // private getFoodById(foodId: number): Food {

  //   this.foodService
  //     .getFoodById(foodId)
  //     .subscribe(
  //       (foodParam) => {
  //         console.log(foodParam)
  //       },
  //       (error) => {
  //         console.error(
  //           'Error', error
  //         );
  //       }
  //     );

  //   const food1: Food = {
  //     id: 1,
  //     name: "Brown Rice",
  //     image: "https://example.com/rice.jpg",
  //     brand: "Example Brand",
  //     kcal: 150,
  //     proteins: 3,
  //     carbs: 30,
  //     fats: 1
  //   };

  //   const food2: Food = {
  //     id: 2,
  //     name: "Avocado",
  //     image: "https://example.com/avocado.jpg",
  //     brand: "Example Brand",
  //     kcal: 160,
  //     proteins: 2,
  //     carbs: 9,
  //     fats: 15
  //   };

  //   if (foodId === 1) {
  //     return food1;
  //   } else if (foodId === 2) {
  //     return food2;
  //   } else {
  //     return {} as Food; // Return an empty object if the food item is not found
  //   }
  // }

}
