import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Signal,
  inject,
} from '@angular/core';
import { CurrentWeather } from '../../../current-weather/models/current-weather.model';
import { WeatherMeasurementComponent } from '../../components/weather-measurment/weather-measurement.component';
import {
  ComponentLoadedState,
  ComponentLoadingState,
  ComponentState,
} from '../home/home.component';
import { toSignal } from '@angular/core/rxjs-interop';
import { CurrentWeatherDataService } from '../../../current-weather/services/data/current-weather.data.service';
import { delay, map, tap } from 'rxjs';
import { DataState } from '../../../core/services/location.service';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
  selector: 'app-weather-measurements',
  standalone: true,
  imports: [CommonModule, WeatherMeasurementComponent, SkeletonModule],
  templateUrl: `./weather-measurements.component.html`,
  styleUrl: './weather-measurements.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WeatherMeasurementsComponent {
  private readonly currentWeatherDataService = inject(
    CurrentWeatherDataService
  );

  weather: Signal<ComponentState<CurrentWeather>> = toSignal(
    this.currentWeatherDataService.getCurrentWeather().pipe(
      delay(2000),
      tap(console.log),
      map(
        (data: CurrentWeather) =>
          ({
            data: data,
            state: DataState.LOADED,
          }) as ComponentState<CurrentWeather>
      )
    ),
    {
      initialValue: {
        state: DataState.LOADING,
      } as ComponentState<CurrentWeather>,
    }
  );

  protected DataState = DataState;
}
