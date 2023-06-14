import { TestBed } from '@angular/core/testing';
import { TradeRepositoryService } from './trade-repository.service';


describe('TradeRepositoryService', () => {
  let service: TradeRepositoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TradeRepositoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
