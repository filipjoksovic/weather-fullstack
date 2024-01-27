import { Injectable } from '@angular/core';
import { CurrentWeatherApiService } from '../api/current-weather.api.service';

@Injectable({
  providedIn: 'root',
})
export class CurrentWeatherDataService {
  constructor(private currentWeatherApiService: CurrentWeatherApiService) {}

  public getCurrentWeather() {
    return this.currentWeatherApiService.getCurrentWeather();
  }
}
