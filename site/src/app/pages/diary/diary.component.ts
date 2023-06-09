import { Component, ViewChild } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatDialog } from '@angular/material/dialog';
import { CaloriesDialogComponent } from '@shared/components/calories-dialog/calories-dialog.component';
import { FechaComponentComponent } from '@shared/components/fecha-component/fecha-component.component';
import { Day } from '@shared/interfaces/dayInterface';
import { FoodInstance } from '@shared/interfaces/foodInstanceInterface';
import { Food } from '@shared/interfaces/foodInterface';
import { AuthService } from '@shared/services/auth.service';
import { DiaryService } from '@shared/services/diary.service';
import { FoodService } from '@shared/services/food.service';


@Component({
  selector: 'app-diary',
  templateUrl: './diary.component.html',
  styleUrls: ['./diary.component.scss']
})
export class DiaryComponent {
  @ViewChild('appFecha', { static: false })
  appFecha!: FechaComponentComponent;

  selectedDate: any;
  calories: number = 2500;
  day: any;
  fecha: Date = new Date();
  user: any;
  foodInstance: FoodInstance | any;
  fechaFormateda: any;

  constructor(
    private alimentoService: FoodService, 
    public dialog: MatDialog,
    private dayService: DiaryService,
    private fitcalAuthService: AuthService,
    ) 
    {
      this.user = fitcalAuthService.getUser();
  }

  ngOnInit() {
    this.comprobarDay();
  }

  // FECHA
  onDiaIncrementado(fecha: Date) {
    this.selectedDate = this.transformarDia(fecha);
    console.log('Selected date:', this.selectedDate);
    console.log('Dia incrementado:', fecha);
  }

  onDiaDecrementado(fecha: Date) {
    this.selectedDate = this.transformarDia(fecha);
    console.log('Selected date:', this.selectedDate);
    console.log('Dia decrementado:', fecha);
  }

  transformarDia(fecha: Date): string {
    const date = new Date(fecha);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    this.selectedDate = `${year}-${month}-${day}`;
    return this.selectedDate;
  }

  comprobarDay(){  
    const date = new Date(this.fecha);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    this.fechaFormateda = `${year}-${month}-${day}`;

    console.log("Fecha: " + this.fechaFormateda)
    console.log("User: " + this.user.id)

    // 
    this.dayService.searchByDateAndUser(this.fechaFormateda, this.user.id).subscribe((dayParam) => {
      if (Array.isArray(dayParam) && dayParam.length === 0) {
        console.log('dayParam es un array vacío');
        // FUNCIONA CREAR CORRECTAMENTE
        let dayCrear: Day = {
          date: this.fecha,
          user: this.user
        }   

        console.log("Day: " + dayCrear)
        //Creamos el dia
        this.dayService.createDay(dayCrear)
        .subscribe(data => {
          alert("Se Agrego con Exito el dia...!!");
        }) 
      } else {
        console.log('dayParam no es un array vacío');
      }
    }, (error) => {
      console.error('Error al verificar la existencia del dia en diario:', error);
      // Manejar el error si ocurre alguna falla en la verificación
    });

    

      // let dayCrear: Day = {
      //     user_id: this.user.id,
      //     date: this.selectedDate,
      //     foodInstances: []
      // }   

      // console.log(dayCrear)
      // //Creamos el dia
      // this.dayService.createDay(dayCrear)
      // .subscribe(data => {
      //   alert("Se Agrego con Exito el dia...!!");
      // })  

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
