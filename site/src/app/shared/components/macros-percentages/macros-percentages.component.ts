import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-macros-percentages',
  templateUrl: './macros-percentages.component.html',
  styleUrls: ['./macros-percentages.component.scss']
})
export class MacrosPercentagesComponent {

  // @Input() fatsGoal: number = 0;
  // @Input() proteinsGoal: number = 0;
  // @Input() carbsGoal: number = 0;

  constructor() {}

  updateGoals() {
    // Here, you can handle the logic to update the goals in the user object or perform any other necessary actions.
    // For example, you can emit an event to pass the updated goals to the parent component.
    // You can access the selectedOption, fatsGoal, proteinsGoal, and carbsGoal properties to get the selected values.
  }
}
