import { Button } from "@material-ui/core";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import Loader from "../Loader";
import Navbar from "../Navbar/Navbar";

function GenerationListPokemons() {
  let location = useLocation();
  console.log(location.state.generationName);
  const { generationId } = useParams();
  console.log(generationId);
  const [generationData, setGenerationData] = useState([]);
  const [isDataLoading, setisDataLoading] = useState(true);

  useEffect(() => {
    async function getGenerationData() {
      const res = await axios.get(
        `https://pokeapi.co/api/v2/generation/${generationId}/`
      );
      console.log(res.data);
      setGenerationData(res.data);
      setisDataLoading(false);
      document.body.style.backgroundColor = "#f5f2ef";
    }
    getGenerationData();
  }, [generationId]);
  return (
    <>
      {isDataLoading ? (
        <Loader />
      ) : (
        <div>
          <h1>Soy la lista de pokemones de esta generación</h1>
          {generationData.pokemon_species.map((pokemon) => {
            return (
              <ul>
                <Link
                  to={{
                    pathname: `/pokemon/${pokemon.name}`,
                  }}
                >
                  <Button variant="contained">{pokemon.name}</Button>
                </Link>
              </ul>
            );
          })}
        </div>
      )}
    </>
  );
}
export default GenerationListPokemons;
