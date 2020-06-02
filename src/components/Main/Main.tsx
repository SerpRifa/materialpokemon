import * as React from 'react';
import { connect, ConnectedProps, useDispatch } from 'react-redux';
import {
  createStyles, Theme, makeStyles, CircularProgress,
} from '@material-ui/core';

import Header from '../Header';
import PokemonList from '../PokemonList';
import { RootStateType } from '../../redux/reducers';
import {
  loadPage, loadAllPokemons, setSearchName, setCurrentPokemon,
} from '../../redux/actions/pokemon';
import { setPageIndex } from '../../redux/actions/app';
import PokemonView from '../PokemonView/PkemonView';

const mapStateToProps = (state: RootStateType) => ({
  pageIndex: state.app.pageIndex,
  isFetching: state.app.isFetching,
  count: state.pokemon.count,
  pokemonListOnPage: state.pokemon.pokemonListOnPage,
});

const mapDispatchToProps = {
  loadPage,
  loadAllPokemons,
  setSearchName,
  setPageIndex,
  setCurrentPokemon,
};

const useStyles = makeStyles((theme: Theme) => createStyles({
  loader: {
    position: 'fixed',
    top: '50%',
    left: '50%',
    zIndex: 100,
  },
  blockLoader: {
    position: 'absolute',
    top: 0,
    left: 0,
    background: 'rgba(255, 255, 255, 0.7)',
    width: '100%',
    height: '100%',
    zIndex: 999999,
  },
}));

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

const Main: React.FC<PropsFromRedux> = (props) => {
  const [isOpenPokemon, setOpenPokemon] = React.useState(false);
  const {
    pageIndex, pokemonListOnPage, count, isFetching, setCurrentPokemon,
  } = props;
  const { loadPage, setSearchName } = props;
  const classes = useStyles();
  const dispatch = useDispatch();


  const countPage = Math.ceil(count / 20);

  const handleSearch = (searchName: string) => {
    setSearchName(searchName);
    loadPage(1);
  };

  const handleOpenPokemon = (pokemonName: string) => {
    const pokemon = pokemonListOnPage.find((p) => p.name === pokemonName);
    setCurrentPokemon(pokemon);
    setOpenPokemon(true);
  };

  const handleClose = () => {
    setOpenPokemon(false);
  };

  React.useEffect(() => {
    dispatch(loadAllPokemons());
  }, []);

  return (
    <>
      {isFetching && <div className={classes.blockLoader}><CircularProgress className={classes.loader} /></div>}
      <Header onSearch={handleSearch} />
      <PokemonList
        pokemonList={pokemonListOnPage}
        onOpenPokemon={handleOpenPokemon}
        pageIndex={pageIndex}
        countPage={countPage}
        setPage={loadPage}
      />
      <PokemonView open={isOpenPokemon} onClose={handleClose} />
    </>
  );
};

export default connector(Main);
