import { TestBed } from '@angular/core/testing';

import { FamBookService } from './fam-book.service';

describe('FamBookService', () => {
  let service: FamBookService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FamBookService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
