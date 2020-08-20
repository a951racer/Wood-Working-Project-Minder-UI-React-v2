import {useContext} from 'react'
import Context from './context'

export default function useAuth() {
  let context = useContext(Context)
  return context
}
