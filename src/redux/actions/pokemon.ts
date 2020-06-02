import { createAction } from 'redux-act';

type Pokemon = any;

export const loadPage = createAction<number>('loadPage');
export const loadPokemon = createAction<number>('loadPokemon');
export const loadAllPokemons = createAction('loadPokemon');
export const setAllPokemonNames = createAction<Array<string>>('setAllPokemonNames');
export const searchPokemon = createAction<string>('searchPokemon');

export const loadCount = createAction('loadCount');

export const setPokemonList = createAction<Array<any>>('setPokemonList');
export const setCurrentPokemon = createAction<Pokemon>('setPokemonList');
export const setSearchName = createAction<string>('setSearchName');

export const setCountPokemons = createAction<number>('setPokemonList');
