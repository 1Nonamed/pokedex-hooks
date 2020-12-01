import React, { useState, useEffect } from "react";
import axios from "axios";
import { getAllGenerations } from "../../Api-calls";
import GenerationCard from './GenerationCard'

function PokemonGenerations() {
  const [generations, setGenerations] = useState([]);
  let urlGenerations = "https://pokeapi.co/api/v2/generation/";

  useEffect(() => {
    async function getData() {
      const response = await getAllGenerations(urlGenerations);
      const data = response.data.results
      setGenerations(data)
      console.log(data);
    }
    getData();
  }, []);

  

  const getGenerationData = async () => {
    let url = "https://pokeapi.co/api/v2/generation/2/";
    const response = await axios.get(url);
    const data = response.data;
    console.log(data);
  };

  return (
    <div>
      <h1>Aquí van las generaciones</h1>
      {generations.map((generation) => {
        return (
          <div>
            <GenerationCard />
            <div>{generation.name}</div>
            <div>{generation.url}</div>
          </div>
        );
      })}
    </div>
  );
}

export default PokemonGenerations;
