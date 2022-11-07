import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagePodcastComponent } from './manage-podcast.component';

describe('ManagePodcastComponent', () => {
  let component: ManagePodcastComponent;
  let fixture: ComponentFixture<ManagePodcastComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagePodcastComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagePodcastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
