import {useContext} from 'react'
import Context from './context'

export default function useFetch() {
  let context = useContext(Context)
  return context
}
