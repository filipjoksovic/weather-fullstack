import { CommonModule } from '@angular/common';
import {
  Component,
  OnInit,
  WritableSignal,
  computed,
  effect,
  inject,
} from '@angular/core';
import { ForecastDetailsService } from '../../services/data/forecast-details.service';
import { DialogModule } from 'primeng/dialog';
import { FormsModule } from '@angular/forms';
import {
  ForecastMeasurement,
  ForecastWeather,
} from '../../../forecast/models/forecast-weather.model';
import { ChartModule } from 'primeng/chart';

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
  measurementData = computed(
    () =>
      this.forecastDetailsService.measurementData()?.daily.temperature_2m_max ??
      []
  );
  showModalValue = false;

  constructor() {
    effect(() => {
      console.log('Here');
      this.showModalValue = this.showModal();
      this.data.datasets = [
        {
          label: 'first',
          data: this.measurementData(),
          fill: false,
          borderColor: getComputedStyle(
            document.documentElement
          ).getPropertyValue('--blue-500'),
          tension: 0.4,
        },
      ];
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
