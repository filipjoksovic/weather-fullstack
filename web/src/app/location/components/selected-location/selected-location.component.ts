import {
  Component,
  Signal,
  computed,
  effect,
  inject,
  signal,
} from '@angular/core';
import { ProgressBarModule } from 'primeng/progressbar';
import { debouncedSignal } from '../../../util/debounced-signal';
import { GeoLocationService } from '@core/services/geolocation.service';
import { DataState } from '@core/models/data.state.enum';

@Component({
  selector: 'app-selected-location',
  standalone: true,
  imports: [ProgressBarModule],
  templateUrl: './selected-location.component.html',
})
export class SelectedLocationComponent {
  private readonly locationService = inject(GeoLocationService);
  private currentLocation = this.locationService.currentLocation;

  currentCoords = computed(() => this.currentLocation().data);
  locationDataState = debouncedSignal(
    computed(() => this.currentLocation().state),
    250
  );

  protected DataState = DataState;
}
