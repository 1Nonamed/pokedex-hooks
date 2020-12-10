import React, { useState, useEffect } from "react";
import "../../App.css";
import "../../PokemonColors.css";
import axios from "axios";
import Loader from "../Loader";
import {
  getEvolutionChain,
  getFullImage,
  getDetailImage,
  // getFirstEvo,
  getAbilities,
  // getTypes,
  getPokemonIdNumber,
  typeImages,
  fn,
} from "../../helpers";
import { useParams } from "react-router-dom";
import Pagination from "../../components/Pagination";
import { Grid, Slider, Typography } from "@material-ui/core";
import Navbar from "../Navbar/Navbar";

const PokemonDetails = (props) => {
  const { totalPokemons } = props;
  let { pokemonId } = useParams();

  const [pokemonStats, setPokemonStats] = useState({});
  const [pokemonEvolution, setPokemonEvolution] = useState({});
  const [pokemonData, setPokemonData] = useState({});
  const [isDataLoading, setisDataLoading] = useState(true);

  useEffect(() => {
    async function getPokemonData() {
      const responseStats = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${pokemonId}`
      );
      setPokemonStats(responseStats.data);

      const responseData = await axios.get(
        `https://pokeapi.co/api/v2/pokemon-species/${pokemonId}`
      );
      setPokemonData(responseData.data);

      const responseEvo = await getEvolutionChain(
        responseData.data.evolution_chain.url
      );
      setPokemonEvolution(responseEvo);

      document.body.style.backgroundColor = fn(
        responseStats.data.types[0].type.name
      );
      setisDataLoading(false);
    }
    getPokemonData();
  }, [pokemonId]);

  const getTypes = (types) => {
    const pokemonTypes = types.map((type, index) => {
      return (
        <Grid key={index + 1} item xs={3}>
          <img src={typeImages[type.type.name]} alt={type.type.name} />
        </Grid>
      );
    });
    return pokemonTypes;
  };

  const getStats = (stats) => {
    const pokemonStats = stats.map((stat, i) => {
      return (
        <Grid key={i + 1} container justify="center">
          <Grid item xs={2}>
            <Typography align="left">{stat.stat.name}</Typography>
          </Grid>
          <Grid item xs={2}>
            {stat.base_stat}
          </Grid>
          <Grid item xs={8}>
            <Slider
              // className={`${stat.stat.name}`}
              style={{ color: "orange" }}
              defaultValue={stat.base_stat}
              aria-labelledby="discrete-slider"
              valueLabelDisplay="auto"
              step={10}
              min={0}
              max={120}
              disabled
            />
          </Grid>
        </Grid>
      );
    });
    return pokemonStats;
  };

  // const getBaseForm = async (name) => {
  //   return await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
  // };

  // const getFirstEvo = async (name) => {
  //   return await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
  // };

  // const getSecondEvo = async (name) => {
  //   return await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
  // };

  // console.log(pokemonStats);
  console.log(pokemonEvolution);

  return (
    <>
      {isDataLoading ? (
        <Loader />
      ) : (
        <Grid container justify="center">
          <Grid item xs={12}>
            <Grid container justify="center">
              <Pagination id={pokemonStats.id} totalPokemons={totalPokemons} />
            </Grid>
          </Grid>
          <Grid item xs={12} md={10} lg={8} className="pokemonDetailContainer">
            <Grid container justify="center">
              <Grid item xs={12}>
                <Typography variant="h3" component="h1" align="center">
                  {pokemonStats.name}
                </Typography>
                <Typography variant="h4" component="h2" align="right">
                  {getPokemonIdNumber(pokemonStats.id, 3)}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={9} lg={7}>
                <img
                  className="pokemonDetailImg"
                  src={getFullImage(pokemonStats.id)}
                  alt={pokemonStats.name}
                />
              </Grid>
              <Grid item xs={12} sm={9} lg={7}>
                <Typography variant="h2" align="center">
                  {pokemonData.names[0].name}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md={9} lg={5} style={{ backgroundColor: "white" }}>
            <Grid container justify="center">
              <Grid item xs={12} sm={9} lg={6}>
                <Typography variant="h4">Types</Typography>
                <Grid container justify="center">
                  {getTypes(pokemonStats.types)}
                </Grid>
              </Grid>
            </Grid>
            <Grid>
              <h4>Abilities</h4>
              {getAbilities(pokemonStats.abilities)}
            </Grid>
            <Grid container justify="center">
              <Grid item xs={12} sm={9} lg={6}>
                <Typography variant="h4">Stats</Typography>
                {getStats(pokemonStats.stats)}
              </Grid>
            </Grid>
            <Grid container justify="center">
              <Grid item xs={12} sm={9} lg={6}>
                <Grid container justify="center">
                  <Grid item xs={12}>
                    <h2>Evolution Chain</h2>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography variant="h6">Base Form</Typography>
                    <div>{pokemonEvolution.species.name}</div>
                    {pokemonEvolution.species.name === pokemonStats.name ? (
                      <img
                        src={getDetailImage(pokemonStats.id)}
                        alt={pokemonStats.name}
                      />
                    ) : (
                      <img src="" alt="" />
                    )}
                  </Grid>
                  <Grid item xs={4}>
                    <Typography variant="h6">Evolution 1</Typography>
                    {pokemonEvolution.evolves_to.length > 0 ? (
                      <div>
                        <div>{pokemonEvolution.evolves_to[0].species.name}</div>
                        <div>
                          {
                            pokemonEvolution.evolves_to[0].evolution_details[0]
                              .min_level
                          }
                        </div>
                        <div>
                          {
                            pokemonEvolution.evolves_to[0].evolution_details[0]
                              .trigger.name
                          }
                        </div>
                        <div>
                          {pokemonEvolution.evolves_to[0].species.name ===
                          pokemonStats.name ? (
                            <img
                              src={getDetailImage(pokemonStats.id)}
                              alt={pokemonEvolution.evolves_to[0].species.name}
                            />
                          ) : (
                            <img src="" alt="" />
                          )}
                        </div>
                      </div>
                    ) : null}
                  </Grid>

                  <Grid item xs={4}>
                    <Typography variant="h6">Evolution 2</Typography>
                    {pokemonEvolution.evolves_to.length > 0 &&
                    pokemonEvolution.evolves_to[0].evolves_to.length > 0 ? (
                      <div>
                        <div>
                          {
                            pokemonEvolution.evolves_to[0].evolves_to[0].species
                              .name
                          }
                        </div>
                        <div>
                          {
                            pokemonEvolution.evolves_to[0].evolves_to[0]
                              .evolution_details[0].min_level
                          }
                        </div>
                        <div>
                          {
                            pokemonEvolution.evolves_to[0].evolves_to[0]
                              .evolution_details[0].trigger.name
                          }
                        </div>
                        <div>
                          {pokemonEvolution.evolves_to[0].evolves_to[0].species
                            .name === pokemonStats.name ? (
                            <img
                              src={getDetailImage(pokemonStats.id)}
                              alt={pokemonStats.name}
                            />
                          ) : (
                            <img src="" alt="" />
                          )}
                        </div>
                      </div>
                    ) : null}
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default PokemonDetails;
