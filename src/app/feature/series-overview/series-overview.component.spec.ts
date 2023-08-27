import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeriesOverviewComponent } from './series-overview.component';

describe('SeriesOverviewComponent', () => {
  let component: SeriesOverviewComponent;
  let fixture: ComponentFixture<SeriesOverviewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SeriesOverviewComponent]
    });
    fixture = TestBed.createComponent(SeriesOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
