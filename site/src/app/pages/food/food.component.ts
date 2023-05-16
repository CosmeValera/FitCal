import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Dialog } from '@angular/cdk/dialog';
import { DialogCreateFoodComponent } from '@shared/components/dialog-create-food/dialog-create-food.component';
import { NONE_TYPE } from '@angular/compiler';

@Component({
  selector: 'app-food',
  templateUrl: './food.component.html',
  styleUrls: ['./food.component.scss']
})
export class FoodComponent {
  constructor(private matDialog:MatDialog) { }

  ngOnInit(): void {
  }

  openCreateFood(){
    this.matDialog.open(DialogCreateFoodComponent,{
      width: '700px',
      height: '600px',
    })
  }
}
