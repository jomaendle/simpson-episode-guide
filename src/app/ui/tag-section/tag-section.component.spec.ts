import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TagSectionComponent } from './tag-section.component';

describe('TagSectionComponent', () => {
  let component: TagSectionComponent;
  let fixture: ComponentFixture<TagSectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TagSectionComponent]
    });
    fixture = TestBed.createComponent(TagSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
