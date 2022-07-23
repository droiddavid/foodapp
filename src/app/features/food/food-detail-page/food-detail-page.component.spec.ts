import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodDetailPageComponent } from './food-detail-page.component';

describe('FoodDetailPageComponent', () => {
  let component: FoodDetailPageComponent;
  let fixture: ComponentFixture<FoodDetailPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FoodDetailPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FoodDetailPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
