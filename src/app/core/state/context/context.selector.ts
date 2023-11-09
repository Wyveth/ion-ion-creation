import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ContextState } from './context.state';

export const selectContext = createFeatureSelector<ContextState>('context');

export const selectUrlRedirect = createSelector(
  selectContext,
  (state: ContextState) => state.urlRedirect,
);
