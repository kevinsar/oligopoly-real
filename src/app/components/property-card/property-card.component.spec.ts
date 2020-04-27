import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyCardComponent } from './property-card.component';
import { Color } from 'src/app/enums/color.enum';

describe('PropertyCardComponent', () => {
  let component: PropertyCardComponent;
  let fixture: ComponentFixture<PropertyCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PropertyCardComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PropertyCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    component.properties = [{ color: Color.BLUE, rents: [1, 2, 3] }];
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('propertyClass', () => {
    it('should return property class when properties exist on card', () => {
      component.properties = [{ color: Color.BLUE } as any];
      expect(component.propertyClass).toBe('property-title-container-blue card-bg-blue');
    });

    it('should return empty string when no properties exist on card', () => {
      component.properties = [];
      expect(component.propertyClass).toBe('');
    });
  });
});
