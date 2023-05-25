import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { SocialLoginModule, SocialAuthServiceConfig } from '@abacritt/angularx-social-login';
import {
  GoogleLoginProvider
} from '@abacritt/angularx-social-login';


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
import { FoodComponent } from './pages/food/food.component';
import { DialogCreateFoodComponent } from './shared/components/dialog-create-food/dialog-create-food.component';
import { ListFoodComponent } from './shared/components/list-food/list-food.component';
import { MatCardModule } from '@angular/material/card';
import { FiltroPipe } from './shared/pipes/filtro.pipe';
import { FoodService } from './shared/services/food.service';
import { HttpClientModule } from '@angular/common/http';
import { LoginGuardService } from '@shared/services/loginGuard.service';
import { AuthService } from '@shared/services/auth.service';

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
    CaloriesDialogComponent,
    FoodComponent,
    DialogCreateFoodComponent,
    ListFoodComponent,
    FiltroPipe,
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
    MatDialogModule,
    MatCardModule,
    HttpClientModule,
    SocialLoginModule
  ],
  providers: [
    LoginGuardService,
    AuthService,
    FoodService,
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '1075462838223-6r7k8rfofknaqert59tft0n2doirm1m1.apps.googleusercontent.com'
            )
          }
        ],
        onError: (err) => {
          console.error(err);
        }
      } as SocialAuthServiceConfig,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
