import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WildCardComponent } from './wild-card.component';
import { Color } from 'src/app/enums/color.enum';

describe('WildCardComponent', () => {
  let component: WildCardComponent;
  let fixture: ComponentFixture<WildCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [WildCardComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WildCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.properties = [{ color: Color.RED }, { color: Color.YELLOW }] as any;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('propertyClass', () => {
    it('should return rainbow class if its a rainbow wild card', () => {
      component.properties.push({ color: Color.BLACK } as any);
      expect(component.propertyClass).toBe('property-title-container-rainbow');
    });

    it('should return property class with color', () => {
      expect(component.propertyClass).toBe('property-title-container-red card-bg-red');
    });
  });

  describe('propertyClassReverse', () => {
    it('should return property class with color', () => {
      expect(component.propertyClassReverse).toBe('property-title-container-yellow card-bg-yellow');
    });

    it('should return empty string if only one property', () => {
      component.properties.pop();
      expect(component.propertyClassReverse).toBe('');
    });
  });
});
