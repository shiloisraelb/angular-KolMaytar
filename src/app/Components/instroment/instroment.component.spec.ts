import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstromentComponent } from './instroment.component';

describe('InstromentComponent', () => {
  let component: InstromentComponent;
  let fixture: ComponentFixture<InstromentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InstromentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InstromentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
