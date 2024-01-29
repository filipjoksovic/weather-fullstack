import { Injectable, WritableSignal, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private storage: Storage = localStorage;
  public addedToStorage: WritableSignal<string> = signal<string>('');
  public removedFromStorage: WritableSignal<string> = signal<string>('');
  public storageCleared: WritableSignal<void> = signal<void>(void 0);

  constructor() {}

  public get(key: string) {
    return this.storage.getItem(key);
  }

  public getObject(key: string): object | null {
    const value = this.storage.getItem(key);
    if (value) {
      return JSON.parse(value);
    }
    return null;
  }

  public set(key: string, value: string) {
    this.storage.setItem(key, value);
    this.addedToStorage.set(key);
  }

  public setObject(key: string, value: object) {
    this.storage.setItem(key, JSON.stringify(value));
    this.addedToStorage.set(key);
  }

  public remove(key: string) {
    this.storage.removeItem(key);
    this.removedFromStorage.set(key);
  }

  public clear() {
    this.storage.clear();
  }
}
