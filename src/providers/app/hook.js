import {useContext} from 'react'
import Context from './context'

export default function useApp() {
  let context = useContext(Context)
  return context
}

