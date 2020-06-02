import * as React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';
import { GridList, GridListTile } from '@material-ui/core';
import PokemonItem from './PokemonItem';
import { IPokemon } from '../../types/types';

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
    paddingTop: 24,
    paddingBottom: 24,
  },
  gridList: {
    width: '100%',
  },
  gridListTile: {
    display: 'flex',
    justifyContent: 'center',
    minHeight: '400px',
    width: '250px',
    overflow: 'hidden',
    height: '100% !important',
  },
  pagination: {
    display: 'flex',
    justifyContent: 'center',
    padding: 8,
  },
}));

type Props = {
  pokemonList: Array<IPokemon>;
  pageIndex: number;
  countPage: number;
  setPage?: (pageIndex: number) => void;
  onOpenPokemon?: (pokemonName: string) => void;
};

const PokemonList: React.FC<Props> = ({
  pokemonList, pageIndex, countPage, setPage, onOpenPokemon,
}) => {
  const classes = useStyles();

  const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage && setPage(value);
  };

  return (
    <div className={classes.root}>
      <div className={classes.pagination}>
        <Pagination count={countPage} size="large" page={pageIndex} onChange={handleChangePage} />
      </div>
      <GridList cols={3} className={classes.gridList}>
        {pokemonList.map((n) => (
          <GridListTile key={n.name} className={classes.gridListTile}>
            <PokemonItem name={n.name} url={n.sprites.front_default} id={n.id} onClick={onOpenPokemon} />
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
};

export default PokemonList;
