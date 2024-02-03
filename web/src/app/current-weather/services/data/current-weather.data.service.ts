import {
  Injectable,
  Renderer2,
  RendererFactory2,
  computed,
  signal,
} from '@angular/core';
import { CurrentWeatherApiService } from '../api/current-weather.api.service';
import {
  CurrentWeather,
  currentWeatherHeadlessResponseToCurrentWeather,
} from '../../models/current-weather.model';
import { Observable, map, tap } from 'rxjs';
import { toObservable } from '@angular/core/rxjs-interop';
import { GeoLocationService } from '@core/services/geolocation.service';
import { DataState } from '@core/models/data.state.enum';
import { SignalState } from '@core/models/signal-state';
import { UserStoreService } from '../../../user/services/user.store.service';

//TODO split responsibilities into smaller services
@Injectable({
  providedIn: 'root',
})
export class CurrentWeatherDataService {
  constructor(
    private currentWeatherApiService: CurrentWeatherApiService,
    private readonly userService: UserStoreService
  ) {}

  public currentWeather = signal<SignalState<CurrentWeather>>({
    state: DataState.UNDEFINED,
  } as SignalState<CurrentWeather>);

  public getCurrentWeather(
    longitude: number,
    latitude: number
  ): Observable<CurrentWeather> {
    const userSpeedUnit = this.userService.user()!.unitSettings.speed;
    const userTemperatureUnit =
      this.userService.user()!.unitSettings.temperature;
    const userHeightUnit = this.userService.user()!.unitSettings.height;
    this.currentWeather.set({
      state: DataState.LOADING,
      data: null,
    } as SignalState<CurrentWeather>);

    return this.currentWeatherApiService
      .getCurrentWeather(
        longitude,
        latitude,
        userSpeedUnit,
        userHeightUnit,
        userTemperatureUnit
      )
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
