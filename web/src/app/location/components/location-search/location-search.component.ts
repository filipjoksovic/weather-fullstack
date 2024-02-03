import { Component, OnInit, computed, inject } from '@angular/core';
import {
  AutoCompleteModule,
  AutoCompleteSelectEvent,
} from 'primeng/autocomplete';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { GeoLocationService } from '../../../core/services/geolocation.service';
import { MessageService } from 'primeng/api';
import { LocationDataService } from '../../services/data/location.data.service';
import { take, tap } from 'rxjs';
import { AsyncPipe, CommonModule, DecimalPipe } from '@angular/common';
import getUnicodeFlagIcon from 'country-flag-icons/unicode';
import { LocationSearchResult } from 'app/location/models/api/response/location-search.response';
import { DataState } from '@core/models/data.state.enum';

@Component({
  selector: 'app-location-search',
  standalone: true,
  imports: [
    AutoCompleteModule,
    ButtonModule,
    TooltipModule,
    AsyncPipe,
    CommonModule,
    DecimalPipe,
  ],
  templateUrl: './location-search.component.html',
  providers: [MessageService],
})
export class LocationSearchComponent {
  private readonly geoLocationService = inject(GeoLocationService);
  private readonly locationService = inject(LocationDataService);

  public searchResults = this.locationService.searchResults.asObservable();
  public location = this.geoLocationService.currentLocation;

  public suggestions: LocationSearchResult[] = [];
  DataState = DataState;
  getLocation() {
    this.geoLocationService.getLocation();
  }

  public searchChanged(event: { originalEvent: object; query: string }): void {
    this.locationService.locationSearched(event.query);
  }

  ngOnInit(): void {
    this.searchResults.subscribe(results => (this.suggestions = results));
  }

  countrySelected(event: AutoCompleteSelectEvent) {
    this.geoLocationService.locationSelected(event.value);
  }

  getFlagIcon(countryCode: string) {
    return getUnicodeFlagIcon(countryCode);
  }
}
