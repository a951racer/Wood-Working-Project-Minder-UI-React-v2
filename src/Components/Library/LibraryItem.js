import React, { useState } from 'react'
import { Card } from 'primereact/card'

import useLibrary from '../../providers/library/hook'
import useFiles from '../../providers/files/hook'
import './Library.css'

const LibraryItem = ({item}) => {
  const [libraryItem, setLibraryItem] = useState(item)

  const footer = 
    <div style={{marginBottom: '.5em', width: '100px', margin: 'auto'}} ></div>

  return (
    <>
      <Card footer={footer}>
        <div className='library-item-frame'>
          <img className='library-item' src={libraryItem.path} />
        </div>
      </Card>
    </>
  )
}

export default LibraryItem