import { TestBed } from '@angular/core/testing';

import { DestinationTableService } from './destination-table-service';

describe('DestinationTableService', () => {
  let service: DestinationTableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DestinationTableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
