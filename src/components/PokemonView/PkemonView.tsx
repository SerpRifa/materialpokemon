import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { connect, ConnectedProps } from 'react-redux';
import {
  Dialog,
  IconButton,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { RootStateType } from '../../redux/reducers';
import Types from './Types/Types';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
  },
  sprite: {
    width: '200px',
  },
  arrow: {
    fontSize: '3rem',
    color: theme.palette.primary.main,
  },
  name: {
    marginBottom: '1rem',
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  dialog: {
    margin: 0,
    padding: theme.spacing(2),
    overflow: 'hidden',
  },
}));

type Prop = {
  open: boolean,
  onClose: Function,
};

const mapStateToProps = (state: RootStateType) => ({
  currentPokemon: state.pokemon.currentPokemon,
});

const mapDispatchToProps = {
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

const PokemonView: React.FC<Prop & PropsFromRedux> = ({ open, currentPokemon, onClose }) => {
  const classes = useStyles();
  const { name } = currentPokemon;
  const sprite = currentPokemon.sprites?.front_default as string;

  return (
    <Dialog open={open} scroll="body" onClose={() => { onClose(); }} className={classes.dialog}>
      {onClose ? (
        <IconButton className={classes.closeButton} onClick={() => { onClose(); }}>
          <CloseIcon />
        </IconButton>
      ) : null}
      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <Grid container spacing={3}>
                <Grid item xs={4}>
                  <img alt={sprite} src={sprite} className={classes.sprite} />
                </Grid>
              </Grid>
              <Typography variant="h2" className={classes.name}>{name}</Typography>
              <Types types={currentPokemon.types} />
            </Paper>
          </Grid>
        </Grid>
      </div>
    </Dialog>
  );
};

export default connector(PokemonView);
