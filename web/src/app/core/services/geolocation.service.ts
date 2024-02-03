import { effect, Injectable, signal, WritableSignal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { DataState } from '@core/models/data.state.enum';
import { SignalState } from '@core/models/signal-state';
import { CurrentWeatherDataService } from '@current-weather/services/data/current-weather.data.service';
import { ForecastDataService } from '@forecast/services/data/forecast.data.service';
import { LocationDetails } from 'app/location/models/location-details.model';
import { LocationDataService } from 'app/location/services/data/location.data.service';
import { filter, map, tap } from 'rxjs';

export interface GeoLocationState {
  coords: GeolocationCoordinates | null;
  loadingState: DataState;
}

@Injectable({
  providedIn: 'root',
})
export class GeoLocationService {
  constructor(
    private readonly currentWeatherService: CurrentWeatherDataService,
    private readonly forecastDataService: ForecastDataService,
    private readonly locationService: LocationDataService
  ) {
    toObservable(this.currentLocation)
      .pipe(
        filter(data => data.state === DataState.LOADED),
        map(data => data.data)
      )
      .subscribe(location => {
        tap(() => {
          this.locationDetails.set({
            state: DataState.LOADING,
          } as SignalState<LocationDetails>);
        });
        this.locationService
          .getLocationDetails(location.longitude, location.latitude)
          .subscribe({
            next: locationDetails => {
              this.locationDetails.set({
                state: DataState.LOADED,
                data: locationDetails,
              });
              console.log('locationDetails', locationDetails);
            },
            error: () => {
              this.locationDetails.set({
                state: DataState.ERROR,
              } as SignalState<LocationDetails>);
            },
          });
        this.currentWeatherService
          .getCurrentWeather(location.longitude, location.latitude)
          .subscribe();
        this.forecastDataService
          .getBasicForecast(location.longitude, location.latitude)
          .subscribe();
      });
  }

  currentLocation = signal<SignalState<GeolocationCoordinates>>({
    state: DataState.UNDEFINED,
  } as SignalState<GeolocationCoordinates>);

  locationDetails = signal<SignalState<LocationDetails>>({
    state: DataState.UNDEFINED,
  } as SignalState<LocationDetails>);

  public getLocation() {
    this.currentLocation.update(currentState => ({
      ...currentState,
      loadingState: DataState.LOADING,
    }));

    navigator.geolocation.getCurrentPosition(
      (location: GeolocationPosition) => {
        this.currentLocation.set({
          data: location.coords,
          state: DataState.LOADED,
        });
      },
      error => {
        this.currentLocation.set({
          state: DataState.ERROR,
        } as SignalState<GeolocationCoordinates>);
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      }
    );
  }

  locationSelected(item: {
    longitude: number;
    latitude: number;
    [key: string]: any;
  }) {
    this.currentLocation.set({
      state: DataState.LOADED,
      data: {
        latitude: item.latitude,
        longitude: item.longitude,
        altitude: 0,
        accuracy: 1,
        altitudeAccuracy: 1,
        heading: 1,
        speed: 1,
      },
    });
  }
}
