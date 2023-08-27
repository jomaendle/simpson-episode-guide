import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeasonOverviewComponent } from './season-overview.component';

describe('SeasonOverviewComponent', () => {
  let component: SeasonOverviewComponent;
  let fixture: ComponentFixture<SeasonOverviewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SeasonOverviewComponent]
    });
    fixture = TestBed.createComponent(SeasonOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
