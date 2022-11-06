import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { WebsiteStateService } from './website-state.service';

describe('WebsiteStateService', () => {
  let service: WebsiteStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ]
    });
    service = TestBed.inject(WebsiteStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
