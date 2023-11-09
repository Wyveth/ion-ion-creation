import { createAction, props } from '@ngrx/store';
import { Context } from '../../models/context.model';

export const patchContext = createAction(
  '[State] Patch Context',
  props<{ context: Context }>(),
);

export const updateUrlRedirect = createAction(
  '[State] Update Url Redirect',
  props<{ urlRedirect: string | null }>(),
);

export const init = createAction('[Init]');
