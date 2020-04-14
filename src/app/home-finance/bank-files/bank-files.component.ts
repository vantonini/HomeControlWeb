import { Component, OnInit } from '@angular/core';

import {SelectionModel} from '@angular/cdk/collections';
import {MatTableDataSource} from '@angular/material/table';


export interface FinancialRecord {
  position: number;
  date: Date;
  value: number;
  recordType: string;
  establishment: string;
}

// const ELEMENT_DATA: FinancialRecord[] = [
//   {position: 1, date: new Date('2020-04-04'), value: 1.0079, recordType: 'H', establishment: 'H'},
//   {position: 2, date: new Date('2020-02-20'), value: 20.1797, recordType: 'He', establishment: 'Ne'},
// ];

@Component({
  selector: 'app-bank-files',
  templateUrl: './bank-files.component.html',
  styleUrls: ['./bank-files.component.scss']
})
export class BankFilesComponent implements OnInit {
  displayedColumns: string[] = ['Position', 'Date', 'Description', 'Value'];
  listFinancialRecords : FinancialRecord[] = [];
  selection = new SelectionModel<FinancialRecord>(true, []);
  dataSource = new MatTableDataSource<FinancialRecord>(this.listFinancialRecords);

  dataRemovedSource = new MatTableDataSource<FinancialRecord>([]);

  totalValueRemoved = 0;

  constructor() { }

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
  checkboxLabel(row?: FinancialRecord): string {
    // console.log(row);
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }

  onFileChange(event) {
    let reader = new FileReader();
    this.dataSource = new MatTableDataSource<FinancialRecord>([]);
    const [file] = event.target.files;
    // console.log(file);
    reader.readAsBinaryString(file);
    reader.onload = (e) => {    
      let lines = (<string>reader.result).split('\n');
      let index = 0;
      console.log(lines);

      lines.forEach(element => {
        let line = element.split(',');
        console.log(line);
        if (line.length > 1 && line.length == 5) {
          // bank statement 
          let financialRecord: FinancialRecord = {
            position: index,
            date: new Date(line[0]),
            value: Number.parseFloat(line[1]),
            recordType: line[3].replace(/"/g, '').trim().toUpperCase(),
            establishment: line[4].replace(/"/g, '').trim() 
            ? line[4].replace(/"/g, '').trim().toUpperCase() 
            : line[3].replace(/"/g, '').trim().toUpperCase()
          } 
          this.listFinancialRecords.push(financialRecord);
          ++index;
        } else if (line.length > 1 && line.length == 3) {
          // credit card files
          let financialRecord: FinancialRecord = {
            position: index,
            date: new Date(line[0]),
            value: Number.parseFloat(line[2]),
            recordType: line[1].replace(/"/g, '').trim().toUpperCase(),
            establishment: line[1].replace(/"/g, '').trim().toUpperCase()
          } 
          this.listFinancialRecords.push(financialRecord);
          ++index;
        }

      });
      // console.log(this.listFinancialRecords);
      // console.log(lines.length);
      this.dataSource = new MatTableDataSource<FinancialRecord>(this.listFinancialRecords);
      
    }
    
  } // end onFileChange

  removeRecord(event) {
    
    this.dataRemovedSource.data.push(event);
    this.totalValueRemoved += event.value;

    this.dataSource.data.splice(this.dataSource.data.findIndex(e => e == event), 1);
    this.dataSource = new MatTableDataSource<FinancialRecord>(this.dataSource.data);
    this.dataRemovedSource = new MatTableDataSource<FinancialRecord>(this.dataRemovedSource.data);
    
  }
  restoreRecord(event) {
    
    this.dataSource.data.push(event);
    // sort source array
    this.dataSource.data = this.dataSource.data.sort((e1, e2) => e1.position - e2.position);
    
    this.totalValueRemoved -= event.value;

    this.dataRemovedSource.data.splice(this.dataRemovedSource.data.findIndex(e => e == event), 1);
    this.dataSource = new MatTableDataSource<FinancialRecord>(this.dataSource.data);
    this.dataRemovedSource = new MatTableDataSource<FinancialRecord>(this.dataRemovedSource.data);
    // console.log(this.dataSource.data);
  }

}
