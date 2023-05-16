import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './pages/profile/profile.component';
import { NutritionComponent } from './pages/nutrition/nutrition.component';
import { DiaryComponent } from './pages/diary/diary.component';
import { FoodComponent } from './pages/food/food.component';

const routes: Routes = [
  {path: '', redirectTo: 'profile', pathMatch: 'full'},
  {path: 'profile', component: ProfileComponent},
  {path: 'diary', component: DiaryComponent},
  {path: 'nutrition', component: NutritionComponent},
  {path: 'more', component: FoodComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
