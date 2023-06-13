import { Component, Input, OnInit, Output } from '@angular/core';
import { WeightDay } from '@shared/interfaces/weightDayInterface';
import { WeightDayService } from '@shared/services/weightDay.service';

@Component({
  selector: 'app-weight-days',
  templateUrl: './weight-days.component.html',
  styleUrls: ['./weight-days.component.scss']
})
export class WeightDaysComponent implements OnInit {
  weightDays: WeightDay[] = [];
  @Input() user: any; // Para recalcular

  // Add any other variables required for chart configuration

  constructor(private weightDayService: WeightDayService) {}

  ngOnInit() {
    // Call a method to fetch the weight data when the component initializes
    this.getWeightDays();
  }

  getWeightDays() {
    // Call the WeightDayService to fetch the weight data for the current user
    this.weightDayService.getWeightDaysByUserId(this.user.id).subscribe((data: WeightDay[]) => {
      this.weightDays = data;

      // Call a method to update the chart data with the fetched weight data
      this.updateChartData();
    });
  }

  updateChartData() {
    // Implement the logic to update the chart data based on the fetched weight data
    // You can use libraries like Chart.js or ngx-charts to create and update the chart
  }
}
