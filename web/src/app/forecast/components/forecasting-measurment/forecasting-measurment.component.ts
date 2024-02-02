import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  ViewChild,
  effect,
  inject,
} from '@angular/core';
import { SliderModule } from 'primeng/slider';
import { FormsModule } from '@angular/forms';
import { UnitValueToStringPipe } from '../../../core/pipes/unit-value-to-string.pipe';
import { DayOfWeekPipe } from '../../../core/pipes/day-of-week.pipe';
import { format, isToday } from 'date-fns';
import { ForecastMeasurement } from '../../../forecast/models/forecast-weather.model';
import { WeatherIconComponent } from '../../../core/components/weather-icon/weather-icon.component';
import { OverlayModule } from 'primeng/overlay';
import { OverlayPanel, OverlayPanelModule } from 'primeng/overlaypanel';
import { ForecastDataService } from '@forecast/services/data/forecast.data.service';
import { ChartModule } from 'primeng/chart';
import {
  ForecastDetailsRequestParams,
  dailyForecastParamsToText,
} from 'app/forecast-details/models/api/request/forecast-details-request.params';
import {
  ForecastWeatherResponse,
  ForecastWeatherResponseUnits,
} from '@forecast/models/api/response/forecast-weather-response';
import { DataState } from '@core/models/data.state.enum';

@Component({
  selector: 'app-forecasting-measurement',
  standalone: true,
  templateUrl: './forecasting-measurment.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    SliderModule,
    FormsModule,
    UnitValueToStringPipe,
    DayOfWeekPipe,
    WeatherIconComponent,
    OverlayModule,
    OverlayPanelModule,
    ChartModule,
  ],
})
export class ForecastingMeasurementComponent implements OnInit {
  private readonly forecastService: ForecastDataService =
    inject(ForecastDataService);
  DataState = DataState;

  constructor() {
    effect(() => {
      if (this.hourlyForecast().state === 'LOADED') {
        this.data = Object.keys(this.hourlyForecast().data.hourly_units)
          .filter(
            key =>
              dailyForecastParamsToText[
                key as any as ForecastDetailsRequestParams
              ] !== undefined
          )
          .map((key: any) => {
            return {
              labels: this.hourlyForecast().data.hourly.time.map(x =>
                format(x.toString(), 'HH:mm')
              ),
              datasets: [
                {
                  label:
                    dailyForecastParamsToText[
                      key as any as ForecastDetailsRequestParams
                    ],
                  labels: [
                    dailyForecastParamsToText[
                      key as any as ForecastDetailsRequestParams
                    ],
                  ],
                  data:
                    (this.hourlyForecast().data.hourly[
                      key as any as ForecastDetailsRequestParams
                    ] as number[]) ?? [],
                  fill: false,
                  borderColor: '#4bc0c0',
                  tension: 0.1,
                },
              ],
            };
          });

        // {
        //   labels: this.hourlyForecast().data.hourly.time.map(x =>
        //     format(x.toString(), 'HH:mm')
        //   ),
        //   datasets: Object.keys(this.hourlyForecast().data.hourly_units).filter(
        //       key =>
        //         dailyForecastParamsToText[
        //           key as any as ForecastDetailsRequestParams
        //         ] !== undefined
        //     ).map((key: any) => {
        //       return {
        //         label:
        //           dailyForecastParamsToText[
        //             key as any as ForecastDetailsRequestParams
        //           ],
        //         data:
        //           this.hourlyForecast().data.hourly[
        //             key as any as ForecastDetailsRequestParams
        //           ] ?? [],
        //         fill: false,
        //         borderColor: '#4bc0c0',
        //         tension: 0.1,
        //       };
        //     })
        //     // .filter(
        //     //   key =>
        //     //     dailyForecastParamsToText[
        //     //       key as any as ForecastDetailsRequestParams
        //     //     ] !== undefined
        //     // )
        //     // .map((key: any) => {
        //     //   console.log(key);
        //     //   return {
        //     //     label:
        //     //       dailyForecastParamsToText[
        //     //         key as any as ForecastDetailsRequestParams
        //     //       ],
        //     //     data:
        //     //       this.hourlyForecast().data.hourly[
        //     //         key as any as ForecastDetailsRequestParams
        //     //       ] ?? [],
        //     //     fill: false,
        //     //     borderColor: '#4bc0c0',
        //     //     tension: 0.1,
        //     //   };
        //     // }),
        // };
      }
    });
  }

  @Input({ required: true })
  measurement!: ForecastMeasurement;

  @ViewChild('op') op!: OverlayPanel;

  public isToday: boolean = false;
  public hourlyForecast = this.forecastService.hourlyForecast;
  ngOnInit(): void {
    this.isToday = isToday(new Date(this.measurement.date));

    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue(
      '--text-color-secondary'
    );
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    this.options = {
      maintainAspectRatio: false,
      aspectRatio: 0.6,
      plugins: {
        legend: {
          labels: {
            color: textColor,
          },
        },
      },
      interaction: {
        intersect: false,
        mode: 'index',
      },
      scales: {
        x: {
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false,
          },
        },
        y: {
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false,
          },
        },
      },
    };
  }

  openOverlay(event: Event) {
    this.op.toggle(event);
    this.forecastService.getHourlyForecasting(0, 0, new Date()).subscribe();
  }

  options!: {
    maintainAspectRatio: boolean;
    aspectRatio: number;
    plugins: { legend: { labels: { color: string } } };
    scales: {
      x: {
        ticks: { color: string };
        grid: { color: string; drawBorder: boolean };
      };
      y: {
        ticks: { color: string };
        grid: { color: string; drawBorder: boolean };
      };
    };
    interaction: {
      intersect: boolean;
      mode: string;
    };
  };
  data!: {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      fill: boolean;
      borderColor: string;
      tension: number;
    }[];
  }[];
}
