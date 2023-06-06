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
  caloriasTotales: number = 120;

  constructor() {
    this.donutChart = new Chart(donutChartOptions);
    this.updateChartWithData();
  }

  private updateChartWithData() {
    // SACAR los macros y las calorias de un usuario o dia mock.

    const macros = [
      { name: 'Carbohidratos', y: 40, color: '#00ffff' },
      { name: 'Grasas', y: 30, color: '#ff00ff' },
      { name: 'Proteínas', y: 10, color: '#ffa800' }
    ];

    this.donutChart.ref$.subscribe(chartRef => {
      chartRef.series[0].setData(macros);
      chartRef.setTitle({ text: 'Macros' });
      chartRef.setSubtitle({ text: 'Calorías totales: ' + this.caloriasTotales });
    });
  }
}
