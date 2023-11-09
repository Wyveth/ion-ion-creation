import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType, OnInitEffects } from '@ngrx/effects';
import * as HydrationActions from './hydration.action';
import { distinctUntilChanged, map, switchMap, tap } from 'rxjs';
import { Action, Store } from '@ngrx/store';
import { State } from '../core.state';

@Injectable()
export class HydrationEffects implements OnInitEffects {
  hydrate$ = createEffect(() =>
    this.action$.pipe(
      ofType(HydrationActions.hydrate),
      map(() => {
        const storageValue = sessionStorage.getItem('state');
        if (storageValue) {
          try {
            const state = JSON.parse(storageValue);
            return HydrationActions.hydrateSuccess({ state });
          } catch {
            sessionStorage.removeItem('state');
          }
        }
        return HydrationActions.hydrateFailure();
      })
    ),
  );

  serialize$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(
          HydrationActions.hydrateSuccess,
          HydrationActions.hydrateFailure,
        ),
        switchMap(() => this.store),
        distinctUntilChanged(),
        tap((state) => sessionStorage.setItem('state', JSON.stringify(state))),
      ),
    { dispatch: false },
  );

  constructor(
    private action$: Actions,
    private store: Store<State>,
  ) {}

  ngrxOnInitEffects(): Action {
    return { type: HydrationActions.hydrate.type };
  }
}
