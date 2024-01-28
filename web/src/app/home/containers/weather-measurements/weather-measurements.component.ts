import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Signal,
  inject,
} from '@angular/core';
import { CurrentWeather } from '../../../current-weather/models/current-weather.model';
import { WeatherMeasurementComponent } from '../../components/weather-measurment/weather-measurement.component';
import { ComponentState } from '../home/home.component';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { CurrentWeatherDataService } from '../../../current-weather/services/data/current-weather.data.service';
import { delay, map, tap } from 'rxjs';
import { DataState } from '../../../core/services/geolocation.service';
import { SkeletonModule } from 'primeng/skeleton';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { SignalState } from '../../../forecast/services/data/forecast.data.service';

@Component({
  selector: 'app-weather-measurements',
  standalone: true,
  imports: [
    CommonModule,
    WeatherMeasurementComponent,
    SkeletonModule,
    DialogModule,
    ButtonModule,
  ],
  templateUrl: `./weather-measurements.component.html`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WeatherMeasurementsComponent {
  private readonly currentWeatherDataService = inject(
    CurrentWeatherDataService
  );

  weather: Signal<ComponentState<CurrentWeather>> = toSignal(
    toObservable(this.currentWeatherDataService.currentWeather).pipe(
      delay(300),
      tap(data => console.log('Raw data', data)),
      map(
        (data: SignalState<CurrentWeather>) =>
          ({
            data: data.data,
            state: data.state,
          }) as ComponentState<CurrentWeather>
      )
    ),
    {
      initialValue: {
        state: DataState.UNDEFINED,
      } as ComponentState<CurrentWeather>,
    }
  );

  protected DataState = DataState;

  visible: boolean = false;

  showDialog() {
    this.visible = true;
  }
}
