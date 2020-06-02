import { createReducer } from 'redux-act';
import * as app from '../actions/app';

const defaultState = {
  isFetching: false as boolean,
  pageIndex: 1 as number,
};

export type AppStateType = typeof defaultState;

const reducer = createReducer<AppStateType>({}, defaultState);

reducer.on(app.beginFetch, (state) => ({
  ...state,
  isFetching: true,
}));

reducer.on(app.endFetch, (state) => ({
  ...state,
  isFetching: false,
}));

reducer.on(app.setPageIndex, (state, pageIndex) => ({
  ...state,
  pageIndex,
}));


export default reducer;
