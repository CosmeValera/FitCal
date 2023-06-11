import { Options } from 'highcharts';

export const donutChartOptions: Options = {
  chart: {
    type: 'pie',
    plotShadow: false,
    backgroundColor: '#fff0f0',
  },
  credits: {
    enabled: false,
  },
  plotOptions: {
    pie: {
      innerSize: '99%',
      borderWidth: 40,
      borderColor: undefined,
      slicedOffset: 20,
      dataLabels: {
        format: '<b>{point.name}</b>: {point.percentage:.1f}%',
        connectorWidth: 0,
      },
    },
  },
  title: {
    verticalAlign: 'middle',
    floating: true,
    text: 'Macros',
  },
  subtitle: {
    // verticalAlign: 'bottom',
    y: 225,
    floating: true,
    text: 'Calorias Totales: 0',
    style: {
      fontSize: '16px',
      fontWeight: 'bold',
    },
  },
  legend: {
    enabled: false,
  },
  series: [
    {
      type: 'pie',
      data: [
        { name: 'Carbohidratos', y: 0, color: '#00ffff' },
        { name: 'Grasas', y: 0, color: '#ff00ff' },
        { name: 'Proteínas', y: 0, color: '#ffa800' },
      ],
    },
  ],
};
