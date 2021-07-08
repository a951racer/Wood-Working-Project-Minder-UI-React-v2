import React from 'react'
import './chip.css'

const Chip = ({label}) => {
    return (
        <span className='chip'>{label}</span>
    )
}

export default Chip