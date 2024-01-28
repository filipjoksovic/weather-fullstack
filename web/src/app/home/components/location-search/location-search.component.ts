import { Component, OnInit, computed, inject } from '@angular/core';
import {
  AutoCompleteModule,
  AutoCompleteSelectEvent,
} from 'primeng/autocomplete';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { GeoLocationService } from '../../../core/services/geolocation.service';
import { MessageService } from 'primeng/api';
import { LocationDataService } from '../../../location/services/data/location.data.service';
import { take, tap } from 'rxjs';
import { AsyncPipe, CommonModule } from '@angular/common';
import getUnicodeFlagIcon from 'country-flag-icons/unicode';

@Component({
  selector: 'app-location-search',
  standalone: true,
  imports: [
    AutoCompleteModule,
    ButtonModule,
    TooltipModule,
    AsyncPipe,
    CommonModule,
  ],
  templateUrl: './location-search.component.html',
  providers: [MessageService],
})
export class LocationSearchComponent implements OnInit {
  getFlagIcon(countryCode: string) {
    return getUnicodeFlagIcon(countryCode);
  }
  private readonly geoLocationService = inject(GeoLocationService);
  private readonly locationService = inject(LocationDataService);

  public searchResults = this.locationService.searchResults
    .asObservable()
    .pipe(tap(results => console.log('Search results', results)));

  public suggestions: any[] = [
    'Berlin',
    'Poland',
    'Warsaw',
    'Krakow',
    'Wroclaw',
    'Gdansk',
    'Poznan',
    'Lodz',
    'Szczecin',
    'Bydgoszcz',
  ];

  getLocation() {
    this.geoLocationService.getLocation();
  }

  public searchChanged(event: { originalEvent: object; query: string }): void {
    // console.log('Search changed', event);
    this.locationService.locationSearched(event.query);
    // this.suggestions = [...this.suggestions];
  }

  ngOnInit(): void {
    this.searchResults.subscribe(results => (this.suggestions = results));
  }

  countrySelected(event: AutoCompleteSelectEvent) {
    console.log('Country selected', event);
    this.locationService.locationSelected(event.value);
  }
}
