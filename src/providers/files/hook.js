import {useContext} from 'react'
import Context from './context'

export default function useFiles() {
  let context = useContext(Context)
  return context
}

