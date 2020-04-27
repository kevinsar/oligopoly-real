import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RentCardComponent } from './rent-card.component';
import { Color } from 'src/app/enums/color.enum';

describe('RentCardComponent', () => {
  let component: RentCardComponent;
  let fixture: ComponentFixture<RentCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RentCardComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RentCardComponent);
    component = fixture.componentInstance;

    component.rentColors = [Color.RED, Color.YELLOW];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
