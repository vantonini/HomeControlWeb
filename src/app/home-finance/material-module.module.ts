import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import {MatTableModule} from '@angular/material/table'; 
import {MatCheckboxModule} from '@angular/material/checkbox';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatTableModule,
    MatCheckboxModule

  ],
  exports: [
    MatTableModule,
    MatCheckboxModule
  ]
})
export class MaterialModuleModule { }
