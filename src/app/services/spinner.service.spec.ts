import { TestBed } from '@angular/core/testing';

import { SpinnerService } from './spinner.service';

describe('SpinnerService', () => {
  let service: SpinnerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpinnerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('showSpinner', () => {
    it('should increment spinnerCount and call spinnerSubject with true', () => {
      service.spinnerCount = 1;
      spyOn(service.spinnerSubject, 'next');
      service.showSpinner();
      expect(service.spinnerCount).toBe(2);
      expect(service.spinnerSubject.next).toHaveBeenCalled();
    });
  });

  describe('hideSpinner', () => {
    it('should decrement spinnerCount and do nothing if spinnerCount is greater than 0', () => {
      service.spinnerCount = 2;
      spyOn(service.spinnerSubject, 'next');
      service.hideSpinner();
      expect(service.spinnerCount).toBe(1);
      expect(service.spinnerSubject.next).not.toHaveBeenCalledWith(true);
    });

    it('should decrement spinnerCount and call spinnerSubject when spinnerCount is 0', () => {
      service.spinnerCount = 1;
      spyOn(service.spinnerSubject, 'next');
      service.hideSpinner();
      expect(service.spinnerCount).toBe(0);
      expect(service.spinnerSubject.next).toHaveBeenCalledWith(false);
    });

    it('should set spinnerCount to zero and call spinnerSubject when forceHide is true', () => {
      service.spinnerCount = 10;
      spyOn(service.spinnerSubject, 'next');
      service.hideSpinner(true);
      expect(service.spinnerCount).toBe(0);
      expect(service.spinnerSubject.next).toHaveBeenCalledWith(false);
    });
  });

  describe('getSpinnerStatus', () => {});
});
