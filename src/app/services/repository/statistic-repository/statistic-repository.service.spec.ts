import { TestBed } from '@angular/core/testing';

import { StatisticRepositoryService } from './statistic-repository.service';

describe('StatisticRepositoryService', () => {
  let service: StatisticRepositoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StatisticRepositoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
