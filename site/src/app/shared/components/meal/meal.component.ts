import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-meal',
  templateUrl: './meal.component.html',
  styleUrls: ['./meal.component.scss']
})
export class MealComponent {
  @Input() meal: string = '';
  foods: string[] = [];
  showOptions = false;

  readonly ingredients = [
    'lettuce',
    'tomato',
    'avocado'
  ];

  addItem(food: string): void {
    this.showOptions = false;

    if (food == '') {
      return;
    }
    this.foods.push(food);
  }
}
