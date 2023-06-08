import { Component, ViewChild } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatDialog } from '@angular/material/dialog';
import { CaloriesDialogComponent } from '@shared/components/calories-dialog/calories-dialog.component';
import { FechaComponentComponent } from '@shared/components/fecha-component/fecha-component.component';
import { Day } from '@shared/interfaces/dayInterface';
import { Food } from '@shared/interfaces/foodInterface';
import { DiaryService } from '@shared/services/diary.service';
import { FoodService } from '@shared/services/food.service';


@Component({
  selector: 'app-diary',
  templateUrl: './diary.component.html',
  styleUrls: ['./diary.component.scss']
})
export class DiaryComponent {
  calories: number = 2500;
  day: any;
  fecha: Date = new Date();
  fechaFormateada: string = '2001-01-01';
  @ViewChild(FechaComponentComponent)
  fechaDiario!: FechaComponentComponent;

  constructor(
    private alimentoService: FoodService, 
    public dialog: MatDialog,
    private dayService: DiaryService,
    ) 
    {}

  ngOnInit() {
    this.comprobarDay();
  }


  comprobarDay(){   
    // this.user = this.fitcalAuthService.getUser();
    // this.dayService.getDayByFechaAndUser(this.fechaDiario.selectedDate, 3).subscribe((dayParam?) => {
    //   console.log("Fecha: " + this.fechaDiario.selectedDate);
    //   console.log(dayParam);

    //   if (dayParam) {
    //     console.log('El dia existe en la base de datos', dayParam);
    //     //Entonces creamos el alimento

    //   } else {
    //     console.log('El usuario no existe en la base de datos, lo creamos');
        
    //     let dayCrear: Day = {
    //       user_id: 3,
    //       date: this.fechaDiario.fecha
    //     }   

    //     //Creamos el dia
    //     this.dayService.createDay(dayCrear)
    //     .subscribe(data => {
    //       alert("Se Agrego con Exito el dia...!!");
    //     })        
    //   }
    // }, (error) => {
    //   console.error('Error al verificar la existencia del dia en diario:', error);
    //   // Manejar el error si ocurre alguna falla en la verificación
    // });

    // --- ¿Existe? Si, entonces añade el alimento a food instance
    // --- ¿Existe? No, crea la fila dia con usuario y fecha y añade el alimento
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(CaloriesDialogComponent, {
      width: '250px',
      data: {
        goalCalories: '3000',
        foodCalories: '500',
        leftCalories: '2500'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
    });
  }
}
