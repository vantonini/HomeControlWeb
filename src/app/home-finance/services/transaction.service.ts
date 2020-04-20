import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';
import { Transaction } from '../model/transaction';

const API = environment.API;


@Injectable()
export class TransactionService {

  constructor(
    private http: HttpClient
  ) { 
    this.http = http;
  }

  getRecords() {
    return this.http.get<Transaction[]>(API + '/transaction/getall');
  }

  saveRecords(listRecords: Transaction[]) {
    console.log(API + '/transaction/upload');
    return this.http.post<any>(API + '/transaction/upload/',  listRecords);
  }

}
