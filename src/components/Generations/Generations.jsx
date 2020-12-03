import React, { useState, useEffect } from "react";
import axios from "axios";
import { getAllGenerations, getGenerationData } from "../../Api-calls";
import GenerationCard from "./GenerationCard";
import Loader from "../../components/Loader";

function PokemonGenerations() {
  const [generationsData, setGenerationsData] = useState([
    { names: [{ languaje: "" }, { name: "Pokemon" }] },
  ]);
  const [isDataLoading, setisDataLoading] = useState(true);

  let urlGenerations = "https://pokeapi.co/api/v2/generation/";

  useEffect(() => {
    async function getData() {
      const response = await getAllGenerations(urlGenerations);
      const data = response.data.results;
      await getAllGenerationsData(data);
      setisDataLoading(false);
    }
    getData();
  }, [urlGenerations]);

  const getAllGenerationsData = async (data) => {
    const allGenerationsData = await Promise.all(
      data.map(async (gen) => {
        let generationData = await getGenerationData(gen.url);
        return generationData;
      })
    );
    setGenerationsData(allGenerationsData);
  };

  return (
    <div>
      {isDataLoading ? (
        <Loader />
      ) : (
        <>
          <h1>Aquí van las generaciones</h1>
          <GenerationCard generationsData={generationsData} />
        </>
      )}
    </div>
  );
}

export default PokemonGenerations;
