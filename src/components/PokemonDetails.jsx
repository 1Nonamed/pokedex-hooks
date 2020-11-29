import React from 'react'

const Pokedex = props => {
    const {match} = props
    const {params} = match
    const {pokemonId} = params


return <div>{`Soy la tarjeta del Pokemon ${pokemonId}`}</div>
}

export default Pokedex