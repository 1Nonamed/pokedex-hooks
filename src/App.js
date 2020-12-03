import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  NavLink,
} from "react-router-dom";
import Loader from "./components/Loader";
import Navbar from "./components/Navbar/Navbar";
import Pokedex from "./components/Pokedex/Pokedex";
import GenerationCard from "./components/Generations/GenerationCard";
import PokemonGenerations from "./components/Generations/Generations";
import PokemonDetails from "./components/PokemonDetails/PokemonDetails";

import {
  AppBar,
  Toolbar,
  Typography,
  Pagination,
  Tab,
  Button,
} from "@material-ui/core/";

function App() {
  const [pokemonData, setPokemonData] = useState({});
  // const [pokemonNamesJap, setPokemonNamesJap] = useState({ names: [] });
  const [nextPage, setNextPage] = useState("");
  const [prevPage, setPrevPage] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const pokemonUrl = "https://pokeapi.co/api/v2/pokemon?limit=20";

  useEffect(() => {
    async function getData() {
      const response = await getAllPokemons(pokemonUrl);
      const data = response.data;
      setNextPage(data.next);
      setPrevPage(data.previous);
      await getAllPokemonsData(data.results);
      setIsLoading(false);
    }
    getData();
  }, []);

  // useEffect(() => {
  //   getAllPokemonsJapNames(pokemonData);
  // }, [pokemonData]);

  const getAllPokemons = async (url) => {
    return new Promise((resolve, reject) => {
      axios.get(url).then((data) => {
        resolve(data);
      });
    });
  };

  const getAllPokemonsData = (async (data) => {
    const allPokemonsData = await Promise.all(
      data.map(async (pokemon) => {
        let pokemonsData = await getPokemonsData(pokemon.url);
        return pokemonsData;
      })
    );
    setPokemonData(allPokemonsData);
  });

  const getPokemonsData = async (url) => {
    return new Promise((resolve, reject) => {
      axios.get(url).then((data) => {
        resolve(data.data);
      });
    });
  };

  // JAPANESE
  // const getAllPokemonsJapNames = async (data) => {
  //   const pokemonsJapNames = await Promise.all(
  //     data.map(async (pokemon) => {
  //       let pokemonsData = await getPokemonsJapNames(
  //         `https://pokeapi.co/api/v2/pokemon-species/${pokemon.id}`
  //       );
  //       return pokemonsData;
  //     })
  //   );
  //   setPokemonNamesJap(pokemonsJapNames);
  // };

  // const getPokemonsJapNames = async (url) => {
  //   return new Promise((resolve, reject) => {
  //     axios.get(url).then((data) => {
  //       resolve(data.data);
  //     });
  //   });
  // };

  const handleNextPage = async () => {
    setIsLoading(true);
    const data = await getAllPokemons(nextPage);
    await getAllPokemonsData(data.data.results);
    setNextPage(data.data.next);
    setPrevPage(data.data.previous);
    setIsLoading(false);
  };

  const handlePreviousPage = async () => {
    if (!prevPage) {
      alert("This is the first page");
    } else {
      setIsLoading(true);
      const data = await getAllPokemons(prevPage);
      await getAllPokemonsData(data.data.results);
      setNextPage(data.data.next);
      setPrevPage(data.data.previous);
      setIsLoading(false);
    }
  };

  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path="/pokemon/:pokemonName/:pokemonId">
          <PokemonDetails />
        </Route>
        <Route path="/generations/:generationName">
          <h1>Aquí va una lista de pokemones de la generación</h1>
        </Route>
        <Route path="/generations">
          <PokemonGenerations />
        </Route>
        <Route path="/pokedex">
          {isLoading ? (
            <Loader />
          ) : (
            <Pokedex
              pokemons={pokemonData}
              handleNextPage={handleNextPage}
              handlePreviousPage={handlePreviousPage}
              // pokemonsDetails={pokemonNamesJap}
              // totalPages={totalPages}
            />
          )}
        </Route>
        <Route exact path="/">
          {isLoading ? (
            <Loader />
          ) : (
            <Pokedex
              pokemons={pokemonData}
              handleNextPage={handleNextPage}
              handlePreviousPage={handlePreviousPage}
              // pokemonsDetails={pokemonNamesJap}
              // totalPages={totalPages}
            />
          )}
        </Route>
        <Route path="*">
          <h1>404 Not Found :(</h1>
        </Route>
        {/* <Route exact path="/">
          {isLoading ? (
            <Loader />
          ) : (
            <Pokedex
              pokemons={pokemonData}
              handleNextPage={handleNextPage}
              handlePreviousPage={handlePreviousPage}
              // pokemonsDetails={pokemonNamesJap}
              // totalPages={totalPages}
            />
          )}
        </Route> */}
      </Switch>
    </Router>
  );
}

export default App;
