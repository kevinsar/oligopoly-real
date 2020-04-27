import { ClickOutsideDirective } from './click-outside.directive';

describe('ClickOutsideDirective', () => {
  it('should create an instance', () => {
    const directive = new ClickOutsideDirective({} as any);
    expect(directive).toBeTruthy();
  });

  it('should emit clickOutside if element does not contain target', () => {
    const outsideDiv = document.createElement('div');
    const elementRefDiv = document.createElement('div');
    const interiorDiv = document.createElement('button');
    elementRefDiv.append(interiorDiv);
    const elementRef = {
      nativeElement: elementRefDiv
    };
    const directive = new ClickOutsideDirective(elementRef);
    spyOn(directive.clickOutside, 'emit');
    directive.onClick(outsideDiv);
    expect(directive.clickOutside.emit).toHaveBeenCalled();
  });

  it('should not emit clickOutside if target is inside element ref', () => {
    const elementRefDiv = document.createElement('div');
    const interiorDiv = document.createElement('button');
    elementRefDiv.append(interiorDiv);
    const elementRef = {
      nativeElement: elementRefDiv
    };
    const directive = new ClickOutsideDirective(elementRef);
    spyOn(directive.clickOutside, 'emit');
    directive.onClick(interiorDiv);
    expect(directive.clickOutside.emit).not.toHaveBeenCalled();
  });
});
