import { FoodItemService } from './foodItem.service';
import { TestBed } from '@angular/core/testing';


describe('FoodService', () => {
  let service: FoodItemService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FoodItemService);
    
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
