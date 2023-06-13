import { Component, Input, OnInit, Output } from '@angular/core';
import { WeightDay } from '@shared/interfaces/weightDayInterface';
import { WeightDayService } from '@shared/services/weightDay.service';
import { NgModule } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-weight-days',
  templateUrl: './weight-days.component.html',
  styleUrls: ['./weight-days.component.scss']
})
export class WeightDaysComponent implements OnInit {
  weightDays: WeightDay[] = [];
  @Input() user: any; // Para recalcular

  view: [number, number] = [400, 300]; // Define the chart view dimensions
  colorScheme: any = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA'] // Define the chart color scheme
  };
  chartData: any[] = []; // Define the chart data array


  constructor(private weightDayService: WeightDayService) {}

  ngOnInit() {
    // Call a method to fetch the weight data when the component initializes
    this.getWeightDays();
  }

  getWeightDays() {
    // Call the WeightDayService to fetch the weight data for the current user
    this.weightDayService.getWeightDaysByUserId(this.user.id).subscribe((data: WeightDay[]) => {
      this.weightDays = data;

      this.weightDays.sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return dateA.getTime() - dateB.getTime();
      });

      console.log(this.weightDays);

      // Call a method to update the chart data with the fetched weight data
      this.updateChartData();
    });
  }

  updateChartData() {
    // Clear the existing chart data
    this.chartData = [];

    // Iterate over the weightDays array and populate the chartData array
    for (const weightDay of this.weightDays) {
      const chartEntry = {
        name: weightDay.date, // Date as the x-axis value
        value: weightDay.weight // Weight as the y-axis value
      };
      this.chartData.push(chartEntry);
    }
  }

}
