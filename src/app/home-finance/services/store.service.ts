import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Store } from '../model/store';

const API = environment.API;


@Injectable()
export class StoreService {

  constructor(
    private http: HttpClient
  ) { }

  getAll() {
    return this.http.get<Store[]>(API + '/store/getall');
  }

  updateAll(listStore: Store[]) {
    return this.http.put<any>(API + '/store/updateall', listStore);

  }

  update(newItem: Store) {
    return this.http.put<any>(API + '/store/update', newItem);
  }

}
