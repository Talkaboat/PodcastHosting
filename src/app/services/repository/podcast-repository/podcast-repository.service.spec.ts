import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { PodcastRepositoryService } from './podcast-repository.service';

describe('SearchRepositoryService', () => {
  let service: PodcastRepositoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ]
    });
    service = TestBed.inject(PodcastRepositoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
