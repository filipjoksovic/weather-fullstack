import {
  Injectable,
  Renderer2,
  RendererFactory2,
  computed,
  signal,
} from '@angular/core';
import { CurrentWeatherApiService } from '../api/current-weather.api.service';
import {
  CurrentWeather,
  currentWeatherHeadlessResponseToCurrentWeather,
} from '../../models/current-weather.model';
import { Observable, map, tap } from 'rxjs';
import { toObservable } from '@angular/core/rxjs-interop';
import { GeoLocationService } from '@core/services/geolocation.service';
import { DataState } from '@core/models/data.state.enum';
import { SignalState } from '@core/models/signal-state';

//TODO split responsibilities into smaller services
@Injectable({
  providedIn: 'root',
})
export class CurrentWeatherDataService {
  private renderer: Renderer2;
  constructor(
    private currentWeatherApiService: CurrentWeatherApiService,
    private readonly geoLocationService: GeoLocationService,
    private readonly rendererFactory: RendererFactory2
  ) {
    this.renderer = rendererFactory.createRenderer(null, null);
    toObservable(this.location).subscribe(location => {
      if (location) {
        this.getCurrentWeather(location.longitude, location.latitude).subscribe(
          data => console.log('Current weather', data)
        );
      }
    });
  }

  private location = computed(() => {
    const locationSignal = this.geoLocationService.currentLocation();
    if (locationSignal.loadingState === DataState.LOADED) {
      return locationSignal.coords;
    }
    return null;
  });

  public currentWeather = signal<SignalState<CurrentWeather>>({
    state: DataState.UNDEFINED,
  } as SignalState<CurrentWeather>);

  public getCurrentWeather(
    longitude: number,
    latitude: number
  ): Observable<CurrentWeather> {
    this.currentWeather.set({
      state: DataState.LOADING,
      data: null,
    } as SignalState<CurrentWeather>);

    return this.currentWeatherApiService
      .getCurrentWeather(longitude, latitude)
      .pipe(
        map(currentWeatherHeadlessResponseToCurrentWeather),
        tap(data => {
          const temperature = data.measurements.find(
            m => m.key === 'temperature'
          );
          if (Number(temperature?.value) > 50) {
            this.renderer.addClass(
              document.querySelector('app-home-routing'),
              'hot'
            );
          } else {
            this.renderer.addClass(
              document.querySelector('app-home-routing'),
              'cold'
            );
          }
        }),
        tap({
          next: (data: CurrentWeather) =>
            this.currentWeather.set({
              state: DataState.LOADED,
              data,
            } as SignalState<CurrentWeather>),
          error: () =>
            this.currentWeather.set({
              state: DataState.ERROR,
              data: null,
            } as SignalState<CurrentWeather>),
        })
      );
  }
}
