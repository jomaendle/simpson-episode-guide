import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoFieldComponent } from './info-field.component';

describe('InfoFieldComponent', () => {
  let component: InfoFieldComponent;
  let fixture: ComponentFixture<InfoFieldComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [InfoFieldComponent]
    });
    fixture = TestBed.createComponent(InfoFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
