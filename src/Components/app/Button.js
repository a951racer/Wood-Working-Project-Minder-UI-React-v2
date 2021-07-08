import React from 'react'
import { Button } from 'primereact/button'

const CustButton = (props) => {
    const { label, icon, onClick } = props

    return (
        <Button label={label} icon={icon} className="scotchy-button" onClick={onClick}/>
    )
}

export default CustButton