import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ForecastWeatherResponse } from '../../models/api/response/forecast-weather-response';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ForecastApiService {
  constructor(private readonly http: HttpClient) {}

  public getBasicForecasting(
    longitude: number,
    latitude: number
  ): Observable<ForecastWeatherResponse> {
    let params = new HttpParams();
    params = params.append('latitude', latitude.toString());
    params = params.append('longitude', longitude.toString());
    params = params.append('daily', 'temperature_2m_max,temperature_2m_min');
    params = params.append('wind_speed_unit', 'kn');
    params = params.append('past_days', '5');

    return this.http.get<ForecastWeatherResponse>(
      `https://api.open-meteo.com/v1/forecast`,
      { params }
    );
  }
}
