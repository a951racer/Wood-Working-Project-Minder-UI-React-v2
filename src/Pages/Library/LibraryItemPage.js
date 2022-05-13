import React, { useState, useEffect } from 'react'
//import { Growl } from 'primereact/growl'

import PageLayout from '../../Components/app/PageLayout'
import LibraryItemDataPanel from '../../Components/Library/LibraryItemDataPanel'
import LibraryItem from '../../Components/Library/LibraryItem'

import useLibrary from '../../providers/library/hook'

const LibraryItemPage = (props) => {
  const [id, setId] = useState(props.match.params.id)
  const { fetchItemDetails, currentItem } = useLibrary()

  useEffect(() => {
    fetchItemDetails(id)
  }, [])

  return (
      <PageLayout title={currentItem ? currentItem.title : 'Loading...'}>
        {currentItem &&
          <div style={{width: '80vw', margin: 'auto'}}>
            <LibraryItemDataPanel item={currentItem} />
            <br />
            <LibraryItem item={currentItem} />
          </div>
          
        }
      </PageLayout>
  )
}

export default LibraryItemPage
