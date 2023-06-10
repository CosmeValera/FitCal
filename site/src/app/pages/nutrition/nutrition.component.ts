import { Component, ElementRef, ViewChild } from '@angular/core';
import { ChartModule, Chart } from 'angular-highcharts';
import { donutChartOptions } from '@shared/helpers/donutChartOptions';
import { AuthService } from '@shared/services/auth.service';
import { User } from '@shared/interfaces/userInterface';
import { Day } from '@shared/interfaces/dayInterface';
import { FoodInstance } from '@shared/interfaces/foodInstanceInterface';
import { Food } from '@shared/interfaces/foodInterface';

@Component({
  selector: 'app-nutrition',
  templateUrl: './nutrition.component.html',
  styleUrls: ['./nutrition.component.scss'],
})
export class NutritionComponent {
  @ViewChild('appFecha', { static: false }) appFecha: any;

  donutChart: Chart;
  caloriasTotales: number = 120;
  user: any;

  // BOrrar
  mockUser: any;

  constructor(private fitcalAuthService: AuthService) {
    this.donutChart = new Chart(donutChartOptions);
    this.user = fitcalAuthService.getUser();
    this.updateChartWithData();
  }

  private updateChartWithData() {
    // REAL
    // console.log("user localstorage", this.user);

    //Mock
    this.mockUser = this.mockInfo();
    console.log("mockUser", this.mockUser);

    const day = this.mockUser.days[0]; // Assuming there is only one day in the user's days array

    // Calculate the total macros from food instances
    const totalProteins = 0;
    const totalCarbs = 0;
    const totalFats = 0;

    day.foodInstances?.forEach((foodInstance: FoodInstance) => {
      // const food: Food = this.getFoodById(foodInstance.food_id);
      // totalProteins += (food.proteins / 100) * foodInstance.grams;
      // totalCarbs += (food.carbs / 100) * foodInstance.grams;
      // totalFats += (food.fats / 100) * foodInstance.grams;
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

  private mockInfo() {
    // Example user
    const user: User = {
      email: 'example@example.com',
      googleId: 'googleId123',
      name: 'John Doe',
      photoUrl: 'https://example.com/photo.jpg',
      weight: 70,
      height: 170,
      gender: 'Male',
      birth_date: '1990-01-01',
      goal: 'Lose weight',
      activityLevel: 'Moderate',
      calories: 2000,
      days: [],
    };

    // Example day
    const day: Day = {
      date: new Date(),
      user: this.user,
      foodInstances: [],
    };

    // Example food instances
    // const foodInstance4: FoodInstance = {
    //   food_id: 2,
    //   day_id: 1,
    //   meal_type: 'Snacks',
    //   grams: 200,
    // };

    // const foodInstance1: FoodInstance = {
    //   food_id: 1,
    //   day_id: 1,
    //   meal_type: 'Breakfast',
    //   grams: 200,
    // };

    // const foodInstance2: FoodInstance = {
    //   food_id: 2,
    //   day_id: 1,
    //   meal_type: 'Lunch',
    //   grams: 300,
    // };

    // const foodInstance3: FoodInstance = {
    //   food_id: 1,
    //   day_id: 1,
    //   meal_type: 'Breakfast',
    //   grams: 200,
    // };

    // const foodInstance5: FoodInstance = {
    //   food_id: 2,
    //   day_id: 1,
    //   meal_type: 'Dinner',
    //   grams: 200,
    // };

    // const foodInstance6: FoodInstance = {
    //   food_id: 1,
    //   day_id: 1,
    //   meal_type: 'Snacks',
    //   grams: 200,
    // };

    // day.foodInstances!.push(foodInstance1, foodInstance2, foodInstance3, foodInstance4, foodInstance5, foodInstance6);
    user.days.push(day);

    return user;
  }

  // TODO: en vez de esto llamar al servicio
  private getFoodById(foodId: number): Food {
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

  // FECHA
  onDiaIncrementado(fecha: Date) {
    const selectedDate = this.transformarDia(fecha);
    console.log('Selected date:', selectedDate);
    console.log('Dia incrementado:', fecha);
  }

  onDiaDecrementado(fecha: Date) {
    const selectedDate = this.transformarDia(fecha);
    console.log('Selected date:', selectedDate);
    console.log('Dia decrementado:', fecha);
  }

  transformarDia(fecha: Date): string {
    const date = new Date(fecha);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    const selectedDate = `${year}-${month}-${day}`;
    return selectedDate;
  }

  // HELPERS métodos
  getFoodName(foodId: number): string {
    const food: Food = this.getFoodById(foodId);
    return food ? food.name : '';
  }
  getFoodCarbs(foodId: number): number {
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
