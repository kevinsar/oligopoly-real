import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { of } from 'rxjs';
import { SpinnerComponent } from './components/spinner/spinner.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [AppComponent, SpinnerComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should set showSpinner status and call change detection ref', () => {
      component.showSpinner = true;
      spyOn(component['cdr'], 'detectChanges');
      spyOn(component['spinnerService'], 'getSpinnerStatus').and.returnValue(of(false));
      component.ngOnInit();
      expect(component.showSpinner).toBeFalse();
      expect(component['cdr'].detectChanges).toHaveBeenCalled();
    });
  });
});
