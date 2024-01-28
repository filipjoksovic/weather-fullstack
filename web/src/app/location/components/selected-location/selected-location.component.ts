import {
  Component,
  Signal,
  computed,
  effect,
  inject,
  signal,
} from '@angular/core';
import {
  DataState,
  GeoLocationService,
} from '../../../core/services/geolocation.service';
import { ProgressBarModule } from 'primeng/progressbar';
import { debouncedSignal } from '../../../util/debounced-signal';

@Component({
  selector: 'app-selected-location',
  standalone: true,
  imports: [ProgressBarModule],
  templateUrl: './selected-location.component.html',
})
export class SelectedLocationComponent {
  private readonly locationService = inject(GeoLocationService);
  private currentLocation = this.locationService.currentLocation;

  currentCoords = computed(() => this.currentLocation().coords);
  locationDataState = debouncedSignal(
    computed(() => this.currentLocation().loadingState),
    250
  );

  protected DataState = DataState;
}
