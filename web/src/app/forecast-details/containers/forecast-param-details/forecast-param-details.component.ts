import { CommonModule } from '@angular/common';
import { Component, OnInit, computed, effect, inject } from '@angular/core';
import { ForecastDetailsService } from '../../services/data/forecast-details.service';
import { DialogModule } from 'primeng/dialog';
import { FormsModule } from '@angular/forms';
import {} from '../../../forecast/models/forecast-weather.model';
import { ChartModule } from 'primeng/chart';
import { format } from 'date-fns';
import {
  currentWeatherModelKeyToDailyForecastParams,
  dailyForecastParamsToText,
} from '../../models/api/request/forecast-details-request.params';

//TODO remove tech debt
@Component({
  selector: 'app-forecast-param-details',
  standalone: true,
  imports: [CommonModule, DialogModule, FormsModule, ChartModule],
  templateUrl: './forecast-param-details.component.html',
})
export class ForecastParamDetailsComponent implements OnInit {
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
  };
  dialogClosed() {
    this.forecastDetailsService.showDialog.set(false);
  }
  forecastDetailsService = inject(ForecastDetailsService);

  showModal = computed(() => this.forecastDetailsService.showDialog());
  activeParameter = computed(() => {
    return this.forecastDetailsService.measurementData().activeParameter;
  });
  measurementData = computed(() => {
    if (this.activeParameter()) {
      return {
        measurements:
          currentWeatherModelKeyToDailyForecastParams[
            this.activeParameter()
          ].map((key: string) => {
            return (
              //@ts-ignore
              this.forecastDetailsService.measurementData().data?.daily[key] ??
              []
            );
          }) ?? [],

        dates:
          this.forecastDetailsService.measurementData().data?.daily.time ?? [],
      };
    }
    return { measurements: [], dates: [] };
  });
  showModalValue = false;

  constructor() {
    effect(() => {
      this.showModalValue = this.showModal();
      this.data.labels = this.measurementData().dates.map(date =>
        format(date, 'EEEE')
      );
      this.data.datasets = this.measurementData().measurements.map(
        (measurement: number[], index: number) => {
          return {
            label:
              dailyForecastParamsToText[
                currentWeatherModelKeyToDailyForecastParams[
                  this.activeParameter()
                ][index]
              ],
            data: measurement,
            borderColor: currentWeatherModelKeyToDailyForecastParams[
              this.activeParameter()
            ][index].includes('max')
              ? getComputedStyle(document.documentElement).getPropertyValue(
                  '--red-500'
                ) + '66'
              : getComputedStyle(document.documentElement).getPropertyValue(
                  '--blue-500'
                ) + '66',
            tension: 0.4,
            backgroundColor: currentWeatherModelKeyToDailyForecastParams[
              this.activeParameter()
            ][index].includes('max')
              ? getComputedStyle(document.documentElement).getPropertyValue(
                  '--red-500'
                ) + '66'
              : getComputedStyle(document.documentElement).getPropertyValue(
                  '--blue-500'
                ) + '66',
            fill: true,
            fillOpacity: 0.5,
          };
        }
      );
    });
  }

  ngOnInit(): void {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue(
      '--text-color-secondary'
    );
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    this.data = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          label: 'First Dataset',
          data: [65, 59, 80, 81, 56, 55, 40],
          fill: false,
          borderColor: documentStyle.getPropertyValue('--blue-500'),
          tension: 0.4,
        },
        {
          label: 'Second Dataset',
          data: [28, 48, 40, 19, 86, 27, 90],
          fill: false,
          borderColor: documentStyle.getPropertyValue('--pink-500'),
          tension: 0.4,
        },
      ],
    };

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
}
