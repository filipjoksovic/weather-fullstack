import { Component, inject } from '@angular/core';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { LocationService } from '../../../core/services/location.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-location-search',
  standalone: true,
  imports: [AutoCompleteModule, ButtonModule, TooltipModule],
  templateUrl: './location-search.component.html',
  providers: [MessageService],
})
export class LocationSearchComponent {
  private readonly locationService = inject(LocationService);
  getLocation() {
    this.locationService.getLocation();
  }
}
