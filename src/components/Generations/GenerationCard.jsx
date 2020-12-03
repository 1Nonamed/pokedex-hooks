import React, { useState, useEffect } from "react";
import "../../App.css";
import { getPokemonGenData } from "../../Api-calls";
import axios from "axios";
import Loader from "../../components/Loader";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";

function GenerationCard(props) {
  const { generationsData } = props;
  const [pokemonsGenUrl, setPokemonGenUrl] = useState([]);
  const [pokemonsGenInfo, setPokemonGenInfo] = useState([[]]);
  const [isDataLoading, setisDataLoading] = useState(true);

  useEffect(() => {
    async function getPokemonsGenData() {
      const pokemonsGenUrls = generationsData.map((generation) => {
        return generation.pokemon_species.slice(0, 3).map((pokemon) => {
          return pokemon.url;
        });
      });
      setPokemonGenUrl(pokemonsGenUrls);
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

  const getImage = (id) => {
    let pokemonImg = "";
    id < 10
      ? (pokemonImg = `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/00${id}.png`)
      : id < 100
      ? (pokemonImg = `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/0${id}.png`)
      : (pokemonImg = `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${id}.png`);
    return pokemonImg;
  };

  return (
    <>
      {isDataLoading ? (
        <Loader />
      ) : (
        <>
          {generationsData.map((generation, index) => {
            console.log(index);
            return (
              <div key={generation.id} className="cardgen">
                <h3>{generation.id}</h3>
                <h2>{generation.main_region.name}</h2>
                {/* <h3>{generation.names[0].name}</h3> */}
                <p>Inital Pokemons</p>
                <div>
                  {/* {pokemonsGenInfo.map((pokemon, index) => {
                return (
                  <div>
                    {pokemon.map((pokemonData) => {
                      return <div>{pokemonData.id}</div>;
                    })}
                    <img src={getImage(pokemon[0].id)} alt={pokemon.id} />
                    <img src={getImage(pokemon[1].id)} alt={pokemon.id} />
                    <img src={getImage(pokemon[2].id)} alt={pokemon.id} />
                  </div>
                );
              })} */}
                  {generation.id === index + 1 ? (
                    <div>
                      <img
                        src={getImage(pokemonsGenInfo[index][0].id)}
                        alt={pokemonsGenInfo.id}
                      />
                      <img
                        src={getImage(pokemonsGenInfo[index][1].id)}
                        alt={pokemonsGenInfo.id}
                      />
                      <img
                        src={getImage(pokemonsGenInfo[index][2].id)}
                        alt={pokemonsGenInfo.id}
                      />
                    </div>
                  ) : (
                    "Something went wrong"
                  )}
                </div>
                <Link
                  to={{
                    pathname: `/generations/${generation.main_region.name}/`,
                  }}
                >
                  <Button>See list of Pokemons</Button>
                </Link>
              </div>
            );
          })}
        </>
      )}

      {/* <div>
        {pokemonsGenInfo.map((pokemon, index) => {
          return (
            <div>
              {pokemon.map((pokemonData) => {
                return <div>{pokemonData.id}</div>;
              })}
              <img src={getImage(pokemon[0].id)} alt={pokemon.id} />
              <img src={getImage(pokemon[1].id)} alt={pokemon.id} />
              <img src={getImage(pokemon[2].id)} alt={pokemon.id} />
            </div>
          );
        })}
      </div> */}
    </>
  );
}

export default GenerationCard;
