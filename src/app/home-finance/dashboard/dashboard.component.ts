import { Component, OnInit, ViewChild } from '@angular/core';

import { TransactionService } from '../services/transaction.service';
import { Transaction } from '../model/transaction';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Category } from '../model/category';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  displayedColumns: string[] = ['transactionDate', 'storeOriginalName', 'category','value'];
  listTransactions: Transaction[] = [];
  listCategory: Category[] = [];
  subTotalDisplayed: number = 0;
  month: Date = new Date();

  dataSource = new MatTableDataSource(this.listTransactions);


  

  constructor(
    private transactionService: TransactionService,
    private categoryService: CategoryService,

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

    // get all categories
    this.categoryService.getCategories()
    .subscribe(categories => {
      this.listCategory = categories
    });


  } // end ngOnInit


  load(){
    console.log(this.dataSource);
  }

  
  change(event, transaction: Transaction) {
    const catID = this.listCategory.find(cat => cat.categoryName === event.source.value).id;
    transaction.categoryID = catID;
    transaction.categoryName = event.source.value;
    console.log(transaction);
    
  }

}

