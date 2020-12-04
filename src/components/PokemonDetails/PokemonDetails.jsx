import React, { useState, useEffect } from "react";
import axios from "axios";
import Loader from "../Loader";
import {
  getEvolutionChain,
  getFullImage,
  getStats,
  getAbilities,
  getTypes,
  fn,
} from "../../helpers";
import { useParams } from "react-router-dom";
import Pagination from "../../components/Pagination";

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

      // getIds()
      document.body.style.backgroundColor = fn(
        responseStats.data.types[0].type.name
      );
      setisDataLoading(false);
    }
    getPokemonData();
  }, [pokemonId]);

  
  // const getIds = async () => {
  //   const res1 = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonEvolution.evolves_to[0].species.name}`);

  //   console.log(res1.data.id);
  // };

  return (
    <>
      {isDataLoading ? (
        <Loader />
      ) : (
        <div style={{ padding: 50 + "px" }}>
          <Pagination id={pokemonStats.id} totalPokemons={totalPokemons} />
          <h1>{pokemonStats.id}</h1>
          <h1>{pokemonStats.name}</h1>
          <h2>{pokemonData.names[0].name}</h2>
          <img src={getFullImage(pokemonStats.id)} alt={pokemonStats.name} />
          <h4>Abilities</h4>
          {getAbilities(pokemonStats.abilities)}
          <h4>Stats</h4>
          {getStats(pokemonStats.stats)}
          <h4>Types</h4>
          {getTypes(pokemonStats.types)}
          <h2>Evolution Chain</h2>
          <h4>Base Form</h4>
          <div>{pokemonEvolution.species.name}</div>
          <h4>Evolution 1</h4>
          <div>{pokemonEvolution.evolves_to[0].species.name}</div>
          <div>
            {pokemonEvolution.evolves_to[0].evolution_details[0].min_level}
          </div>
          <div>
            {pokemonEvolution.evolves_to[0].evolution_details[0].trigger.name}
          </div>
          <h4>Evolution 2</h4>
          {pokemonEvolution.evolves_to[0].evolves_to.length > 0 ? (
            <div>
              <div>
                {pokemonEvolution.evolves_to[0].evolves_to[0].species.name}
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
            </div>
          ) : null}
          <Pagination id={pokemonStats.id} totalPokemons={totalPokemons} />
        </div>
      )}
    </>
  );
};

export default PokemonDetails;
