import { TestBed } from '@angular/core/testing';

import { ProductApiServiceService } from './product-api-service.service';

describe('ProductApiServiceService', () => {
  let service: ProductApiServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductApiServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
