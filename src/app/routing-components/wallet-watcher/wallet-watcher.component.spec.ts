import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WalletWatcherComponent } from './wallet-watcher.component';

describe('WalletWatcherComponent', () => {
  let component: WalletWatcherComponent;
  let fixture: ComponentFixture<WalletWatcherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WalletWatcherComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WalletWatcherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
