import { DataState } from '@core/models/data.state.enum';
import { CurrentWeatherModelKeys } from '@current-weather/models/cw-req-keys.map';
import { ForecastWeatherResponse } from '@forecast/models/api/response/forecast-weather-response';

export type ForecastDetailsInitialState = {
  state: DataState.UNDEFINED;
  activeParameter: never;
  data: never;
};

export type ForecastDetailsLoadingState = {
  state: DataState.LOADING;
  activeParameter: CurrentWeatherModelKeys;
  data: never;
};

export type ForecastDetailsLoadedState = {
  state: DataState.LOADED;
  activeParameter: CurrentWeatherModelKeys;
  data: ForecastWeatherResponse;
};

export type ForecastDetailsErrorState = {
  state: DataState.ERROR;
  activeParameter: CurrentWeatherModelKeys;
  data: never;
  error: string;
};
export type ForecastDetailsState =
  | ForecastDetailsInitialState
  | ForecastDetailsLoadingState
  | ForecastDetailsLoadedState
  | ForecastDetailsErrorState;
