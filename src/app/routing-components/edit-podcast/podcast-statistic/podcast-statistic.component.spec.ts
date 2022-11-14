import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PodcastStatisticComponent } from './podcast-statistic.component';

describe('PodcastStatisticComponent', () => {
  let component: PodcastStatisticComponent;
  let fixture: ComponentFixture<PodcastStatisticComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PodcastStatisticComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PodcastStatisticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
