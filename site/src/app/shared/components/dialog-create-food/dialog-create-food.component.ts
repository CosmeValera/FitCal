import { Component } from '@angular/core';
import { FoodService } from '@shared/services/food.service';
import { Router } from '@angular/router';
import { food } from '@shared/interfaces/foodInterface';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-create-food',
  templateUrl: './dialog-create-food.component.html',
  styleUrls: ['./dialog-create-food.component.scss']
})
export class DialogCreateFoodComponent {
  constructor(public dialogRef: MatDialogRef<DialogCreateFoodComponent>, private service:FoodService, private router:Router){}

  crearAlimento(food:food){
    this.service.postFood(food)
    .subscribe(data=>{
      alert("Se Agrego con Exito...!!");
      this.dialogRef.close();
    })
  }
}
