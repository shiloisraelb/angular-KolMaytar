import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyShowComponent } from './my-show.component';

describe('MyShowComponent', () => {
  let component: MyShowComponent;
  let fixture: ComponentFixture<MyShowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyShowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
