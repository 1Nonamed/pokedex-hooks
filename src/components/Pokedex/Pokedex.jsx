import { getFullImage } from "../../helpers";
import "../../App.css";
import "../../PokemonColors.css";
import { Link } from "react-router-dom";
import { Grid, Button, Typography, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  pokedexContainer: {
    margin: "auto",
    paddingTop: "50px",
    paddingLeft: "20px",
    paddingRight: "20px",
    paddingBottom: "20px",
  },
});

const getTypes = (types) => {
  const pokemonTypes = types.map((type, index) => {
    return (
      <div key={index + 1} className="type-btn">
        {/* <img src="https://cdn.bulbagarden.net/upload/8/87/GO_Flying.png" alt={type.type.name}/> */}
        <div className={"type-name"}>{type.type.name}</div>
      </div>
    );
  });
  return pokemonTypes;
};

const pokemonId = (number, length) => {
  let str = "" + number;
  while (str.length < length) {
    str = "0" + str;
  }
  return str;
};

const Pokedex = (props) => {
  const { pokemons, handleNextPage, handlePreviousPage } = props;
  const classes = useStyles();

  return (
    <>
      <Grid item xs={12} md={9} lg={6} className={`${classes.pokedexContainer}`}>
        <div>
          <Button variant="outlined" onClick={handlePreviousPage}>
            Preview Page
          </Button>
          <Button variant="outlined" onClick={handleNextPage}>
            Next Page
          </Button>
        </div>
        <Grid container justify="center">
          {pokemons.map((pokemon) => {
            return (
              <Grid key={pokemon.id} item xs={11} sm={6}>
                <Box className={`${pokemon.types[0].type.name} card mh-170`}>
                  <Typography variant="h6">
                    {pokemonId(pokemon.id, 3)}
                  </Typography>
                  <Typography
                    variant="h4"
                    component="h1"
                    className="pokemonName"
                  >
                    {pokemon.name}
                  </Typography>
                  <img
                    className="pokemonPokedexImg"
                    src={getFullImage(pokemon.id)}
                    alt={pokemon.name}
                  />
                  <div className="type-flex">{getTypes(pokemon.types)}</div>
                  <div className="flex-column">
                    <div>
                      <span>Height: {pokemon.height}</span>
                    </div>
                    <div>
                      <span>Weight: {pokemon.weight}</span>
                    </div>
                  </div>
                  <Link
                    to={{
                      pathname: `/pokemon/${pokemon.id}`,
                    }}
                  >
                    <Button variant="contained">See full stats</Button>
                  </Link>
                </Box>
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
