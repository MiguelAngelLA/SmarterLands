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
import { AddCropTableComponent } from './components/sidebar/add-crop-table/add-crop-table.component';
import { AddCropDialogComponent } from './components/sidebar/add-crop-table/add-crop-dialog/add-crop-dialog.component';
import { EditBinDialogComponent } from './components/notifications/edit-bin-dialog/edit-bin-dialog.component';
import { ColorPipe } from './pipes/color.pipe';
import { OutlinePipe } from './pipes/outline.pipe';
import { IconPipe } from './pipes/icon.pipe';
import { DeleteBinDialogComponent } from './components/notifications/delete-bin-dialog/delete-bin-dialog.component';
import { LogsDialogComponent } from './components/notifications/logs-dialog/logs-dialog/logs-dialog.component';
import { MessagePipe } from './pipes/message.pipe';


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
    BinDimensionsComponent,
    AddCropTableComponent,
    AddCropDialogComponent,
    ColorPipe,
    OutlinePipe,
    EditBinDialogComponent,
    IconPipe,
    DeleteBinDialogComponent,
    LogsDialogComponent,
    MessagePipe
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
    TablaComponent,
    AddCropTableComponent
  ]
})
export class AppModule { }
