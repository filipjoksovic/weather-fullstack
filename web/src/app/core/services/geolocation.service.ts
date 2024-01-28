import { Injectable, signal, Signal, WritableSignal } from '@angular/core';
import { ToasterService } from './toaster.service';
import { SignalState } from '../../forecast/services/data/forecast.data.service';
import { tap } from 'rxjs';
import { LocationDataService } from '../../location/services/data/location.data.service';

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
export class GeoLocationService {
  constructor() {}

  currentLocation: WritableSignal<GeoLocationState> = signal({
    coords: null,
    loadingState: DataState.UNDEFINED,
  });

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
