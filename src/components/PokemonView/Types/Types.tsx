import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import { TypeProps } from '../../../types/types';


const colorTypes = {
  normal: 'darkseagreen',
  fire: 'orange',
  fighting: 'darkred',
  water: 'blue',
  flying: 'bisque',
  grass: 'green',
  poison: 'purple',
  electric: 'yellow',
  ground: 'darkgoldenrod',
  psychic: 'pink',
  rock: 'darkbrown',
  ice: 'ghostwhite',
  bug: 'khaki',
  dragon: 'dodgerblue',
  ghost: 'indigo',
  dark: 'saddlebrown',
  steel: 'darkgray',
  faire: 'salmon',
};

const getColor = (name: string) => {
  const color = Object.entries(colorTypes).find((pair) => pair[0] === name);
  if (color) return color[1];
  return 'darkseagreen';
};


const useStyles = makeStyles({
  chip: {
    marginRight: '10px',
    textTransform: 'uppercase',
    color: 'white',
  },
});

type Props = {
  types: Array<TypeProps>
};

const Types: React.FC<Props> = ({ types }) => {
  const classes = useStyles();

  return (
    <>
      {types ? types.map((type, i) => {
        const { name } = type.type;
        return (
          <Chip
            className={classes.chip}
            label={name}
            style={{ backgroundColor: `${getColor(name)}` }}
          />
        );
      })
        : ''}
    </>
  );
};

export default Types;
