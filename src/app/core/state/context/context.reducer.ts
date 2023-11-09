import { createReducer, on } from '@ngrx/store';
import { init, updateUrlRedirect } from './context.actions';
import { initialState } from './context.state';

const contextReducer = createReducer(
  initialState,
  on(
    updateUrlRedirect,
    (state, { urlRedirect }: ReturnType<typeof updateUrlRedirect>) => ({
      ...state,
      urlRedirect,
    }),
  ),
  on(init, (state) => ({ ...state, ...initialState })),
);
