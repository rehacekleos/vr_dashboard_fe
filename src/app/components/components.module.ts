import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconifyComponent } from "./iconify/iconify.component";



@NgModule({
  declarations: [IconifyComponent],
  exports: [
    IconifyComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ComponentsModule { }
