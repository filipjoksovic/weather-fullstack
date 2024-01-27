import { Component, Signal, computed, effect, inject, signal } from '@angular/core';
import {
  DataState,
  LocationService,
} from '../../../core/services/location.service';
import { ProgressBarModule } from 'primeng/progressbar';
import { debouncedSignal } from '../../../util/debounced-signal';

@Component({
  selector: 'app-selected-location',
  standalone: true,
  imports: [ProgressBarModule],
  templateUrl: './selected-location.component.html',
  styleUrl: './selected-location.component.scss',
})
export class SelectedLocationComponent {
  private readonly locationService = inject(LocationService);
  private currentLocation = this.locationService.currentLocation;

  currentCoords = computed(() => this.currentLocation().coords);
  locationDataState = debouncedSignal(computed(() => this.currentLocation().loadingState), 250);

  protected DataState = DataState;
}
