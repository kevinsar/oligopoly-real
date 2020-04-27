import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {
  spinnerCount = 0;
  spinnerSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  spinnerObserver: Observable<boolean> = this.spinnerSubject.asObservable();

  constructor() {}

  showSpinner() {
    this.spinnerCount++;
    this.spinnerSubject.next(true);
  }

  hideSpinner(forceHide = false) {
    this.spinnerCount--;

    if (this.spinnerCount <= 0 || forceHide) {
      this.spinnerCount = 0;
      this.spinnerSubject.next(false);
    }
  }

  getSpinnerStatus() {
    return this.spinnerObserver;
  }
}
