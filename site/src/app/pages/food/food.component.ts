import { Component } from '@angular/core';
import { Food } from '@shared/interfaces/foodInterface';
import { FoodService } from '@shared/services/food.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DialogCreateFoodComponent } from '@shared/components/dialog-create-food/dialog-create-food.component';
import { DialogUpdateFoodComponent } from '@shared/components/dialog-update-food/dialog-update-food.component';

@Component({
  selector: 'app-list-food',
  templateUrl: './food.component.html',
  styleUrls: ['./food.component.scss']
})
export class FoodComponent {
  filterFood = '';
  searchText = '';
  mostrarBotonModal = false;

  // foods: Food[] = [];
  foods: Food[] = [
    {
      id: 2,
      brand: "Marca A",
      image: "https://source.unsplash.com/600x900/?food",
      name: "Mandarina",
      kcal: 52,
      proteins: 14,
      fats: 0.2,
      carbs: 0.3
    },
    {
      id: 2,
      brand: "Marca A",
      image: "https://source.unsplash.com/600x900/?food,gym",
      name: "Mandarina",
      kcal: 52,
      proteins: 14,
      fats: 0.2,
      carbs: 0.3
    },
    {
      id: 2,
      brand: "Marca A",
      image: "https://source.unsplash.com/600x900/?food,healthy",
      name: "Mandarina",
      kcal: 52,
      proteins: 14,
      fats: 0.2,
      carbs: 0.3
    },
    {
      id: 2,
      brand: "Marca A",
      image: "https://source.unsplash.com/600x900/?food,wellness",
      name: "Mandarina",
      kcal: 52,
      proteins: 14,
      fats: 0.2,
      carbs: 0.3
    }
  ];

  constructor(
    private foodService: FoodService,
    private router: Router,
    private matDialog: MatDialog
  ) {}

  ngOnInit() {
    this.foodService.getFood()
      .subscribe(data => {
        this.foods = data;
        // console.log(this.foods)
      });
  }

  openCreateFood(){
    this.matDialog.open(DialogCreateFoodComponent,{
      width: '700px',
      height: '600px',
    })
  }

  anadirAlimento(alimento: any) {
    this.foodService.seleccionarAlimento(alimento);
  }
  openUpdateFood(){
    this.matDialog.open(DialogUpdateFoodComponent,{
      width: '700px',
      height: '600px',
    })
  }
}
