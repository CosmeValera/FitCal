import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-goal-dialog',
  templateUrl: './goal-dialog.component.html',
  styleUrls: ['./goal-dialog.component.scss']
})
export class GoalDialogComponent {
  @Input() selectTipo: string = '';
  
  selectedOption: string = '';

  metasSemanal: any[] = [
    { value: 'ganar1000', label: 'Ganar 1kg a la semana' },
    { value: 'ganar750', label: 'Ganar 0.75kg a la semana' },
    { value: 'ganar500', label: 'Ganar 0.5kg a la semana' },
    { value: 'ganar250', label: 'Ganar 0.25kg a la semana' },
    { value: 'mantener', label: 'Mantenimiento' },
    { value: 'perder250', label: 'Perder 0.25kg a la semana' },
    { value: 'perder500', label: 'Perder 0.5kg a la semana' },
    { value: 'perder750', label: 'Perder 0.75kg a la semana' },
    { value: 'perder1000', label: 'Perder 1kg a la semana' }
  ];
  
  nivelActivo: any[] = [
    { value: 'pocoActivo', label: 'Poco Activo' },
    { value: 'algoActivo', label: 'Algo Activo' },
    { value: 'activo', label: 'Activo' },
    { value: 'muyActivo', label: 'Muy Activo' }
  ];
}
