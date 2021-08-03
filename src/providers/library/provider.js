import React, { useState } from 'react'
import PropTypes from 'prop-types'
import LibraryContext from './context'
import useFetch from '../fetch/hook'

const LibraryProvider = ({children}) => {
  const [items, setItems] = useState([])
  const [currentItem, setCurrentItem] = useState(null)
  const [profile, setProfile] = useState(null)
  const { fetchViaApi } = useFetch()

  async function fetchItems() {
    let result = await fetchViaApi('GET', '/library')
    setItems(result)
  }

  async function fetchItemDetails(id) {
    let result = await fetchViaApi('GET', '/library/' + id)
    setCurrentItem(result)
  }

  async function resetCurrentItem() {
    setCurrentItem(null)
  }

  async function saveItem(updatedItem) {
    const result = await fetchViaApi('PUT', `/library/${updatedItem._id}`, updatedItem)
    //update state items
  }

  async function createItem(newItem) {
    const result = await fetchViaApi('POST', '/library', newItem)
    setItems([...items, newItem])
  }

  return (
    <LibraryContext.Provider value={{
      items,
      currentItem,
      fetchItems,
      fetchItemDetails,
      resetCurrentItem,
      saveItem,
      createItem,
    }}>
      {children}
    </LibraryContext.Provider>
  )
}

LibraryProvider.propTypes = {
  children: PropTypes.element.isRequired,
}

export default LibraryProvider
