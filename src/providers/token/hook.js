import {useContext} from 'react'
import Context from './context'

export default function useToken() {
  let context = useContext(Context)
  return context
}

