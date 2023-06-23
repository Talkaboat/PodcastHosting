import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TraderPerformanceWidgetComponent } from './trader-performance-widget.component';

describe('TraderPerformanceWidgetComponent', () => {
  let component: TraderPerformanceWidgetComponent;
  let fixture: ComponentFixture<TraderPerformanceWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TraderPerformanceWidgetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TraderPerformanceWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
