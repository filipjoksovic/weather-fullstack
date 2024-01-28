import { Injectable, computed, signal } from '@angular/core';
import { CurrentWeatherApiService } from '../api/current-weather.api.service';
import {
  CurrentWeather,
  currentWeatherHeadlessResponseToCurrentWeather,
} from '../../models/current-weather.model';
import { Observable, map, tap } from 'rxjs';
import { SignalState } from '../../../forecast/services/data/forecast.data.service';
import {
  DataState,
  GeoLocationService,
} from '../../../core/services/geolocation.service';
import { toObservable } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class CurrentWeatherDataService {
  constructor(
    private currentWeatherApiService: CurrentWeatherApiService,
    private readonly geoLocationService: GeoLocationService
  ) {
    toObservable(this.location).subscribe(location => {
      if (location) {
        console.log('Getting current weather');

        this.getCurrentWeather(location.longitude, location.latitude).subscribe(
          data => console.log('Current weather', data)
        );
      }
    });
  }

  private location = computed(() => {
    const locationSignal = this.geoLocationService.currentLocation();
    if (locationSignal.loadingState === DataState.LOADED) {
      return locationSignal.coords;
    }
    return null;
  });

  public currentWeather = signal<SignalState<CurrentWeather>>({
    state: DataState.UNDEFINED,
  } as SignalState<CurrentWeather>);

  public getCurrentWeather(
    longitude: number,
    latitude: number
  ): Observable<CurrentWeather> {
    this.currentWeather.set({
      state: DataState.LOADING,
      data: null,
    } as SignalState<CurrentWeather>);

    return this.currentWeatherApiService
      .getCurrentWeather(longitude, latitude)
      .pipe(
        map(currentWeatherHeadlessResponseToCurrentWeather),
        tap({
          next: (data: CurrentWeather) =>
            this.currentWeather.set({
              state: DataState.LOADED,
              data,
            } as SignalState<CurrentWeather>),
          error: () =>
            this.currentWeather.set({
              state: DataState.ERROR,
              data: null,
            } as SignalState<CurrentWeather>),
        })
      );
  }
}
