import { Context } from '../../models/context.model';

export type ContextState = Context;

export const initialState: ContextState = {
  urlRedirect: null,
};
