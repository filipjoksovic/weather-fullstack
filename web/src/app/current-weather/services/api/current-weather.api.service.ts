import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CurrentWeatherResponse } from '../../models/response/current-weather-response';
import {
  SpeedUnit,
  speedUnitToSpeedUnitParamMapper,
} from '@core/models/api/response/speed.unit';
import {
  HeightUnit,
  heightUnitToHeightUnitParamMapper,
} from '@core/models/api/response/height.unit';
import {
  TemperatureUnit,
  temperatureUnitToTemperatureUnitParamMapper,
} from '@core/models/api/response/temperature.unit';
import { EnvironmentService } from '@core/services/environment.service';

@Injectable({
  providedIn: 'root',
})
export class CurrentWeatherApiService {
  constructor(
    private readonly http: HttpClient,
    private readonly environmentService: EnvironmentService
  ) {}

  public getCurrentWeather(
    longitude: number,
    latitude: number,
    speedUnit: SpeedUnit,
    heightUnit: HeightUnit,
    temperatureUnit: TemperatureUnit
  ) {
    let params = new HttpParams();
    params = params.append('latitude', latitude.toString());
    params = params.append('longitude', longitude.toString());
    params = params.append(
      'current',
      'temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,rain,showers,snowfall,weather_code,cloud_cover,pressure_msl,surface_pressure,wind_speed_10m,wind_direction_10m,wind_gusts_10m'
    );
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
    params = params.append('timeformat', 'iso8601');

    return this.http.get<CurrentWeatherResponse>(
      this.environmentService.environment().currentWeatherUrl,
      { params }
    );
  }
}
