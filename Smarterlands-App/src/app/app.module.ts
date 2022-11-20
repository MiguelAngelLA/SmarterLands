import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { PrimengModule } from './primeng/primeng.module';

import { AppComponent } from './app.component';
import { GraficasComponent } from './components/graficas/graficas.component';
import { CagadaComponent } from './components/cagada/cagada.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    GraficasComponent,
    GraficasComponent,
    CagadaComponent
  ],
  imports: [
    BrowserModule,
    PrimengModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [
    GraficasComponent,
    CagadaComponent
  ]
})
export class AppModule { }
