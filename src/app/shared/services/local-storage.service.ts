import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  setItem(itemKey: string, itemValue: string): void {
    localStorage.setItem(itemKey, itemValue);
  }

  getItem(itemKey: string): string | null {
    return localStorage.getItem(itemKey);
  }

  setJSONItem(itemKey: string, itemValue: unknown): void {
    const stringItemValue = JSON.stringify(itemValue);
    localStorage.setItem(itemKey, stringItemValue);
  }

  getJSONItem<T>(itemKey: string): T | null {
    const stringItemValue = localStorage.getItem(itemKey);
    return stringItemValue ? JSON.parse(stringItemValue) : null;
  }

  removeItem(itemKey: string): void {
    localStorage.removeItem(itemKey);
  }
}
