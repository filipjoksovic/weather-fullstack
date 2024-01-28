import { DataState } from './data.state.enum';

export type ComponentLoadingState = {
  state: DataState.LOADING;
  data: never;
};

export type ComponentLoadedState<T> = {
  state: DataState.LOADED;
  data: T;
};

export type ComponentErrorState<T> = {
  state: DataState.ERROR;
  error: T;
  data: never;
};

export type ComponentUndefinedState = {
  state: DataState.UNDEFINED;
  data: never;
};

export type ComponentState<T> =
  | ComponentLoadingState
  | ComponentLoadedState<T>
  | ComponentErrorState<T>
  | ComponentUndefinedState;
