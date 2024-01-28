import { Injectable, signal, WritableSignal } from '@angular/core';
import { DataState } from '@core/models/data.state.enum';

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
