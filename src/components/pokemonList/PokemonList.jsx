import axios from "axios";
import React, { useEffect, useState } from "react";
import "./pokelist.css";
import Pokemon from "../Pokemon/Pokemon";

const PokemonList = () => {

    const [PokemonList, setPokemonList] = useState([]);

    const [isloading, setIsloading] = useState(true);

    useEffect(() => {

        const fetchData = async () => {
            const response = await axios.get("https://pokeapi.co/api/v2/pokemon");
            console.log(response.data);
            const pokemonResult = response.data.results;
            const pokemeomResultPromise = pokemonResult.map((pok) => axios.get(pok.url))
            console.log(pokemeomResultPromise);
            const pokemondata = await axios.all(pokemeomResultPromise)
            // console.log("the ",pokemondata);
            const res = (pokemondata.map((pkdata) => {
                const pokemon = pkdata.data;
                // console.log("the pk",pokemon);
                return {
                    id: pokemon.id,
                    name: pokemon.name,
                    image: pokemon.sprites.other.dream_world.front_default,
                    type: pokemon.types
                }
            }))
            console.log("th re s", res);
            setPokemonList(res)

            setIsloading(false)
        };

        fetchData();

    }, []);

    return (
        <div className="pokemon_list_wrapper">
            <div>
                pokemon list
            </div>
            <div className="pokemon___Wrapper">
                {(isloading) ? "Loading" :
                    PokemonList.map((p) => <Pokemon name={p.name} image={p.image} key={p.id} />)
                }
            </div>
            <div className="controll">
            
            <button>Prev</button>
            <button>Next</button>
            </div>
        </div>
    );
};

export default PokemonList;
