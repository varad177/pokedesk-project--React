

import React from 'react'
import Search from '../search/Search'
import './Pokedesk.css'
import PokemonList from '../pokemonList/PokemonList'

const Pokedesk = () => {
    return (
        <div className='pokedesk_wrapper'>
        <h1 id='pokedeskheading'>Pokedesk</h1>
            <Search />
         <PokemonList/>
        </div>
    )
}

export default Pokedesk
