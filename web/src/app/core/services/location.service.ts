import { Injectable, signal, Signal, WritableSignal } from '@angular/core';
import { ToasterService } from './toaster.service';

export enum DataState {
  LOADING = 'LOADING',
  EMPTY = 'EMPTY',
  LOADED = 'LOADED',
  ERROR = 'ERROR',
  UNDEFINED = 'UNDEFINED',
}

export interface GeoLocationState {
  coords: GeolocationCoordinates | null;
  loadingState: DataState;
}

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  currentLocation: WritableSignal<GeoLocationState> = signal({
    coords: null,
    loadingState: DataState.UNDEFINED,
  });
  constructor() {}

  public getLocation() {
    this.currentLocation.update(currentState => ({
      ...currentState,
      loadingState: DataState.LOADING,
    }));

    navigator.geolocation.getCurrentPosition(
      (location: GeolocationPosition) => {
        this.currentLocation.set({
          coords: location.coords,
          loadingState: DataState.LOADED,
        });
      },
      error => {
        this.currentLocation.set({
          coords: null,
          loadingState: DataState.ERROR,
        });
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      }
    );
  }
}
