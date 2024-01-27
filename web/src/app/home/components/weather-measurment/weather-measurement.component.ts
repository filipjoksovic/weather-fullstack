import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ValueUnit } from '../../../core/models/data/value-unit.type';
import { PanelModule } from 'primeng/panel';

@Component({
  selector: 'app-weather-measurement',
  standalone: true,
  imports: [CommonModule, PanelModule],
  templateUrl: `./weather-measurement.component.html`,
  styleUrl: './weather-measurement.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WeatherMeasurementComponent {
  @Input()
  icon?: string;
  @Input({ required: true })
  title!: string;
  @Input({ required: true })
  measurement!: ValueUnit<unknown, unknown>;

  public isCollapsed: boolean = false;
}
