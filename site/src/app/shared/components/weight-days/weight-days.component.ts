import { Component, Input, OnInit } from '@angular/core';
import { WeightDay } from '@shared/interfaces/weightDayInterface';
import { WeightDayService } from '@shared/services/weightDay.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { DialogCreateWeightDayComponent } from '../dialog-create-weight-day/dialog-create-weight-day.component';

@Component({
  selector: 'app-weight-days',
  templateUrl: './weight-days.component.html',
  styleUrls: ['./weight-days.component.scss']
})
export class WeightDaysComponent implements OnInit {
  weightDays: WeightDay[] = [];
  @Input() user: any; // Para recalcular

  view: [number, number] = [400, 300];
  colorScheme: any = {
    domain: ['#F19FB3', '#F9C2CF', '#F7E5B8', '#CED4DB'] // Colores de las barras
  };
  chartData: any[] = [];


  constructor(
    private matDialog: MatDialog,
    private weightDayService: WeightDayService
  ) {}

  ngOnInit() {
    // Llama a un método para obtener los datos de peso cuando se inicializa el componente
    this.getWeightDays();
  }

  getWeightDays() {
    // Llama al WeightDayService para obtener los datos de peso del usuario actual
    this.weightDayService.getWeightDaysByUserId(this.user.id).subscribe((data: WeightDay[]) => {
      this.weightDays = data;

      this.weightDays.sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return dateA.getTime() - dateB.getTime();
      });

      console.log(this.weightDays);

      // Llama a un método para actualizar los datos del gráfico con los datos de peso obtenidos
      this.updateChartData();
    });
  }

  updateChartData() {
    // Borra los datos existentes del gráfico
    this.chartData = [];

    // Recorre el array weightDays y llena el array chartData
    for (const weightDay of this.weightDays) {
      const chartEntry = {
        name: weightDay.date, // Fecha como valor del eje x
        value: weightDay.weight // Peso como valor del eje y
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
      data: weightDay, // Pasa el weightDay a editar como dato para el diálogo
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
          // Se eliminó con éxito.
          window.location.reload();
        }, (error) => {
          console.log("Error al eliminar. weightday id: ", weightDay.id!, error);
        });
      }
    });
  }
}
