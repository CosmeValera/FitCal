import { Component, Input } from '@angular/core';
import { DisableRecalculator } from '@shared/services/disableRecalculator.service';

@Component({
  selector: 'app-goal-dialog',
  templateUrl: './goal-dialog.component.html',
  styleUrls: ['./goal-dialog.component.scss'],
})
export class GoalDialogComponent {
  @Input() selectTipo: string = '';

  @Input() selectedOption: string = '';


  constructor(
    public disableRecalculator: DisableRecalculator,
  ) {}

  metasSemanal: any[] = [
    { value: 'GAIN1000', label: 'Ganar 1kg a la semana' },
    { value: 'GAIN750', label: 'Ganar 0.75kg a la semana' },
    { value: 'GAIN500', label: 'Ganar 0.5kg a la semana' },
    { value: 'GAIN250', label: 'Ganar 0.25kg a la semana' },
    { value: 'MAINTENANCE', label: 'Mantenimiento' },
    { value: 'LOSE250', label: 'Perder 0.25kg a la semana' },
    { value: 'LOSE500', label: 'Perder 0.5kg a la semana' },
    { value: 'LOSE750', label: 'Perder 0.75kg a la semana' },
    { value: 'LOSE1000', label: 'Perder 1kg a la semana' },
  ];

  nivelActivo: any[] = [
    { value: 'ANY', label: 'Poco Activo' },
    { value: 'LOW', label: 'Algo Activo' },
    { value: 'MEDIUM', label: 'Activo' },
    { value: 'HIGH', label: 'Muy Activo' },
  ];
}
