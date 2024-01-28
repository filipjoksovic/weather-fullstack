import { Injectable, WritableSignal, signal } from '@angular/core';
import { ForecastDetailsApiService } from '../api/forecast-details.api.service';
import {
  ForecastWeather,
  forecastWeatherHeadlessResponseToForecastMeasurement,
} from '../../../forecast/models/forecast-weather.model';
import { Observable, map, tap } from 'rxjs';
import { ForecastWeatherResponse } from '../../../forecast/models/api/response/forecast-weather-response';

@Injectable({
  providedIn: 'root',
})
export class ForecastDetailsService {
  showDialog: WritableSignal<boolean> = signal(false);
  measurementData: WritableSignal<ForecastWeatherResponse | null> =
    signal(null);
  constructor(
    private readonly forecastDetailsApiService: ForecastDetailsApiService
  ) {}

  //TODO type
  public showParams(measurement: string) {
    this.getDetailsForParam()
      .pipe(
        tap(() => this.showDialog.set(true)),
        tap(this.measurementData.set)
      )
      .subscribe();
  }

  private getDetailsForParam(): Observable<ForecastWeatherResponse> {
    return this.forecastDetailsApiService.getDetailsForParam().pipe();
  }
}
