import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentTradeListComponent } from './recent-trade-list.component';

describe('RecentTradeListComponent', () => {
  let component: RecentTradeListComponent;
  let fixture: ComponentFixture<RecentTradeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecentTradeListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecentTradeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
