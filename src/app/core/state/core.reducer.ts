import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { hydrationMetaReducer } from './hydration/hydration.reducer';
import { State } from './core.state';

export const reducers: ActionReducerMap<State> = {
    hydration: hydrationMetaReducer
};

export const metaReducers: MetaReducer[] = [hydrationMetaReducer, clearState];

export function clearState(reducer: any) {
  return (state: any, action: any) => {
    if (action.type === '[State] Reset State') {
      state = undefined;
    }

    return reducer(state, action);
  };
}
