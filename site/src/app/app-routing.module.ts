import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './pages/profile/profile.component';
import { NutritionComponent } from './pages/nutrition/nutrition.component';
import { DiaryComponent } from './pages/diary/diary.component';
import { FoodComponent } from './pages/food/food.component';
import { LoginGuardService } from '@shared/services/loginGuard.service';

const routes: Routes = [
  {path: '', redirectTo: 'perfil', pathMatch: 'full'},
  {path: 'perfil', component: ProfileComponent},
  {path: 'diario', component: DiaryComponent, canActivate: [LoginGuardService]},
  {path: 'nutricion', component: NutritionComponent, canActivate: [LoginGuardService]},
  {path: 'alimentos', component: FoodComponent, canActivate: [LoginGuardService]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
