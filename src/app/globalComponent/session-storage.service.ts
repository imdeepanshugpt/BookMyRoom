import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionStorageService {

  constructor() { }
  getItem(key: string) {
    return sessionStorage.getItem(key);
  }

  setItem(key: string, value: any) {
    sessionStorage.setItem(key, value);
  }

  removeItem(key: string) {
    sessionStorage.removeItem(key);
  }
}
