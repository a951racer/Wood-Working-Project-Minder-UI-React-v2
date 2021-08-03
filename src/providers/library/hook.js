import {useContext} from 'react'
import Context from './context'

export default function useLibrary() {
  let context = useContext(Context)
  return context
}

