import { createReducer } from 'redux-act';
import * as pokemon from '../actions/pokemon';
import { IPokemon } from '../../types/types';

// /
// Здесь можно было загружать данные из кэша LocalStorage, но на это тоже немало времение ушло бы
// т.к. в ТЗ этого не было, я не стал время тратить
//
const defaultState = {
  pokemonListOnPage: [] as Array<IPokemon>,
  currentPokemon: {} as IPokemon,
  allPokemonNames: [] as Array<string>,
  searchName: '' as string,
  count: 0 as number,
};

export type AppStateType = typeof defaultState;

const reducer = createReducer<AppStateType>({}, defaultState);

reducer.on(pokemon.setCurrentPokemon, (state, currentPokemon) => ({
  ...state,
  currentPokemon: { ...currentPokemon },
}));

reducer.on(pokemon.setPokemonList, (state, pokemonList) => ({
  ...state,
  pokemonListOnPage: [...pokemonList],
}));

reducer.on(pokemon.setCountPokemons, (state, count) => ({
  ...state,
  count,
}));

reducer.on(pokemon.setAllPokemonNames, (state, names) => ({
  ...state,
  allPokemonNames: [...names],
}));

reducer.on(pokemon.setSearchName, (state, searchName) => ({
  ...state,
  searchName,
  count: state.allPokemonNames.filter((n: string) => n.includes(searchName, 0)).length,
}));

export default reducer;
