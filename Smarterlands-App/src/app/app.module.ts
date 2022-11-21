import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MaterialModule } from './material/material.module';


import { AppComponent } from './app.component';
import { GraficasComponent } from './components/graficas/graficas.component';
import { CagadaComponent } from './components/cagada/cagada.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { TablaComponent } from './components/tabla/tabla.component';
import { DialogComponent } from './components/tabla/dialog/dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    GraficasComponent,
    GraficasComponent,
    CagadaComponent,
    SidebarComponent,
    TablaComponent,
    DialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [
    GraficasComponent,
    CagadaComponent,
    TablaComponent
  ]
})
export class AppModule { }
