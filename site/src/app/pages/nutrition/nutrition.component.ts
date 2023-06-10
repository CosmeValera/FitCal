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

@Component({
  selector: 'app-nutrition',
  templateUrl: './nutrition.component.html',
  styleUrls: ['./nutrition.component.scss'],
})
export class NutritionComponent {
  donutChart: Chart;
  caloriasTotales: number = 120;
  user: any;
  fecha!: Date;
  fechaFormateda!: string;
  datosDia!: Day;
  datosDiaArray!: Day[];
  datosFoodInstance!: FoodInstance[];
  idDia!: number;

  constructor(
    private fitcalAuthService: AuthService,
    private dateService: DateService,
    private diaryService: DiaryService,
    private foodService: FoodService,
    private nutricionService: NutricionService) {
    this.donutChart = new Chart(donutChartOptions);
    this.user = fitcalAuthService.getUser();
    this.fecha = diaryService.fecha;

    this.getDayByIdAndDate();
  }

  formatearFecha(date: Date): void {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    this.fechaFormateda = `${year}-${month}-${day}`;
  }

  //Buscamos el dia mediante el id de usuario y fecha
  private getDayByIdAndDate(){
    const fechaGlobal: Date = this.dateService.getFecha();
    this.formatearFecha(fechaGlobal);
    
    this.diaryService
      .searchByDateAndUser(this.fechaFormateda, this.user.id)
      .subscribe(
        (dayParam) => {
          if (Array.isArray(dayParam) && dayParam.length === 0) {
            console.log("El dia no existe");
          } else {
            this.datosDia = dayParam[0];
            this.datosDiaArray = dayParam;
            this.idDia = this.datosDia.id!;
            console.log("Id de DAY: ", this.datosDia.id) //NECESITAMOS EL ID
            console.log("Id de DAY: ", this.idDia) //NECESITAMOS EL ID
            
            this.updateChartWithData();
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
  }
  
  private updateChartWithData() {
    console.log("Datos devueltos: ", this.idDia) 

    // Calculate the total macros from food instances
    let totalProteins = 0;
    let totalCarbs = 0;
    let totalFats = 0;

    this.nutricionService.searchByIdDay(this.datosDia.id!)
    .subscribe(
      (foodInstanceParam) => {
        if (Array.isArray(foodInstanceParam) && foodInstanceParam.length === 0) {
          console.log("No existen datos");
        } else {
          this.datosFoodInstance = foodInstanceParam;
          console.log("Datos devueltos: ", foodInstanceParam)
        }
      },
      (error) => {
        console.error(
          'Error al verificar la existencia de datos foodInstance:',
          error
        );
        // Manejar el error si ocurre alguna falla en la verificación
      }
    );

    this.datosFoodInstance?.forEach((foodInstance: FoodInstance) => {
      const food: Food = this.getFoodById(foodInstance.food.id!);
      totalProteins += (food.proteins / 100) * foodInstance.grams;
      totalCarbs += (food.carbs / 100) * foodInstance.grams;
      totalFats += (food.fats / 100) * foodInstance.grams;
    });

    const totalCalories = totalProteins * 4 + totalCarbs * 4 + totalFats * 9;

    const macros = [
      { name: 'Carbohidratos', y: totalCarbs, color: '#00ffff' },
      { name: 'Grasas', y: totalFats, color: '#ff00ff' },
      { name: 'Proteínas', y: totalProteins, color: '#ffa800' },
    ];

    this.donutChart.ref$.subscribe((chartRef) => {
      chartRef.series[0].setData(macros);
      chartRef.setTitle({ text: 'Macros' });
      chartRef.setSubtitle({ text: 'Calorías totales: ' + totalCalories });
    });
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
  
  private getFoodById(foodId: number): Food {
    
    this.foodService
      .getFoodById(foodId)
      .subscribe(
        (foodParam) => {   
          console.log(foodParam)       
        },
        (error) => {
          console.error(
            'Error', error
          );
        }
      );
    
    const food1: Food = {
      id: 1,
      name: "Brown Rice",
      image: "https://example.com/rice.jpg",
      brand: "Example Brand",
      kcal: 150,
      proteins: 3,
      carbs: 30,
      fats: 1
    };

    const food2: Food = {
      id: 2,
      name: "Avocado",
      image: "https://example.com/avocado.jpg",
      brand: "Example Brand",
      kcal: 160,
      proteins: 2,
      carbs: 9,
      fats: 15
    };

    if (foodId === 1) {
      return food1;
    } else if (foodId === 2) {
      return food2;
    } else {
      return {} as Food; // Return an empty object if the food item is not found
    }
  }

  // HELPERS métodos
  getFoodName(foodId: number): string {
    const food: Food = this.getFoodById(foodId);
    return food ? food.name : '';
  }
  getFoodCarbs(foodId: number): number {
    console.log(foodId);
    const food: Food = this.getFoodById(foodId);
    return food ? food.carbs : 0;
  }
  getFoodProteins(foodId: number): number {
    const food: Food = this.getFoodById(foodId);
    return food ? food.proteins : 0;
  }
  getFoodFats(foodId: number): number {
    const food: Food = this.getFoodById(foodId);
    return food ? food.fats : 0;
  }
  getFoodCalories(foodId: number, grams: number): number {
    const food: Food = this.getFoodById(foodId);
    return food ? (food.kcal / 100) * grams : 0;
  }

  // Ordenar filas
  getSortedFoodInstances(foodInstances: FoodInstance[]): FoodInstance[] {
    const mealTypeOrder: { [key: string]: number } = {
      breakfast: 1,
      lunch: 2,
      dinner: 3,
      snacks: 4,
    };

    return foodInstances.sort((a, b) => {
      const mealTypeA = a.mealType.toLowerCase();
      const mealTypeB = b.mealType.toLowerCase();

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

      return a!.id! - b!.id!;
    });
  }

  // Añadir linea gruesa
  shouldAddThickRow(foodInstances: FoodInstance[], currentIndex: number): boolean {
    if (currentIndex === 0) {
      return true; // Add thick row for the first row
    }

    const currentMealType = foodInstances[currentIndex].mealType;
    const previousMealType = foodInstances[currentIndex - 1].mealType;

    return currentMealType !== previousMealType;
  }
}
