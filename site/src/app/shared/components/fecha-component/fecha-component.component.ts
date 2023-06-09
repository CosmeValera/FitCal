import { Component, EventEmitter, LOCALE_ID, Output } from '@angular/core';
import { Day } from '@shared/interfaces/dayInterface';
import { AuthService } from '@shared/services/auth.service';
import { DiaryService } from '@shared/services/diary.service';

@Component({
  selector: 'app-fecha',
  templateUrl: './fecha-component.component.html',
  styleUrls: ['./fecha-component.component.scss'],
  providers: [{ provide: LOCALE_ID, useValue: 'es' }]
})
export class FechaComponentComponent {
  @Output() diaIncrementado: EventEmitter<Date> = new EventEmitter<Date>();
  @Output() diaDecrementado: EventEmitter<Date> = new EventEmitter<Date>();

  fecha: Date = new Date();
  user: any;

  constructor(private dayService: DiaryService,
    private fitcalAuthService: AuthService,){
      this.user = fitcalAuthService.getUser();

  }
  ngOnInit() {
  }
  
  incrementarDia() {
    this.fecha = new Date(this.fecha.getTime() + 24 * 60 * 60 * 1000);
    this.diaIncrementado.emit(this.fecha); // Emit the event with the updated date
  }

  decrementarDia() {
    this.fecha = new Date(this.fecha.getTime() - 24 * 60 * 60 * 1000);
    this.diaDecrementado.emit(this.fecha); // Emit the event with the updated date
  }
}
