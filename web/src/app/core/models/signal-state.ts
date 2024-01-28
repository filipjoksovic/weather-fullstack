import { DataState } from '@core/models/data.state.enum';

export type SignalLoadingState = {
  state: DataState.LOADING;
  data: never;
};

export type SignalLoadedState<T> = {
  state: DataState.LOADED;
  data: T;
};

export type SignalErrorState = {
  state: DataState.ERROR;
  data: never;
};

export type SignalUndefinedState = {
  state: DataState.UNDEFINED;
  data: never;
};

export type SignalState<T> =
  | SignalLoadingState
  | SignalLoadedState<T>
  | SignalErrorState
  | SignalUndefinedState;
