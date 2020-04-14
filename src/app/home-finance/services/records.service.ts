import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from '@angular/core';

import { FinancialRecord } from '../bank-files/bank-files.component';
import { environment } from 'src/environments/environment';

const API = environment.API;


@Injectable({
  providedIn: 'root'
})
export class RecordsService {

  constructor(
    private http: HttpClient
  ) { }

  getRecords() {
    return this.http.get<FinancialRecord>(API + '/records/')
  }
}
