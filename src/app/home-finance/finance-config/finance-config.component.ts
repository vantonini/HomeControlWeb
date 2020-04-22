import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { MatSnackBar } from '@angular/material/snack-bar';

import { CategoryService } from '../services/category.service';
import { StoreService } from '../services/store.service';
import { Category } from '../model/category';
import { Store } from '../model/store';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-finance-config',
  templateUrl: './finance-config.component.html',
  styleUrls: ['./finance-config.component.scss']
})
export class FinanceConfigComponent implements OnInit {

  displayedColumns: string[] = ['storeOriginalName', 'storeModifiedName', 'categoryName'];
  
  
  
  listCategory: Category[] = [];
  listStore: Store[] = [];
  catName: string;
  
  
  catFormGroup: FormGroup;
  storeFormGroup: FormGroup;
  
  dataSource = new MatTableDataSource(this.listStore);
  
  constructor(
    private categoryService: CategoryService,
    private storeService: StoreService,
    private _formBuilder: FormBuilder,
    private _snackBar: MatSnackBar

  ) { }

  ngOnInit() {

    this.categoryService.getCategories().subscribe(list => {
      this.listCategory = list;
    
    });

    this.storeService.getAll().subscribe(list => {
      this.listStore = list;
      this.dataSource = new MatTableDataSource<Store>(this.listStore);
      console.log(this.listStore);

    
    });

    this.catFormGroup = this._formBuilder.group({
      catName: ['', Validators.required]
    });

    this.storeFormGroup = this._formBuilder.group({
      modifiedName: [''],
      categoryName: ['']
    });

  } // end ngOnInit


  addCat() {
    const newCat: Category = {
      id: 0,
      categoryName: String(this.catFormGroup.get('catName').value).toUpperCase()
    }
    console.log(newCat);
    this.categoryService.saveCategory(newCat).subscribe(res =>
      {
        this._snackBar.open(res.msg, 'Added', {duration: 2000});
        this.listCategory.push(newCat);

      });
    
  } // end AddCat


    
  change(event, store: Store) {
    const catID = this.listCategory.find(cat => cat.categoryName === event.source.value).id;
    store.categoryID = catID;
    // console.log(store);
    
  } // end Change

  saveModifiedName(event, store) {
    store.storeModifiedName = String(this.storeFormGroup.get('modifiedName').value).toUpperCase();
  }


  saveStores(){
  
    this.storeService.updateAll(this.listStore).subscribe( res => 
      this._snackBar.open(res.msg, 'Added', {duration: 2000})
    );
  } // end SaveStores


  // getCatName
  getCatName(catId: number) {
    if (catId)
      return this.listCategory.find(el => el.id === catId).categoryName;
  }



}
