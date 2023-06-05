import { Component } from '@angular/core';
import { ChartModule, Chart } from 'angular-highcharts';
import { donutChartOptions } from '@shared/helpers/donutChartOptions';

@Component({
  selector: 'app-nutrition',
  templateUrl: './nutrition.component.html',
  styleUrls: ['./nutrition.component.scss']
})
export class NutritionComponent {
  donutChart: Chart;

  constructor() {
    this.donutChart = new Chart(donutChartOptions);
    this.updateChartWithData();
  }

  private updateChartWithData() {
    const macros = [
      { name: 'Carbohidratos', y: 80, color: '#00ffff' },
      { name: 'Grasas', y: 30, color: '#ff00ff' },
      { name: 'Proteínas', y: 10, color: '#ffa800' },
    ];

    this.donutChart.ref$.subscribe(chartRef => {
      chartRef.setTitle({ text: 'Macros' });
      chartRef.series[0].setData(macros);
    });
  }
}
