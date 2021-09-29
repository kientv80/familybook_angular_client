import { TestBed } from '@angular/core/testing';

import { BroadcastMsgService } from './broadcast-msg.service';

describe('BroadcastMsgService', () => {
  let service: BroadcastMsgService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BroadcastMsgService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
