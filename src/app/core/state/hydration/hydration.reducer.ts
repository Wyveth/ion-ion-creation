import { Action, ActionReducer } from '@ngrx/store';
import * as HydrationActions from './hydration.action';
import { State } from '../core.state';

function isHydrateSuccessAction(
  action: Action,
): action is ReturnType<typeof HydrationActions.hydrateSuccess> {
  return action.type === HydrationActions.hydrateSuccess.type;
}

export const hydrationMetaReducer = (
  reducer: ActionReducer<State>,
): ActionReducer<State> => {
  return (state, action) => {
    if (isHydrateSuccessAction(action)) {
      return action.state;
    } else {
      return reducer(state, action);
    }
  };
};
