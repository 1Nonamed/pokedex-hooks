import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  NavLink,
} from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import PokemonGenerations from './components/Generations/Generations'
import Pokedex from "./components/Pokedex/Pokedex";
import Loader from "./components/Loader";
import PokemonDetails from "./components/PokemonDetails";

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
      console.log(data);
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

  const getAllPokemonsData = async (data) => {
    console.log(data);
    const allPokemonsData = await Promise.all(
      data.map(async (pokemon) => {
        let pokemonsData = await getPokemonsData(pokemon.url);
        return pokemonsData;
      })
    );
    setPokemonData(allPokemonsData);
  };

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
    console.log(data);
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
      console.log(data);
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
        {/* <Route path="/">
          <PokemonDetails />
        </Route> */}
        <Route exact path="/generations">
          <PokemonGenerations />
        </Route>
        <Route exact path="/pokedex">
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
      </Switch>
    </Router>
  );
}

export default App;
