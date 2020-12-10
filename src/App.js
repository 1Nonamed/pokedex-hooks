import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import Loader from "./components/Loader";
import SignIn from "./components/SignIn";
import PrivateRoute from "./components/PrivateRoute";
import Pokedex from "./components/Pokedex/Pokedex";
import Generations from "./components/Generations/Generations";
import GenerationList from "./components/Generations/GenerationList";
import PokemonDetails from "./components/PokemonDetails/PokemonDetails";
import { getAllPokemons, getPokemonsData } from "./helpers";
import Navbar from "./components/Navbar/Navbar";

function App() {
  const [pokemonData, setPokemonData] = useState({});
  const [totalPokemons, setTotalPokemons] = useState(0);
  const [nextPage, setNextPage] = useState("");
  const [prevPage, setPrevPage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(false);

  useEffect(() => {
    async function getData() {
      document.body.style.backgroundColor = "white";
      const response = await getAllPokemons(
        "https://pokeapi.co/api/v2/pokemon?limit=20"
      );
      const data = response.data;
      setTotalPokemons(data.count);
      setNextPage(data.next);
      setPrevPage(data.previous);
      await getAllPokemonsData(data.results);
      setIsLoading(false);
    }
    getData();
  }, []);

  const getAllPokemonsData = async (data) => {
    const allPokemonsData = await Promise.all(
      data.map(async (pokemon) => {
        let pokemonsData = await getPokemonsData(pokemon.url);
        return pokemonsData;
      })
    );
    setPokemonData(allPokemonsData);
  };

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
    <Switch>
      <PrivateRoute path="/pokemon/:pokemonId/">
        <Navbar user={user} />
        <PokemonDetails totalPokemons={totalPokemons} />
      </PrivateRoute>
      <PrivateRoute path="/generations/:generationId" user={user}>
        <Navbar user={user} />
        <GenerationList />
      </PrivateRoute>
      <Route path="/generations">
        <Navbar user={user} />
        <Generations />
      </Route>
      <PrivateRoute path="/pokedex" user={user}>
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <Navbar user={user} />
            <Pokedex
              pokemons={pokemonData}
              handleNextPage={handleNextPage}
              handlePreviousPage={handlePreviousPage}
            />
          </>
        )}
      </PrivateRoute>
      <Route exact path="/">
        <SignIn setUserFn={setUser} />
      </Route>
      <Route exact path="/">
        <SignIn setUserFn={setUser} />
      </Route>
      <Route path="*">
        <h1>404 Not Found :(</h1>
      </Route>
    </Switch>
  );
}

export default App;
