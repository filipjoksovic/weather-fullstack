import { Injectable, WritableSignal, signal } from '@angular/core';
import { ForecastDetailsApiService } from '../api/forecast-details.api.service';
import { Observable, map, tap } from 'rxjs';
import { CurrentWeatherModelKeys } from '../../../current-weather/models/cw-req-keys.map';
import { DataState } from '@core/models/data.state.enum';
import { ForecastWeatherResponse } from '@forecast/models/api/response/forecast-weather-response';
import { ForecastDetailsState } from 'app/forecast-details/models/forecast-details.state';
import { UserStoreService } from 'app/user/services/user.store.service';
import { GeoLocationService } from '@core/services/geolocation.service';
import { getSpeedUnits } from '@core/models/api/response/speed.unit';

@Injectable({
  providedIn: 'root',
})
export class ForecastDetailsService {
  showDialog: WritableSignal<boolean> = signal(false);
  measurementData: WritableSignal<ForecastDetailsState> = signal({
    state: DataState.UNDEFINED,
  } as ForecastDetailsState);

  user = this.userService.user;
  location = this.geoLocationService.currentLocation;

  constructor(
    private readonly forecastDetailsApiService: ForecastDetailsApiService,
    private readonly userService: UserStoreService,
    private readonly geoLocationService: GeoLocationService
  ) {}

  public showParams(measurement: CurrentWeatherModelKeys) {
    this.getDetailsForParam(measurement)
      .pipe(
        tap(() => this.showDialog.set(true)),
        tap({
          next: response => {
            this.measurementData.set({
              state: DataState.LOADED,
              activeParameter: measurement,
              data: response,
            } as ForecastDetailsState);
          },
          error: error => {
            this.measurementData.set({
              state: DataState.ERROR,
              activeParameter: measurement,
              error: error,
            } as ForecastDetailsState);
          },
        })
      )
      .subscribe();
  }

  private getDetailsForParam(
    measurement: CurrentWeatherModelKeys
  ): Observable<ForecastWeatherResponse> {
    return this.forecastDetailsApiService
      .getDetailsForParam(
        measurement,
        this.location().coords?.longitude,
        this.location().coords?.latitude,
        this.user()?.unitSettings?.speed,
        this.user()?.unitSettings?.temperature,
        this.user()?.unitSettings.height
      )
      .pipe();
  }
}
