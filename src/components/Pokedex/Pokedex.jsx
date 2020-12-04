
import {getFullImage} from '../../helpers'
import "../../App.css";
import '../../PokemonColors.css'
import { Link } from "react-router-dom";
import { Grid, Button } from "@material-ui/core";
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

  // useEffect(() => {
  //   document.body.style.backgroundColor = 'white'
  // }, []);

  return (
    <>
      <Grid item xs={12} md={9} lg={6} className={classes.pokedexContainer}>
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
                <Grid className={`${pokemon.types[0].type.name} card`}>
                  <div>
                    <h3 className="pokemonNumber">
                      {pokemonId(pokemon.id, 3)}
                    </h3>
                    <h1 className="pokemonName">{pokemon.name}</h1>
                  </div>
                  <img
                    className="imagen"
                    src={getFullImage(pokemon.id)}
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
                  <Link
                    to={{
                      pathname: `/pokemon/${pokemon.name}/${pokemon.id}`,
                      state: { isLogged: true },
                    }}
                  >
                    <Button variant="contained" color="secondary">See full stats</Button>
                  </Link>
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
