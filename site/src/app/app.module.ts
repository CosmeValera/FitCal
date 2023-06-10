import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  SocialLoginModule,
  SocialAuthServiceConfig,
} from '@abacritt/angularx-social-login';
import { GoogleLoginProvider } from '@abacritt/angularx-social-login';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidenavComponent } from '@shared/components/sidenav/sidenav.component';
import { BodyComponent } from './core/body/body.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { NutritionComponent } from './pages/nutrition/nutrition.component';
import { DiaryComponent } from './pages/diary/diary.component';
import { MealComponent } from './shared/components/meal/meal.component';
import { FoodImageComponent } from '@shared/components/food-image/food-image.component';
import { PersonalInformationComponent } from '@shared/components/personal-information/personal-information.component';
import { GoalDialogComponent } from '@shared/components/goal-dialog/goal-dialog.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { CaloriesDialogComponent } from './shared/components/calories-dialog/calories-dialog.component';
import { FoodComponent } from './pages/food/food.component';
import { DialogCreateFoodComponent } from './shared/components/dialog-create-food/dialog-create-food.component';
import { DialogUpdateFoodComponent } from './shared/components/dialog-update-food/dialog-update-food.component';
import { MatCardModule } from '@angular/material/card';
import { FiltroPipe } from './shared/pipes/filtro.pipe';
import { FoodService } from './shared/services/food.service';
import { HttpClientModule } from '@angular/common/http';
import { LoginGuardService } from '@shared/services/loginGuard.service';
import { AuthService } from '@shared/services/auth.service';
import { CaloriesProfileComponent } from './shared/components/calories-profile/calories-profile.component';
import { FechaComponentComponent } from '@shared/components/fecha-component/fecha-component.component';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import { InjectionToken } from '@angular/core';
import { ChartModule } from 'angular-highcharts';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ConfirmationDialogComponent } from './shared/components/confirmation-dialog/confirmation-dialog.component';
import { GramosDialogComponent } from '@shared/components/gramos-dialog/gramos-dialog.component';
import { DateService } from '@shared/services/date.service';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideStorage, getStorage } from '@angular/fire/storage';

registerLocaleData(localeEs);
export const MAT_MDC_DIALOG_DATA = new InjectionToken<any>('MatMdcDialogData');

@NgModule({
  declarations: [
    AppComponent,
    SidenavComponent,
    BodyComponent,
    ProfileComponent,
    NutritionComponent,
    DiaryComponent,
    MealComponent,
    FoodImageComponent,
    PersonalInformationComponent,
    GoalDialogComponent,
    CaloriesDialogComponent,
    FoodComponent,
    DialogCreateFoodComponent,
    DialogUpdateFoodComponent,
    FiltroPipe,
    CaloriesProfileComponent,
    FechaComponentComponent,
    ConfirmationDialogComponent,
    GramosDialogComponent,
  ],
  imports: [
    MatSnackBarModule,
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
    SocialLoginModule,
    ChartModule,
    MatDatepickerModule,
    MatNativeDateModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideStorage(() => getStorage()),
  ],
  providers: [
    LoginGuardService,
    AuthService,
    FoodService,
    DateService,
    { provide: MAT_MDC_DIALOG_DATA, useValue: {} },
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '1075462838223-6r7k8rfofknaqert59tft0n2doirm1m1.apps.googleusercontent.com'
              // '426540645158-nrmlsa10pio3pnhnt91tpjhf8jo7p25v.apps.googleusercontent.com' Client id angel
            ),
          },
        ],
        onError: (err) => {
          console.error(err);
        },
      } as SocialAuthServiceConfig,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
