import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import {
  CardActionArea, CardContent, Typography, Paper, Divider,
} from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    width: 250,
    padding: 5,
  },
  title: {
    marginBottom: 16,
    fontSize: 14,
  },
});

type Props = {
  name: string;
  url: string | null;
  id: number,
  onClick?: (name: string) => void
};

const PokemonItem: React.FC<Props> = ({
  name, url, id, onClick,
}) => {
  const classes = useStyles();


  const handleClick = () => {
    onClick && onClick(name);
  };

  return (
    <Card className={classes.root}>
      <Paper>
        <CardActionArea onClick={handleClick}>
          <CardMedia
            component="img"
            height="250"
            image={url || ''}
            title={name}
          />
          <Divider light />
          <CardContent>
            <Typography className={classes.title} color="textSecondary">
              №
              {' '}
              {id}
            </Typography>
            <Typography gutterBottom variant="h5" component="h2">
              {name}
            </Typography>
          </CardContent>

        </CardActionArea>
      </Paper>
    </Card>
  );
};

export default PokemonItem;
