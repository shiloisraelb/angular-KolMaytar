import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustumerCardComponent } from './custumer-card.component';

describe('CustumerCardComponent', () => {
  let component: CustumerCardComponent;
  let fixture: ComponentFixture<CustumerCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustumerCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustumerCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
