import { TestBed } from '@angular/core/testing';

import { ServiceFoodService } from './service-food.service';

describe('ServiceFoodService', () => {
  let service: ServiceFoodService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceFoodService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
