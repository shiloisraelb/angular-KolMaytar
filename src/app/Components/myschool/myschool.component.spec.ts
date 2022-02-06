import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyschoolComponent } from './myschool.component';

describe('MyschoolComponent', () => {
  let component: MyschoolComponent;
  let fixture: ComponentFixture<MyschoolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyschoolComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyschoolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
