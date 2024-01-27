import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CurrentWeather } from '../../../current-weather/models/current-weather.model';
import { WeatherMeasurementComponent } from '../../components/weather-measurment/weather-measurement.component';

@Component({
  selector: 'app-weather-measurements',
  standalone: true,
  imports: [CommonModule, WeatherMeasurementComponent],
  templateUrl: `./weather-measurements.component.html`,
  styleUrl: './weather-measurements.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WeatherMeasurementsComponent {
  @Input({ required: true })
  public weather!: CurrentWeather;
}
