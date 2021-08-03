import React, { useState, useEffect } from 'react'
//import { Growl } from 'primereact/growl'

import useLibrary from '../../providers/library/hook'

import PageLayout from '../../Components/app/PageLayout'
import LibraryList from '../../Components/Library/LibraryList'
import NewLibraryItemDialog from '../../Components/app/dialogs/NewLibraryItemDialog'

const LibraryPage = () => {
  const [editingItem, setEditingItem] = useState()
  const { items, fetchItems, resetCurrentItem } = useLibrary()

    useEffect(() => {
      fetchItems()
      resetCurrentItem()
      return () => {
      }
    }, [])
  
    useEffect(() => {
    }, [items])

  return (
    <PageLayout title="Library">
      <NewLibraryItemDialog />
      <LibraryList items={items}/>
    </PageLayout>
  )
}

export default LibraryPage
