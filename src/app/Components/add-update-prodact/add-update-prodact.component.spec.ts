import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUpdateProdactComponent } from './add-update-prodact.component';

describe('AddUpdateProdactComponent', () => {
  let component: AddUpdateProdactComponent;
  let fixture: ComponentFixture<AddUpdateProdactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddUpdateProdactComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUpdateProdactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
