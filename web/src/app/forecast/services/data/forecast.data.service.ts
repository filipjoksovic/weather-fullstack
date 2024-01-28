import { Injectable, computed, effect, signal } from '@angular/core';
import { Observable, map, tap } from 'rxjs';
import {
  ForecastWeather,
  forecastWeatherHeadlessResponseToForecastMeasurement,
} from '../../models/forecast-weather.model';
import { ForecastApiService } from '../api/forecast.api.service';
import {
  DataState,
  GeoLocationService,
} from '../../../core/services/geolocation.service';
import { Data } from '@angular/router';

export type SignalLoadingState = {
  state: DataState.LOADING;
  data: never;
};

export type SignalLoadedState<T> = {
  state: DataState.LOADED;
  data: T;
};

export type SignalErrorState = {
  state: DataState.ERROR;
  data: never;
};

export type SignalUndefinedState = {
  state: DataState.UNDEFINED;
  data: never;
};

export type SignalState<T> =
  | SignalLoadingState
  | SignalLoadedState<T>
  | SignalErrorState
  | SignalUndefinedState;

@Injectable({
  providedIn: 'root',
})
export class ForecastDataService {
  constructor(
    private readonly forecastApiService: ForecastApiService,
    private readonly locationService: GeoLocationService
  ) {
    effect(() => {
      if (this.location()) {
        console.log('Getting basic forecast');

        this.getBasicForecast(
          this.location()?.longitude ?? 0,
          this.location()?.latitude ?? 0
        ).subscribe(data => console.log('Basic forecast', data));
      }
    });
  }

  public forecast = signal<SignalState<ForecastWeather>>({
    state: DataState.UNDEFINED,
  } as SignalState<ForecastWeather>);

  private location = computed(() => {
    const locationSignal = this.locationService.currentLocation();
    if (locationSignal.loadingState === DataState.LOADED) {
      return locationSignal.coords;
    }
    return null;
  });

  public getBasicForecast(
    longitude: number,
    latitude: number
  ): Observable<ForecastWeather> {
    this.forecast.set({
      state: DataState.LOADING,
      data: null,
    } as SignalState<ForecastWeather>);

    return this.forecastApiService
      .getBasicForecasting(longitude, latitude)
      .pipe(
        map(forecastWeatherHeadlessResponseToForecastMeasurement),
        tap({
          next: (data: ForecastWeather) =>
            this.forecast.set({
              state: DataState.LOADED,
              data,
            } as SignalState<ForecastWeather>),
          error: () =>
            this.forecast.set({
              state: DataState.ERROR,
              data: null,
            } as SignalState<ForecastWeather>),
        })
      );
  }
}
