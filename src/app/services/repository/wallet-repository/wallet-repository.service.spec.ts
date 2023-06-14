import { TestBed } from '@angular/core/testing';
import { WalletRepositoryService } from './wallet-repository.service';


describe('WalletRepositoryService', () => {
  let service: WalletRepositoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WalletRepositoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
