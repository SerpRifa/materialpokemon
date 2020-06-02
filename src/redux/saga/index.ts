import { fork } from 'redux-saga/effects';
import watchFetchPokemons from './pokemon';

export default function* () {
  yield fork(watchFetchPokemons);
}
