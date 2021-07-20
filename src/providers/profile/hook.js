import {useContext} from 'react'
import Context from './context'

export default function useProfile() {
  let context = useContext(Context)
  return context
}

