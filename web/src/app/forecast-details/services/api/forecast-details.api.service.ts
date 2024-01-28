import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ForecastWeatherResponse } from '../../../forecast/models/api/response/forecast-weather-response';

@Injectable({
  providedIn: 'root',
})
export class ForecastDetailsApiService {
  constructor(private readonly http: HttpClient) {}

  public getDetailsForParam() {
    return this.http.get<ForecastWeatherResponse>(
      `https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&daily=temperature_2m_max&wind_speed_unit=kn&past_days=5`
    );
  }
}
