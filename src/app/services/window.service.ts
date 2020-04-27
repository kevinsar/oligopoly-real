import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WindowService {
  localStorage: any = {};

  constructor() {}

  setItem(itemKey: string, itemValue: string) {
    this.localStorage[itemKey] = itemValue;
    window.localStorage.setItem(itemKey, itemValue);
  }

  getItem(itemKey: string) {
    let value = this.localStorage[itemKey];

    if (!value) {
      value = window.localStorage.getItem(itemKey);
    }
    return value;
  }

  removeItem(itemKey: string) {
    this.localStorage[itemKey] = null;
    window.localStorage.removeItem(itemKey);
  }
}
