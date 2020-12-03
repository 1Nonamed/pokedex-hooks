import React, { useState, useEffect } from "react";
import axios from "axios";
import { getEvolutionChain } from "../../Api-calls";
import { useParams } from "react-router-dom";

const PokemonDetails = () => {
  let { pokemonName, pokemonId } = useParams();

  const [pokemonStats, setPokemonStats] = useState({});
  const [pokemonEvolution, setPokemonEvolution] = useState({});
  const [pokemonData, setPokemonData] = useState({
    evolution_chain: { url: "" },
    names: [].name,
  });

  useEffect(() => {
    async function getPokemonData() {
      const responseStats = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${pokemonId}`
      );
      setPokemonStats(responseStats.data);
      const responseSpecies = await axios.get(
        `https://pokeapi.co/api/v2/pokemon-species/${pokemonId}`
      );
      setPokemonData(responseSpecies.data);
      // console.log(responseStats.data);
      // console.log(responseSpecies.data);
      await getEvolutionChain();
    }
    getPokemonData();
  }, [pokemonId]);

  const getEvolutionChain = async () => {
    // const responseEvolutionChain = await axios.get(
    //   "https://pokeapi.co/api/v2/evolution-chain/130/"
    // );
    // const responseEvolutionChain = await axios.get(evolutionUrl);
    // console.log(responseEvolutionChain.data);
  };

  // const {match} = props
  // const {params} = match
  // const {pokemonId} = params

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

  return (
    <div>
      <h1>{pokemonStats.name}</h1>
      {/* <h2>{pokemonData.names[0].name}</h2> */}
    </div>
  );
};

export default PokemonDetails;
