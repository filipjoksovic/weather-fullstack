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
import { TooltipModule } from 'primeng/tooltip';

@Component({
  selector: 'app-weather-icon',
  standalone: true,
  imports: [CommonModule, TooltipModule],
  templateUrl: './weather-icon.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WeatherIconComponent implements OnInit {
  @Input({ required: true })
  public weatherCode!: WeatherCode;

  @Input({ required: false })
  public displayTooltip: boolean = false;

  public weatherIconConfig!: WeatherConfig;

  public ngOnInit(): void {
    this.weatherIconConfig = WeatherCodeConfig[this.weatherCode];
  }
}
