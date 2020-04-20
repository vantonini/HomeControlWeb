import { Component, OnInit, ViewChild } from '@angular/core';

import { TransactionService } from '../services/transaction.service';
import { Transaction } from '../model/transaction';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  displayedColumns: string[] = ['transactionDate', 'storeOriginalName', 'category','value'];
  listTransactions : Transaction[] = [
    { 
      transactionDate: new Date(),
      storeOriginalName: 'OriginalName',
      storeModifiedName: 'modifiedName',
      category: null,
      id: 0,
      transactionDes: null,
      transactionType: null,
      value: 0
    }
  ];

  subTotalDisplayed: number = 0;
  month: Date = new Date();

  dataSource = new MatTableDataSource(this.listTransactions);


  

  constructor(
    private transactionService: TransactionService

  ) {   }

  @ViewChild(MatSort, {static: true}) sort: MatSort;

  ngOnInit() {

    // get all transactions from base
    this.transactionService.getRecords()
    .subscribe(transactions => {
      this.dataSource = new MatTableDataSource<Transaction>(transactions);
      this.dataSource.sort = this.sort;
      this.dataSource.data.forEach(e => {
        this.subTotalDisplayed += e.value;
      });
    });
  } // end ngOnInit


  load(){
    console.log(this.dataSource);
  }

}
