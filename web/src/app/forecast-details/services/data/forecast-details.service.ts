import { Injectable, WritableSignal, signal } from '@angular/core';
import { ForecastDetailsApiService } from '../api/forecast-details.api.service';
import { Observable, map, tap } from 'rxjs';
import { CurrentWeatherModelKeys } from '../../../current-weather/models/cw-req-keys.map';
import { DataState } from '@core/models/data.state.enum';
import { ForecastWeatherResponse } from '@forecast/models/api/response/forecast-weather-response';

export type ForecastDetailsInitialState = {
  state: DataState.UNDEFINED;
  activeParameter: never;
  data: never;
};

export type ForecastDetailsLoadingState = {
  state: DataState.LOADING;
  activeParameter: CurrentWeatherModelKeys;
  data: never;
};

export type ForecastDetailsLoadedState = {
  state: DataState.LOADED;
  activeParameter: CurrentWeatherModelKeys;
  data: ForecastWeatherResponse;
};

export type ForecastDetailsErrorState = {
  state: DataState.ERROR;
  activeParameter: CurrentWeatherModelKeys;
  data: never;
  error: string;
};
export type ForecastDetailsState =
  | ForecastDetailsInitialState
  | ForecastDetailsLoadingState
  | ForecastDetailsLoadedState
  | ForecastDetailsErrorState;

@Injectable({
  providedIn: 'root',
})
export class ForecastDetailsService {
  showDialog: WritableSignal<boolean> = signal(false);
  measurementData: WritableSignal<ForecastDetailsState> = signal({
    state: DataState.UNDEFINED,
  } as ForecastDetailsState);

  constructor(
    private readonly forecastDetailsApiService: ForecastDetailsApiService
  ) {}

  //TODO type
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
      .getDetailsForParam(measurement)
      .pipe();
  }
}
