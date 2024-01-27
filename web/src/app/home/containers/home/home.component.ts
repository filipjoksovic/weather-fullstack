import { Component } from '@angular/core';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { LocationSearchComponent } from '../../components/location-search/location-search.component';
import { MessageService } from 'primeng/api';
import { SelectedLocationComponent } from '../../components/selected-location/selected-location.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    AutoCompleteModule,
    ButtonModule,
    TooltipModule,
    LocationSearchComponent,
    SelectedLocationComponent,
  ],
  providers: [MessageService],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
