import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Category } from '../model/category';

const API = environment.API;


@Injectable()
export class CategoryService {

  constructor(
    private http: HttpClient
  ) { }

  getCategories() {
    return this.http.get<Category[]>(API + '/category/getall');
  }

  saveCategory(newCategory: Category) {
    return this.http.post<any>(API + '/category/add', newCategory);
  }

}
