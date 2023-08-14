import axios from "axios";
import React, { useEffect, useState } from "react";
import "./pokelist.css";
import Pokemon from "../Pokemon/Pokemon";

const PokemonList = () => {
  const [nexturl, setNexturl] = useState("");
  const [prevurl, setPrevurl] = useState("");
  const [PokemonList, setPokemonList] = useState([]);

  const [isloading, setIsloading] = useState(true);

  const [url, setUrl] = useState("https://pokeapi.co/api/v2/pokemon");
  // console.log("thethe", url);
  

  const fetchData = async () => {
    setIsloading(true)
    const response = await axios.get(url);
    // console.log(response.data);
    // console.log("the next url id the ",response.data.next);
    setNexturl(response.data.next);

    setPrevurl(response.data.previous);
    // console.log("the next url" , nexturl);
    // console.log("the prev url" , prevurl);
    const pokemonResult = response.data.results;
    const pokemeomResultPromise = pokemonResult.map((pok) =>
      axios.get(pok.url)
    );
    // console.log(pokemeomResultPromise);
    const pokemondata = await axios.all(pokemeomResultPromise);
    // console.log("the ",pokemondata);
    const res = pokemondata.map((pkdata) => {
      const pokemon = pkdata.data;
      // console.log("the pk",pokemon);
      return {
        id: pokemon.id,
        name: pokemon.name,
        image: pokemon.sprites.other.dream_world.front_default,
        type: pokemon.types,
      };
    });
    // console.log("th re s", res);
    setPokemonList(res);

    setIsloading(false);
  };

  useEffect(() => {
    fetchData();
  }, [url]);



  return (
    <div className="pokemon_list_wrapper">
      <div>pokemon list</div>
      <div className="pokemon___Wrapper">
        {isloading
          ? "Loading"
          : PokemonList.map((p) => (
              <Pokemon name={p.name} image={p.image} key={p.id} />
            ))}
      </div>
      <div className="controll">
        <button disabled={prevurl == null} onClick={() => setUrl(prevurl)}>
          Prev
        </button>
        <button disabled={nexturl == null} onClick={()=> setUrl(nexturl)}>
          Next
        </button>
      </div>
    </div>
  );
};

export default PokemonList;
