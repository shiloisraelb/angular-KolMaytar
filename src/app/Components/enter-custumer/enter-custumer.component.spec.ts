import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnterCustumerComponent } from './enter-custumer.component';

describe('EnterCustumerComponent', () => {
  let component: EnterCustumerComponent;
  let fixture: ComponentFixture<EnterCustumerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnterCustumerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnterCustumerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
