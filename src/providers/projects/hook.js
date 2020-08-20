import {useContext} from 'react'
import Context from './context'

export default function useProjects() {
  let context = useContext(Context)
  return context
}

