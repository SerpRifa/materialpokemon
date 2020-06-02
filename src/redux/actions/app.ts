import { createAction } from 'redux-act';

export const beginFetch = createAction('beginFetch');
export const endFetch = createAction('endFetch');

export const setPageIndex = createAction<number>('setPageIndex');
