import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { StyleClassModule } from 'primeng/styleclass';



@NgModule({
  declarations: [],
  exports: [
    SidebarModule,
    ButtonModule,
    StyleClassModule
  ]
})
export class PrimengModule { }
