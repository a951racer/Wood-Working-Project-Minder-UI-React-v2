import {useContext} from 'react'
import Context from './context'

export default function useJobs() {
  let context = useContext(Context)
  return context
}

