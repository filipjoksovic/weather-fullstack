import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import {
  ForecastWeather,
  forecastWeatherHeadlessResponseToForecastMeasurement,
} from '../../models/forecast-weather.model';
import { ForecastApiService } from '../api/forecast.api.service';

@Injectable({
  providedIn: 'root',
})
export class ForecastDataService {
  constructor(private readonly forecastApiService: ForecastApiService) {}

  public getBasicForecast(): Observable<ForecastWeather> {
    return this.forecastApiService
      .getBasicForecasting()
      .pipe(map(forecastWeatherHeadlessResponseToForecastMeasurement));
  }
}
