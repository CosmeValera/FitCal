import { Component, Input, OnInit, Output } from '@angular/core';
import { WeightDay } from '@shared/interfaces/weightDayInterface';
import { WeightDayService } from '@shared/services/weightDay.service';
import { NgModule } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { DialogCreateWeightDayComponent } from '../dialog-create-weight-day/dialog-create-weight-day.component';

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


  constructor(
    private matDialog: MatDialog,
    private weightDayService: WeightDayService
  ) {}

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

  openNewWeightDayComponent() {
    const createWeightDaysComponent = this.matDialog.open(DialogCreateWeightDayComponent);
    createWeightDaysComponent.afterClosed().subscribe((weightDay) => {
      this.weightDayService.createWeightDay(weightDay).subscribe(()=> {
        window.location.reload();
      }, (error) =>{
        console.error('Error al dar de alta el peso:', error);
      });
    });
  }

  editWeightDay(weightDay: WeightDay) {
    const dialogRef = this.matDialog.open(DialogCreateWeightDayComponent, {
      width: '400px',
      data: weightDay, // Pass the weightDay to edit as data to the dialog
    });

    dialogRef.afterClosed().subscribe((result: WeightDay) => {
      this.weightDayService.updateWeightDay(weightDay).subscribe(()=> {
        window.location.reload();
      }, (error) =>{
        console.error('Error al actualizar el peso:', error);
      });
    });
  }

  deleteWeightDay(weightDay: WeightDay) {
    const dialogRef = this.matDialog.open(ConfirmationDialogComponent, {
      width: '400px',
      data: '¿Estás seguro que quieres eliminar este dato?',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.weightDayService.deleteWeightDay(weightDay).subscribe((result) => {
          //Se elimino con exito.
          window.location.reload();
        }, (error) => {
          console.log("Error al eliminar. weightday id: ", weightDay.id!, error);
        });
      }
    });
  }
}
