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
import { formatDate } from 'date-fns';
import { Environment } from 'environments/environment.base';
import { EnvironmentService } from '@core/services/environment.service';

@Injectable({
  providedIn: 'root',
})
export class ForecastApiService {
  constructor(
    private readonly http: HttpClient,
    private readonly environmentService: EnvironmentService
  ) {}

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
      this.environmentService.environment().dailyWeatherUrl,
      { params }
    );
  }

  public getHourlyForecasting(
    longitude: number,
    latitude: number,
    date: Date,
    speedUnit: SpeedUnit,
    temperatureUnit: TemperatureUnit,
    heightUnit: HeightUnit
  ): Observable<ForecastWeatherResponse> {
    let params = new HttpParams();
    params = params.append('latitude', latitude.toString());
    params = params.append('longitude', longitude.toString());
    params = params.append(
      'temperature_unit',
      temperatureUnitToTemperatureUnitParamMapper(temperatureUnit)
    );
    params = params.append(
      'wind_speed_unit',
      speedUnitToSpeedUnitParamMapper(speedUnit)
    );
    params = params.append(
      'precipitation_unit',
      heightUnitToHeightUnitParamMapper(heightUnit)
    );
    params = params.append('hourly', 'temperature_2m');
    params = params.append('hourly', 'relative_humidity_2m');
    params = params.append('hourly', 'uv_index');
    params = params.append('hourly', 'rain');
    params = params.append('hourly', 'is_day');
    params = params.append('hourly', 'temperature');
    params = params.append('start_date', formatDate(date, 'yyyy-MM-dd'));
    params = params.append('end_date', formatDate(date, 'yyyy-MM-dd'));

    return this.http.get<ForecastWeatherResponse>(
      this.environmentService.environment().hourlyWeatherUrl,
      { params }
    );
  }
}
