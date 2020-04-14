import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BankFilesComponent } from './bank-files.component';

describe('BankFilesComponent', () => {
  let component: BankFilesComponent;
  let fixture: ComponentFixture<BankFilesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BankFilesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BankFilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
