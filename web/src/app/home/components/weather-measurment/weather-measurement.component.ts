import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  inject,
} from '@angular/core';
import { ValueUnit } from '../../../core/models/data/value-unit.type';
import { PanelModule } from 'primeng/panel';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { ForecastDetailsService } from '../../../forecast-details/services/data/forecast-details.service';
import { CurrentWeather } from '../../../current-weather/models/current-weather.model';

@Component({
  selector: 'app-weather-measurement',
  standalone: true,
  imports: [CommonModule, PanelModule, DialogModule, ButtonModule],
  templateUrl: `./weather-measurement.component.html`,
  styleUrl: './weather-measurement.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WeatherMeasurementComponent {
  private readonly forecastDetailsService = inject(ForecastDetailsService);

  measurementClicked() {
    this.forecastDetailsService.showParams('measurement');
  }
  @Input()
  icon?: string;
  @Input({ required: true })
  title!: string;
  @Input({ required: true })
  measurement!: ValueUnit<unknown, unknown>;
  @Input({ required: true })
  measurementKey!: keyof CurrentWeather;
  public isCollapsed: boolean = false;
}
