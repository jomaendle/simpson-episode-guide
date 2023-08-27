import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EpisodeOverviewComponent } from './episode-overview.component';

describe('EpisodeOverviewComponent', () => {
  let component: EpisodeOverviewComponent;
  let fixture: ComponentFixture<EpisodeOverviewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [EpisodeOverviewComponent]
    });
    fixture = TestBed.createComponent(EpisodeOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
