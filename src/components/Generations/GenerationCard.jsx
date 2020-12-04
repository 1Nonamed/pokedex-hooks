import { useState, useEffect } from "react";
import "../../App.css";
import "../../PokemonColors.css";
import { getPokemonGenData, getFullImage } from "../../helpers";
import Loader from "../../components/Loader";
import { Link } from "react-router-dom";
import { Typography, Button, Grid, makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  genContainer: {
    margin: "auto",
    paddingTop: "10px",
    paddingLeft: "20px",
    paddingRight: "20px",
    paddingBottom: "50px",
  },
});

function GenerationCard(props) {
  const classes = useStyles();
  const { generationsData } = props;
  const [pokemonsGenInfo, setPokemonGenInfo] = useState([[]]);
  const [isDataLoading, setisDataLoading] = useState(true);

  useEffect(() => {
    async function getPokemonsGenData() {
      const pokemonsGenUrls = generationsData.map((generation) => {
        return generation.pokemon_species.slice(0, 3).map((pokemon) => {
          return pokemon.url;
        });
      });
      await getAllPokemonsGenData(pokemonsGenUrls);
      setisDataLoading(false);
    }
    getPokemonsGenData();
  }, [generationsData]);

  const getAllPokemonsGenData = async (arrayUrls) => {
    const allPokemonsGenData = await Promise.all(
      arrayUrls.map(async (gen) => {
        const dataGen = await Promise.all(
          gen.map(async (url) => {
            let generationData = await getPokemonGenData(url);
            return generationData;
          })
        );
        return dataGen;
      })
    );
    setPokemonGenInfo(allPokemonsGenData);
    return allPokemonsGenData;
  };

  return (
    <>
      {isDataLoading ? (
        <Loader />
      ) : (
        <Grid item xs={12} md={9} lg={6} className={classes.genContainer}>
          <Grid container justify="center">
            {generationsData.map((generation, index) => {
              return (
                <Grid item key={generation.id} xs={12} sm={6}>
                  <Grid
                    className={`${generation.version_groups[0].name} card mh-320`}
                  >
                    <Typography variant="h4">
                      Generation {generation.id} : {generation.main_region.name}
                    </Typography>
                    <Typography variant="subtitle1" component="h5">
                      {generation.version_groups[0].name}
                    </Typography>
                    <Link
                      to={{
                        pathname: `/generations/${generation.id}`,
                      }}
                    >
                      <Button>See list of Pokemons</Button>
                    </Link>
                    <Typography variant="h5" component="h6" align="center">
                      Inital Pokemons
                    </Typography>
                    <div>
                      {generation.id === index + 1 ? (
                        <>
                          <img
                            className="pokemonDetailImg pokemonDetailImgLeft"
                            src={getFullImage(pokemonsGenInfo[index][0].id)}
                            alt={pokemonsGenInfo.id}
                          />
                          <img
                            className="pokemonDetailImg pokemonDetailImgMain"
                            src={getFullImage(pokemonsGenInfo[index][1].id)}
                            alt={pokemonsGenInfo.id}
                          />
                          <img
                            className="pokemonDetailImg pokemonDetailImgRight"
                            src={getFullImage(pokemonsGenInfo[index][2].id)}
                            alt={pokemonsGenInfo.id}
                          />
                        </>
                      ) : (
                        "Something went wrong"
                      )}
                    </div>
                  </Grid>
                </Grid>
              );
            })}
          </Grid>
        </Grid>
      )}
    </>
  );
}

export default GenerationCard;
