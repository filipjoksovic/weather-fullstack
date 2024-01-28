import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ForecastWeatherResponse } from '../../../forecast/models/api/response/forecast-weather-response';
import { CurrentWeatherModelKeys } from '../../../current-weather/models/cw-req-keys.map';
import {
  currentWeatherModelKeyToDailyForecastParams,
  isParameterSupported,
} from '../../models/api/request/forecast-details-request.params';

@Injectable({
  providedIn: 'root',
})
export class ForecastDetailsApiService {
  constructor(private readonly http: HttpClient) {}

  public getDetailsForParam(
    parameter: CurrentWeatherModelKeys,
    latitude: number = 52.52,
    longitude: number = 13.41,
    strategy: 'daily' | 'hourly' = 'daily'
  ) {
    if (!isParameterSupported(parameter)) {
      throw new Error(
        `Parameter ${parameter} is not supported by the API or the application.`
      );
    }
    let params: HttpParams = new HttpParams();
    params = params.appendAll({
      latitude: latitude,
      longitude: longitude,
      strategy: strategy,
      daily: currentWeatherModelKeyToDailyForecastParams[parameter].join(','),
      wind_speed_unit: 'kn',
      past_days: 5,
    });
    return this.http.get<ForecastWeatherResponse>(
      `https://api.open-meteo.com/v1/forecast`,
      { params }
    );
  }
}
