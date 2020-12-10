import { useState, useEffect } from "react";
import { getAllGenerations, getGenerationData } from "../../helpers";
import GenerationCard from "./GenerationCard";
import Loader from "../../components/Loader";
import { Grid, Typography } from "@material-ui/core";
import "../../App.css";
import Navbar from "../Navbar/Navbar";

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
      document.body.style.backgroundColor = '#f5f2ef'
    }
    getData();
  }, [urlGenerations]);

  const getAllGenerationsData = async (data) => {
    const allGenerationsData = await Promise.all(
      data.map(async (gen) => {
        const generationData = await getGenerationData(gen.url);
        return generationData;
      })
    );
    setGenerationsData(allGenerationsData);
  };

  return (
    <>
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
    </>
  );
}

export default PokemonGenerations;
