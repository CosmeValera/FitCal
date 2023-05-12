import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidenavComponent } from '@shared/components/sidenav/sidenav.component';
import { BodyComponent } from './core/body/body.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { NutritionComponent } from './pages/nutrition/nutrition.component';
import { DiaryComponent } from './pages/diary/diary.component';
import { MealComponent } from './shared/components/meal/meal.component';
import { PersonalImageComponent } from '@shared/components/personal-image/personal-image.component';
import { PersonalInformationComponent } from '@shared/components/personal-information/personal-information.component';
import { GoalDialogComponent } from '@shared/components/goal-dialog/goal-dialog.component';
import { MatButtonModule }from '@angular/material/button';
import { MatIconModule }from '@angular/material/icon';
import { MatFormFieldModule }from '@angular/material/form-field';
import { MatInputModule }from '@angular/material/input';
import { FormsModule }from '@angular/forms';
import { MatDialogModule }from '@angular/material/dialog';
import { CaloriesDialogComponent } from './shared/components/calories-dialog/calories-dialog.component';


@NgModule({
  declarations: [
    AppComponent,
    SidenavComponent,
    BodyComponent,
    ProfileComponent,
    NutritionComponent,
    DiaryComponent,
    MealComponent,
    PersonalImageComponent,
    PersonalInformationComponent,
    GoalDialogComponent,
    CaloriesDialogComponent   
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatDialogModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
