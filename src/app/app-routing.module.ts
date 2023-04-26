import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './pages/profile/profile.component';
import { NutritionComponent } from './pages/nutrition/nutrition.component';
import { DiaryComponent } from './pages/diary/diary.component';


const routes: Routes = [
  {path: '', redirectTo: 'profile', pathMatch: 'full'},
  {path: 'profile', component: ProfileComponent},
  {path: 'diary', component: DiaryComponent},
  {path: 'nutrition', component: NutritionComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
