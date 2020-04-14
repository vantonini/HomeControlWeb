import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BankFilesComponent } from './home-finance/bank-files/bank-files.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModuleModule } from './home-finance/material-module.module';



@NgModule({
  declarations: [
    AppComponent,
    BankFilesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModuleModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
