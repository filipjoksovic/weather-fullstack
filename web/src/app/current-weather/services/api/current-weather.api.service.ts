import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CurrentWeatherResponse } from '../../models/response/current-weather-response';

@Injectable({
  providedIn: 'root',
})
export class CurrentWeatherApiService {
  constructor(private readonly http: HttpClient) {}

  public getCurrentWeather(longitude: number, latitude: number) {
    let params = new HttpParams();
    params = params.append('latitude', latitude.toString());
    params = params.append('longitude', longitude.toString());
    params = params.append(
      'current',
      'temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,rain,showers,snowfall,weather_code,cloud_cover,pressure_msl,surface_pressure,wind_speed_10m,wind_direction_10m,wind_gusts_10m'
    );
    params = params.append('temperature_unit', 'fahrenheit');
    params = params.append('wind_speed_unit', 'kn');
    params = params.append('precipitation_unit', 'inch');
    params = params.append('timeformat', 'unixtime');

    return this.http.get<CurrentWeatherResponse>(
      `https://api.open-meteo.com/v1/forecast`,
      { params }
    );
  }
}
