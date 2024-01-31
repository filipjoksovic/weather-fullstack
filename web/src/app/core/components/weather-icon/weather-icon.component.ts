import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import {
  WeatherCode,
  WeatherCodeConfig,
  WeatherConfig,
} from '@core/models/api/response/weather-code.enum';

@Component({
  selector: 'app-weather-icon',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './weather-icon.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WeatherIconComponent implements OnInit {
  @Input({ required: true })
  public weatherCode!: WeatherCode;

  public weatherIconConfig!: WeatherConfig;

  public ngOnInit(): void {
    this.weatherIconConfig = WeatherCodeConfig[this.weatherCode];
  }
}
