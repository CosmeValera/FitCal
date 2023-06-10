import { Component, ViewChild, OnInit } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatDialog } from '@angular/material/dialog';
import { CaloriesDialogComponent } from '@shared/components/calories-dialog/calories-dialog.component';
import { FechaComponentComponent } from '@shared/components/fecha-component/fecha-component.component';
import { Day } from '@shared/interfaces/dayInterface';
import { FoodInstance } from '@shared/interfaces/foodInstanceInterface';
import { Food } from '@shared/interfaces/foodInterface';
import { AuthService } from '@shared/services/auth.service';
import { DateService } from '@shared/services/date.service';
import { DiaryService } from '@shared/services/diary.service';
import { FoodService } from '@shared/services/food.service';


@Component({
  selector: 'app-diary',
  templateUrl: './diary.component.html',
  styleUrls: ['./diary.component.scss']
})
export class DiaryComponent implements OnInit {
  @ViewChild('appFecha', { static: false }) appFecha!: FechaComponentComponent;

  calories: number = 2500;
  day: any;
  user: any;
  foodInstances: FoodInstance[] = [];

  constructor(
    private alimentoService: FoodService,
    public dialog: MatDialog,
    private diaryService: DiaryService,
    private fitcalAuthService: AuthService,
    private dateService: DateService
    )
    {
      this.user = fitcalAuthService.getUser();
  }

  ngOnInit() {
    this.traerAlimentos();
  }

  traerAlimentos() {
    const fecha = this.dateService.getFecha();
    const fechaFormateada = this.transformarDia(fecha);

    // 1. Sacamos dia
    this.diaryService.searchByDateAndUser(fechaFormateada, this.user.id)
      .subscribe((daysParam: Day[]) => {
        const day = daysParam[0];
        if (Array.isArray(daysParam) && daysParam.length === 0) {
          console.log(`No hay un registro para ${fechaFormateada} y el usuario ${this.user.id}.`);
          this.foodInstances = [];
        } else {
          console.log(`Ya hay un registro para ${fechaFormateada} y el usuario ${this.user.id}.`);
          console.log(day);

          // 2. Sacamos FoodInstances
          this.diaryService.getFoodInstancesByDay(day.id!).subscribe((foodInstances: FoodInstance[])=> {
            this.foodInstances = foodInstances;
          });
        }
    });
  }

  // FECHA
  onDiaIncrementado(fecha: Date) {
    this.traerAlimentos();
  }

  onDiaDecrementado(fecha: Date) {
    this.traerAlimentos();
  }

  transformarDia(fecha: Date): string {
    const date = new Date(fecha);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    const selectedDate = `${year}-${month}-${day}`;
    return selectedDate;
  }

  getMealFoods(mealType: string): FoodInstance[] {
    return this.foodInstances.filter(foodInstance => foodInstance.mealType === mealType);
  }


  openCaloriesDialog(): void {
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
