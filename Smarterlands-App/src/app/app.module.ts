import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { PrimengModule } from './primeng/primeng.module';

import { AppComponent } from './app.component';
import { GraficasComponent } from './components/graficas/graficas.component';

@NgModule({
  declarations: [
    AppComponent,
    GraficasComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [
    GraficasComponent
  ]
})
export class AppModule { }
