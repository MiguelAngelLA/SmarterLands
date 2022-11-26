import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MaterialModule } from './material/material.module';



import { AppComponent } from './app.component';
import { GraficasComponent } from './components/graficas/graficas.component';
import { NotificationComponent } from './components/notifications/notification.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { TablaComponent } from './components/tabla/tabla.component';
import { DialogComponent } from './components/tabla/dialog/dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SidebarDialogComponent } from './components/sidebar/sidebar-dialog/sidebar-dialog.component';
import { BinDimensionsComponent } from './components/notifications/bin-dimensions/bin-dimensions.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    GraficasComponent,
    GraficasComponent,
    NotificationComponent,
    SidebarComponent,
    TablaComponent,
    DialogComponent,
    SidebarDialogComponent,
    BinDimensionsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [
    GraficasComponent,
    NotificationComponent,
    TablaComponent
  ]
})
export class AppModule { }
