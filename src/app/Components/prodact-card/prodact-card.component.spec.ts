import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdactCardComponent } from './prodact-card.component';

describe('ProdactCardComponent', () => {
  let component: ProdactCardComponent;
  let fixture: ComponentFixture<ProdactCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProdactCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProdactCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
