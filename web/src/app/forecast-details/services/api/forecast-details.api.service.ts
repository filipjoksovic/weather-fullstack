import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ForecastWeatherResponse } from '../../../forecast/models/api/response/forecast-weather-response';

@Injectable({
  providedIn: 'root',
})
export class ForecastDetailsApiService {
  constructor(private readonly http: HttpClient) {}

  public getDetailsForParam(
    latitude: number = 52.52,
    longitude: number = 13.41,
    strategy: 'daily' | 'hourly' = 'daily'
  ) {
    let params: HttpParams = new HttpParams();
    params = params.appendAll({
      latitude: latitude,
      longitude: longitude,
      strategy: strategy,
      daily: ['temperature_2m_max', 'temperature_2m_min'],
      wind_speed_unit: 'kn',
      past_days: 5,
    });
    return this.http.get<ForecastWeatherResponse>(
      `https://api.open-meteo.com/v1/forecast`,
      { params }
    );
  }
}
