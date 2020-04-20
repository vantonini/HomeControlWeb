import { Component, OnInit } from '@angular/core';

import { SelectionModel } from '@angular/cdk/collections';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Transaction } from '../model/transaction';
import { TransactionService } from '../services/transaction.service';

@Component({
  selector: 'app-bank-files',
  templateUrl: './bank-files.component.html',
  styleUrls: ['./bank-files.component.scss']
})
export class BankFilesComponent implements OnInit {
  displayedColumns: string[] = ['Position', 'Date', 'Description', 'Value'];
  listFinancialRecords : Transaction[] = [];
  selection = new SelectionModel<Transaction>(true, []);
  dataSource = new MatTableDataSource<Transaction>(this.listFinancialRecords);

  dataRemovedSource = new MatTableDataSource<Transaction>([]);

  totalValueRemoved = 0;

  csvFile = '';

  index = 0;


  constructor(
    private transactionService: TransactionService,
    private _snackBar: MatSnackBar
    
    ) { }

  ngOnInit() {
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }
  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }
  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: Transaction): string {
    // console.log(row);
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }


  onFileSelected(event) {
    let reader = new FileReader();
    reader.readAsBinaryString(event.target.files[0]);
    reader.onload = (e) => {    
      let lines = (<string>reader.result).split('\n');
      

      lines.forEach(element => {
        let line = element.split(',');
        if (line.length > 1 && line.length == 5) {
          // bank statement 
          let financialRecord: Transaction = {
            id: this.index,
            transactionDate: new Date(line[0]),
            value: Number.parseFloat(line[1]),
            transactionType: null,
            transactionDes: line[3].replace(/"/g, '').trim().toUpperCase(),
            storeOriginalName: line[4].replace(/"/g, '').trim() 
            ? line[4].replace(/"/g, '').trim().toUpperCase() 
            : line[3].replace(/"/g, '').trim().toUpperCase(),
            storeModifiedName: null,
            category: null
          } 
          this.listFinancialRecords.push(financialRecord);
          ++this.index;
        } else if (line.length > 1 && line.length == 3) {
          // credit card files
          let financialRecord: Transaction = {
            id: this.index,
            transactionDate: new Date(line[0]),
            transactionType: null,
            transactionDes: null,
            value: Number.parseFloat(line[2]),
            storeOriginalName: line[1].replace(/"/g, '').trim().toUpperCase(),
            storeModifiedName: null,
            category: null

          } 
          this.listFinancialRecords.push(financialRecord);
          ++this.index;
        }

      });
      this.dataSource = new MatTableDataSource<Transaction>(this.listFinancialRecords);
      
    }
    
  } // end onFileChange

  removeRecord(event) {
    
    this.dataRemovedSource.data.push(event);
    this.totalValueRemoved += event.value;

    this.dataSource.data.splice(this.dataSource.data.findIndex(e => e == event), 1);
    this.dataSource = new MatTableDataSource<Transaction>(this.dataSource.data);
    this.dataRemovedSource = new MatTableDataSource<Transaction>(this.dataRemovedSource.data);
    
  }
  restoreRecord(event) {
    
    this.dataSource.data.push(event);
    // sort source array
    this.dataSource.data = this.dataSource.data.sort((e1, e2) => e1.transactionDate.valueOf() - e2.transactionDate.valueOf());
    
    this.totalValueRemoved -= event.value;

    this.dataRemovedSource.data.splice(this.dataRemovedSource.data.findIndex(e => e == event), 1);
    this.dataSource = new MatTableDataSource<Transaction>(this.dataSource.data);
    this.dataRemovedSource = new MatTableDataSource<Transaction>(this.dataRemovedSource.data);
    // console.log(this.dataSource.data);
  }

  save() {
    this.transactionService.saveRecords(this.dataSource.data).subscribe(
      res  => {
        this._snackBar.open(res.msg, 'Added', {duration: 2000})
      });    

  }

  clear() {
    this.dataSource = new MatTableDataSource<Transaction>([]);
    this.dataRemovedSource = new MatTableDataSource<Transaction>([]);
    
    this.totalValueRemoved = 0;
    this.index = 0;


  }

}
