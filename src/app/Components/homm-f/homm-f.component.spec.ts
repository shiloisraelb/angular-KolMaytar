import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HommFComponent } from './homm-f.component';

describe('HommFComponent', () => {
  let component: HommFComponent;
  let fixture: ComponentFixture<HommFComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HommFComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HommFComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
