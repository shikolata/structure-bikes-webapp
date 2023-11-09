import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewBikeComponent } from './view-bike.component';

describe('ViewBikeComponent', () => {
  let component: ViewBikeComponent;
  let fixture: ComponentFixture<ViewBikeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewBikeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewBikeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
