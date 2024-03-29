import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ForecastWeatherResponse } from '../../../forecast/models/api/response/forecast-weather-response';
import { CurrentWeatherModelKeys } from '../../../current-weather/models/cw-req-keys.map';
import {
  currentWeatherModelKeyToDailyForecastParams,
  isParameterSupported,
} from '../../models/api/request/forecast-details-request.params';
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
import { MessageService } from 'primeng/api';
import { EnvironmentService } from '@core/services/environment.service';

@Injectable({
  providedIn: 'root',
})
export class ForecastDetailsApiService {
  constructor(
    private readonly http: HttpClient,
    private readonly messageService: MessageService,
    private readonly environmentService: EnvironmentService
  ) {}

  public getDetailsForParam(
    parameter: CurrentWeatherModelKeys,
    latitude: number = 52.52,
    longitude: number = 13.41,
    speedUnit?: SpeedUnit,
    temperatureUnit?: TemperatureUnit,
    heightUnit?: HeightUnit,
    strategy: 'daily' | 'hourly' = 'daily'
  ) {
    if (!isParameterSupported(parameter)) {
      this.messageService.add({
        severity: 'info',
        summary: 'Unsupported parameter',
        detail: `Parameter ${parameter} is not supported by the API or the application.`,
      });
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
      wind_speed_unit: speedUnit
        ? speedUnitToSpeedUnitParamMapper(speedUnit)
        : 'kmh',
      temperature_unit: temperatureUnit
        ? temperatureUnitToTemperatureUnitParamMapper(temperatureUnit)
        : 'celsius',
      precipitation_unit: heightUnit
        ? heightUnitToHeightUnitParamMapper(heightUnit)
        : 'mm',
      past_days: 5,
    });
    return this.http.get<ForecastWeatherResponse>(
      this.environmentService.environment().dailyWeatherUrl,
      { params }
    );
  }
}
