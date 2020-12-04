import { useState, useEffect } from "react";
import { getAllGenerations, getGenerationData } from "../../helpers";
import GenerationCard from "./GenerationCard";
import Loader from "../../components/Loader";
import { Grid, Typography } from "@material-ui/core";
import "../../App.css";

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
          <Typography variant="h2" color="secondary" align="center" gutterBottom>
            Pokemon Generations
          </Typography>
          <GenerationCard generationsData={generationsData} />
        </>
      )}
    </div>
  );
}

export default PokemonGenerations;
