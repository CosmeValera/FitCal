import { Component, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-macros-perc',
  templateUrl: './macros-perc.component.html',
  styleUrls: ['./macros-perc.component.scss']
})
export class MacrosPercComponent implements OnChanges {

  @Input() fatsGoal: number = 0;
  @Input() proteinsGoal: number = 0;
  @Input() carbsGoal: number = 0;

  constructor() {}

  ngOnChanges() {
    this.updateGoals('');
  }


  updateGoals(type: string) {
    const sum = this.fatsGoal + this.proteinsGoal + this.carbsGoal;

    if (sum !== 100) {
      switch(type) {
        case 'carbs':
          {
            const diff = 100 - sum;
            const distribution = diff / 2;

            this.fatsGoal += distribution;
            this.proteinsGoal += distribution;
          }
          break;
        case 'fats':
          {
            const diff = 100 - sum;
            const distribution = diff / 2;

            this.proteinsGoal += distribution;
            this.carbsGoal += distribution;
          }
          break;
        case 'proteins':
          {
            const diff = 100 - sum;
            const distribution = diff / 2;

            this.fatsGoal += distribution;
            this.carbsGoal += distribution;
          }
          break;
        default:
          {
            const diff = 100 - sum;
            const distribution = diff / 3;

            this.fatsGoal += distribution;
            this.proteinsGoal += distribution;
            this.carbsGoal += distribution;
          }
          break;
      }
    }
  }
}
