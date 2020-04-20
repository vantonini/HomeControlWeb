import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FinanceConfigComponent } from './finance-config/finance-config.component';
import { HttpClientModule } from '@angular/common/http';
import { BankFilesComponent } from './bank-files/bank-files.component';
import { HomeFinanceComponent } from './home-finance/home-finance.component';
import { HomeFinanceRoutingModule } from './home-finance-routing.module';
import { CategoryService } from './services/category.service';
import { TransactionService } from './services/transaction.service';
import { RouterModule } from '@angular/router';
import { MaterialModule } from './material.module';
import { DashboardComponent } from './dashboard/dashboard.component';



@NgModule({
  declarations: [ 
    BankFilesComponent,
    FinanceConfigComponent,
    HomeFinanceComponent,
    DashboardComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    MaterialModule,
    HomeFinanceRoutingModule
  ],
  // exports: [
  //   BankFilesComponent,
  //   FinanceConfigComponent
  // ],
  providers: [
    CategoryService,
    TransactionService
  ]

})
export class HomeFinanceModule { }
