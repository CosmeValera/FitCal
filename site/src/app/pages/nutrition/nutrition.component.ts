import { Component } from '@angular/core';
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
  donutChart: Chart;
  caloriasTotales: number = 120;
  user: any;

  constructor(private fitcalAuthService: AuthService) {
    this.donutChart = new Chart(donutChartOptions);
    this.user = fitcalAuthService.getUser();
    this.updateChartWithData();
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
      user_id: 1,
      date: new Date(),
      foodInstances: [],
    };

    // Example food instances
    const foodInstance1: FoodInstance = {
      food_id: 1,
      day_id: 1,
      meal_type: 'Breakfast',
      grams: 200,
    };

    const foodInstance2: FoodInstance = {
      food_id: 2,
      day_id: 1,
      meal_type: 'Lunch',
      grams: 300,
    };

    day.foodInstances!.push(foodInstance1, foodInstance2);
    user.days.push(day);

    return user;
  }

  private updateChartWithData() {
    // REAL
    // console.log("user localstorage", this.user);

    let mockUser = this.mockInfo();
    console.log("mockUser", mockUser);

    const day = mockUser.days[0]; // Assuming there is only one day in the user's days array

    // Calculate the total macros from food instances
    let totalProteins = 0;
    let totalCarbs = 0;
    let totalFats = 0;

    day.foodInstances?.forEach((foodInstance: FoodInstance) => {
      const food: Food = this.getFoodById(foodInstance.food_id);
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
}
