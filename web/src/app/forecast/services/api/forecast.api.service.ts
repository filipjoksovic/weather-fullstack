import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ForecastWeatherResponse } from '../../models/api/response/forecast-weather-response';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ForecastApiService {
  constructor(private readonly http: HttpClient) {}

  public getBasicForecasting(): Observable<ForecastWeatherResponse> {
    return this.http.get<ForecastWeatherResponse>(
      `https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&daily=temperature_2m_max,temperature_2m_min&wind_speed_unit=kn&past_days=5`
    );
  }
}
