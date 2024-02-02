import { Injectable, computed, signal } from '@angular/core';
import { Observable, filter, map, tap } from 'rxjs';
import { ForecastApiService } from '../api/forecast.api.service';
import { toObservable } from '@angular/core/rxjs-interop';
import { GeoLocationService } from '@core/services/geolocation.service';
import { DataState } from '@core/models/data.state.enum';
import { SignalState } from '@core/models/signal-state';
import {
  ForecastWeather,
  forecastWeatherHeadlessResponseToForecastMeasurement,
} from '@forecast/models/forecast-weather.model';
import { CurrentWeather } from '@current-weather/models/current-weather.model';
import { UserStoreService } from '../../../user/services/user.store.service';
import {
  ForecastWeatherMeasurementsResponse,
  ForecastWeatherResponse,
} from '@forecast/models/api/response/forecast-weather-response';

@Injectable({
  providedIn: 'root',
})
export class ForecastDataService {
  constructor(
    private readonly forecastApiService: ForecastApiService,
    private readonly locationService: GeoLocationService,
    private readonly userService: UserStoreService
  ) {
    toObservable(this.location)
      .pipe(filter(location => location !== null))
      .subscribe(location => {
        if (location) {
          this.getBasicForecast(
            location.longitude,
            location.latitude
          ).subscribe(data => console.log('Basic forecast', data));
        }
      });
  }

  public forecast = signal<SignalState<ForecastWeather>>({
    state: DataState.UNDEFINED,
  } as SignalState<ForecastWeather>);

  public hourlyForecast = signal<SignalState<ForecastWeatherResponse>>({
    state: DataState.UNDEFINED,
  } as SignalState<ForecastWeatherResponse>);

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
    const userSpeedUnit = this.userService.user()!.unitSettings.speed;
    const userTemperatureUnit =
      this.userService.user()!.unitSettings.temperature;
    const userHeightUnit = this.userService.user()!.unitSettings.height;

    this.forecast.set({
      state: DataState.LOADING,
      data: null,
    } as SignalState<ForecastWeather>);

    return this.forecastApiService
      .getBasicForecasting(
        longitude,
        latitude,
        userSpeedUnit,
        userTemperatureUnit,
        userHeightUnit
      )
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

  getHourlyForecasting(longitude: number, latitude: number, date: Date) {
    const userSpeedUnit = this.userService.user()!.unitSettings.speed;
    const userTemperatureUnit =
      this.userService.user()!.unitSettings.temperature;
    const userHeightUnit = this.userService.user()!.unitSettings.height;

    this.forecast.set({
      state: DataState.LOADING,
      data: null,
    } as SignalState<ForecastWeather>);

    return this.forecastApiService
      .getHourlyForecasting(longitude, latitude, new Date())
      .pipe(
        tap({
          next: (data: ForecastWeatherResponse) =>
            this.hourlyForecast.set({
              state: DataState.LOADED,
              data,
            } as SignalState<ForecastWeatherResponse>),
          error: () =>
            this.hourlyForecast.set({
              state: DataState.ERROR,
              data: null,
            } as SignalState<ForecastWeatherResponse>),
        })
      );
  }
}
