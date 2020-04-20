import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeFinanceComponent } from './home-finance/home-finance.component';
import { FinanceConfigComponent } from './finance-config/finance-config.component';
import { BankFilesComponent } from './bank-files/bank-files.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: HomeFinanceComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'configuration',
        component: FinanceConfigComponent
      },
      {
        path: 'bankfiles',
        component: BankFilesComponent
      }
    ]
  }
]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [ 
    RouterModule
  ]
})
export class HomeFinanceRoutingModule { }
