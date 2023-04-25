import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MiComponenteComponent } from './shared/components/mi-componente/mi-componente.component';
import { SidenavComponent } from '@shared/components/sidenav/sidenav.component';


@NgModule({
  declarations: [
    AppComponent,
    MiComponenteComponent,
    SidenavComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
