import { Injectable } from '@angular/core';
import { CurrentWeatherApiService } from '../api/current-weather.api.service';
import {
  CurrentWeather,
  currentWeatherHeadlessResponseToCurrentWeather,
} from '../../models/current-weather.model';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CurrentWeatherDataService {
  constructor(private currentWeatherApiService: CurrentWeatherApiService) {}

  public getCurrentWeather(): Observable<CurrentWeather> {
    return this.currentWeatherApiService
      .getCurrentWeather()
      .pipe(map(currentWeatherHeadlessResponseToCurrentWeather));
  }
}
