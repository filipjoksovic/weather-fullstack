import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ForecastWeatherResponse } from '../../models/api/response/forecast-weather-response';
import { Observable } from 'rxjs';
import {
  SpeedUnit,
  speedUnitToSpeedUnitParamMapper,
} from '@core/models/api/response/speed.unit';
import {
  TemperatureUnit,
  temperatureUnitToTemperatureUnitParamMapper,
} from '@core/models/api/response/temperature.unit';
import {
  HeightUnit,
  heightUnitToHeightUnitParamMapper,
} from '@core/models/api/response/height.unit';

@Injectable({
  providedIn: 'root',
})
export class ForecastApiService {
  constructor(private readonly http: HttpClient) {}

  public getBasicForecasting(
    longitude: number,
    latitude: number,
    speedUnit: SpeedUnit,
    temperatureUnit: TemperatureUnit,
    heightUnit: HeightUnit
  ): Observable<ForecastWeatherResponse> {
    let params = new HttpParams();
    params = params.append('latitude', latitude.toString());
    params = params.append('longitude', longitude.toString());
    params = params.append('daily', 'temperature_2m_max,temperature_2m_min');
    params = params.append('daily', 'weather_code');
    params = params.append(
      'wind_speed_unit',
      speedUnitToSpeedUnitParamMapper(speedUnit)
    );
    params = params.append(
      'temperature_unit',
      temperatureUnitToTemperatureUnitParamMapper(temperatureUnit)
    );
    params = params.append(
      'precipitation_unit',
      heightUnitToHeightUnitParamMapper(heightUnit)
    );

    params = params.append('past_days', '5');

    return this.http.get<ForecastWeatherResponse>(
      `https://api.open-meteo.com/v1/forecast`,
      { params }
    );
  }
}
