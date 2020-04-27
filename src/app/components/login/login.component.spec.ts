import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MaterialModule } from 'src/app/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { WindowService } from 'src/app/services/window.service';
import { of, throwError } from 'rxjs';
import { SpinnerService } from 'src/app/services/spinner.service';
import { SpinnerComponent } from '../spinner/spinner.component';
import { ActivatedRoute } from '@angular/router';

const gamesResolver = {
  data: of({ games: { games: [] } })
};

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent, SpinnerComponent],
      providers: [WindowService, SpinnerService, { provide: ActivatedRoute, useValue: gamesResolver }],
      imports: [HttpClientTestingModule, RouterTestingModule, MaterialModule, ReactiveFormsModule, FormsModule, BrowserAnimationsModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {});

  describe('submit', () => {
    it('should set window localStorage when login is successful', () => {
      component.name = 'testName';
      component.gameId = 'testCode';
      spyOn(component['router'], 'navigate');
      spyOn(component['httpClient'], 'post').and.returnValue(of({ success: true, player: { id: 123 } }));
      component.submit();
      expect(component['windowService'].getItem('userName')).toBe('testName');
      expect(component['windowService'].getItem('gameId')).toBe('TESTCODE');
      expect(component['windowService'].getItem('userId')).toBe(123);
      expect(component['router'].navigate).toHaveBeenCalled();
      expect(component.gameExistsError).toBe(false);
    });

    it('should not set window localStorage when login is successful', () => {
      component['windowService'].setItem('userName', 'testName');
      component['windowService'].setItem('gameId', 'TESTCODE');
      component['windowService'].setItem('userId', '123');
      component.name = 'testName';
      component.gameId = 'testCode';
      spyOn(component['router'], 'navigate');
      spyOn(component['httpClient'], 'post').and.returnValue(of({ success: false, player: { id: 123 } }));
      component.submit();
      expect(component['windowService'].getItem('userName')).toBeNull();
      expect(component['windowService'].getItem('gameId')).toBeNull();
      expect(component['windowService'].getItem('userId')).toBeNull();
      expect(component['router'].navigate).not.toHaveBeenCalled();
      expect(component.gameExistsError).toBe(true);
    });

    it('should set gameExists error to true if there is an api error', () => {
      component['windowService'].setItem('userName', 'testName');
      component['windowService'].setItem('gameId', 'TESTCODE');
      component['windowService'].setItem('userId', '123');
      component.name = 'testName';
      component.gameId = 'testCode';
      spyOn(component['router'], 'navigate');
      spyOn(component['httpClient'], 'post').and.returnValue(throwError(null));
      component.submit();
      expect(component['windowService'].getItem('userName')).toBeNull();
      expect(component['windowService'].getItem('gameId')).toBeNull();
      expect(component['windowService'].getItem('userId')).toBeNull();
      expect(component['router'].navigate).not.toHaveBeenCalled();
      expect(component.gameExistsError).toBe(true);
    });
  });
});
