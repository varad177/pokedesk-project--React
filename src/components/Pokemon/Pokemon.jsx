

import React from 'react'
import './pk.css'

const Pokemon = ({ name, image }) => {
    return (
        <div className='pk'>
            <div className='pkname'>{name}</div>
          
            <div ><img className='pk_img' src={image} alt="" /></div>


        </div>
    )
}

export default Pokemon
