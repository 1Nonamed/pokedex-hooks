import React, { useEffect, useState } from "react";
import "../../App.css";
import axios from "axios";
import Grid from "@material-ui/core/Grid";
import { Card, CardContent, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  pokedexContainer: {
    margin: "auto",
    paddingTop: "50px",
    paddingLeft: "20px",
    paddingRight: "20px",
    paddingBottom: "20px",
  },
  cardSpacing: {
    padding: "10px",
  },
  moreSpacing: {
    marginBottom: "60px",
    display: "flex",
    justifyContent: "space-around",
  },
});

const getIdAsNumber = (id) => {
  let pokemonId = 0;

  id < 10
    ? (pokemonId = `00${id}`)
    : id < 100
    ? (pokemonId = `0${id}`)
    : (pokemonId = { id });

  return pokemonId;
};

const getImage = (id) => {
  let pokemonImg = "";
  id < 10
    ? (pokemonImg = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/00${id}.png`)
    : id < 100
    ? (pokemonImg = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/0${id}.png`)
    : (pokemonImg = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${id}.png`);
  return pokemonImg;
};

const getTypes = (types) => {
  const pokemonTypes = types.map((type) => {
    return (
      <div className="type-btn">
        <div className="type-name">{type.type.name}</div>
      </div>
    );
  });
  return pokemonTypes;
};

// OBTENER STATS NO BORRAR - FUNCIONA
// const getStats = (stats) => {
//   console.log(stats);
//   const pokemonStats = stats.map((stat, i) => {
//     return (
//       <div key={i + 1}>
//         <div>
//           {stat.stat.name} : {stat.base_stat}
//         </div>
//       </div>
//     );
//   });
//   return pokemonStats;
// };

const Pokedex = (props) => {
  const { pokemons, handleNextPage, handlePreviousPage } = props;
  console.log(props);
  const classes = useStyles();

  // useEffect(() => {
  //   document.body.style.backgroundColor = 'white'
  // }, []);

  return (
    <>
      <Grid item xs={12} className={classes.pokedexContainer}>
        <div>
          <Button variant="outlined" onClick={handlePreviousPage}>
            Preview Page
          </Button>
          <Button variant="outlined" onClick={handleNextPage}>
            Next Page
          </Button>
        </div>
        <Grid container spacing={2}>
          {pokemons.map((pokemon) => {
            return (
              <Grid key={pokemon.id} item xs={12} sm={6}>
                <Grid className={`${pokemon.types[0].type.name} card`}>
                  <div>
                    <h3 className="pokemonNumber">
                      {/* # {getIdAsNumber(pokemon.id)} */}#{pokemon.id}
                    </h3>
                    <h1 className="pokemonName">{pokemon.name}</h1>
                  </div>
                  <img
                    className="imagen"
                    src={getImage(pokemon.id)}
                    alt={pokemon.name}
                  />

                  {/* <div>{getName()}</div> */}

                  <div className="type-flex">{getTypes(pokemon.types)}</div>
                  {/* {getStats(pokemon.stats)} */}
                  <div className="flex-column">
                    <div>
                      <span>Height: {pokemon.height}</span>
                    </div>
                    <div>
                      <span>Weight: {pokemon.weight}</span>
                    </div>
                  </div>
                  <Button>See full stats</Button>
                </Grid>
              </Grid>
            );
          })}
        </Grid>
        <div>
          <Button variant="outlined" onClick={handlePreviousPage}>
            Preview Page
          </Button>
          <Button variant="outlined" onClick={handleNextPage}>
            Next Page
          </Button>
        </div>
      </Grid>
    </>
  );
};

export default Pokedex;
