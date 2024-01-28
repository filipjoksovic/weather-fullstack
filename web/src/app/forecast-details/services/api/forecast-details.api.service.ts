import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ForecastWeatherResponse } from '../../../forecast/models/api/response/forecast-weather-response';
import {
  CurrentWeatherModelKeys,
  CurrentWeatherModelKeysToRequestKeys,
} from '../../../current-weather/models/cw-req-keys.map';

export const currentWeatherModelKeyToDailyForecastParams: {
  [key in CurrentWeatherModelKeys]: string[];
} = {
  [CurrentWeatherModelKeys.apparentTemperature]: [
    'apparent_temperature_max',
    'apparent_temperature_min',
  ],
  [CurrentWeatherModelKeys.cloudCover]: [],
  [CurrentWeatherModelKeys.humidity]: [],
  [CurrentWeatherModelKeys.precipitation]: ['precipitation_sum'],
  [CurrentWeatherModelKeys.pressure]: [],
  [CurrentWeatherModelKeys.rain]: ['rain_sum'],
  [CurrentWeatherModelKeys.showers]: ['showers_sum'],
  [CurrentWeatherModelKeys.snowfall]: ['snowfall_sum'],
  [CurrentWeatherModelKeys.surfacePressure]: [],
  [CurrentWeatherModelKeys.temperature]: [
    'temperature_2m_max',
    'temperature_2m_min',
  ],
  [CurrentWeatherModelKeys.time]: [],
  [CurrentWeatherModelKeys.windDirection]: ['wind_direction_10m_dominant'],
  [CurrentWeatherModelKeys.windGusts]: ['wind_gusts_10m_max'],
  [CurrentWeatherModelKeys.windSpeed]: ['wind_speed_10m_max'],
};

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
    let params: HttpParams = new HttpParams();
    params = params.appendAll({
      latitude: latitude,
      longitude: longitude,
      strategy: strategy,
      daily: currentWeatherModelKeyToDailyForecastParams[parameter],
      wind_speed_unit: 'kn',
      past_days: 5,
    });
    return this.http.get<ForecastWeatherResponse>(
      `https://api.open-meteo.com/v1/forecast`,
      { params }
    );
  }
}
