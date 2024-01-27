import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CurrentWeatherResponse } from '../../models/response/current-weather-response';

@Injectable({
  providedIn: 'root',
})
export class CurrentWeatherApiService {
  constructor(private readonly http: HttpClient) {}

  public getCurrentWeather() {
    return this.http.get<CurrentWeatherResponse>(
      `https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,rain,showers,snowfall,weather_code,cloud_cover,pressure_msl,surface_pressure,wind_speed_10m,wind_direction_10m,wind_gusts_10m&temperature_unit=fahrenheit&wind_speed_unit=kn&precipitation_unit=inch&timeformat=unixtime`
    );
  }
}
