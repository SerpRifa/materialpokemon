import {
  put, call, takeEvery, select,
} from 'redux-saga/effects';
import Pokedex from 'pokedex-promise-v2';
import * as pokemon from '../actions/pokemon';
import * as app from '../actions/app';
import { PokemonList } from '../../types/types';

export default function* watchFetchPokemons() {
  yield takeEvery(pokemon.loadAllPokemons.getType(), asyncLoadPokemons);
  yield takeEvery(pokemon.loadPage.getType(), asyncLoadPage);
}

function* asyncLoadPokemons() {
  try {
    yield put(app.beginFetch());
    let options = { limit: 1, offset: 0 };
    const pokedex = new Pokedex();
    const requestCount: PokemonList = yield call(() => pokedex.getPokemonsList(options));
    yield put(pokemon.setCountPokemons(requestCount.count));
    options = { limit: requestCount.count, offset: 0 };
    const requestAllPokemons: PokemonList = yield call(() => pokedex.getPokemonsList(options));
    yield put(
      pokemon.setAllPokemonNames(requestAllPokemons.results.map((n) => n.name)),
    );
    yield put(pokemon.loadPage(1));
  } catch (exception) {
    console.error('asyncLoadPokemons', JSON.stringify(exception));
  } finally {
    yield put(app.endFetch());
  }
}

function* asyncLoadPage(action: any) {
  try {
    yield put(app.beginFetch());
    const pageIndex = action.payload as number;
    let allPokemonNames = yield select(
      (state) => state.pokemon.allPokemonNames,
    );
    const searchName: string = yield select((state) => state.pokemon.searchName);
    if (searchName.length > 0) {
      allPokemonNames = allPokemonNames.filter((n: string) => n.includes(searchName, 0));
    }
    const offset = (pageIndex - 1) * 20;
    const namesOnPage = allPokemonNames.filter(
      (n: string, i: number) => i >= offset && offset + 20 > i,
    );
    const pokemonlist = yield call(() => loadListPokemons(namesOnPage));
    yield put(pokemon.setPokemonList(pokemonlist));
    yield put(app.setPageIndex(pageIndex));
  } catch (exception) {
    console.error('asyncLoadPage', JSON.stringify(exception));
  } finally {
    yield put(app.endFetch());
  }
}

async function loadListPokemons(pokemonList: Array<string>) {
  const pokedex = new Pokedex();
  const rez: Array<any> = [];
  for (const pokemon of pokemonList) {
    const poke = await pokedex.getPokemonByName(pokemon);
    rez.push(poke);
  }
  return rez;
}
