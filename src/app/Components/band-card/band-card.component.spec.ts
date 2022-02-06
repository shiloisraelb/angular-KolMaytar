import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BandCardComponent } from './band-card.component';

describe('BandCardComponent', () => {
  let component: BandCardComponent;
  let fixture: ComponentFixture<BandCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BandCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BandCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
