import React, {useState} from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import runtimeEnv from '@mars/heroku-js-runtime-env'

import FetchContext from './context'
import useToken from '../token/hook'

const env = runtimeEnv()  /// not working!!!
const apiRoot = 'https://wwpm-api-staging.herokuapp.com' //env.REACT_APP_API

const FetchProvider = ({settings, children}) => {
  const [fetchResult, setFetchResult] = useState({statusCode: null, callIx: 0, message: null, error: null})
  const [error, setError] = useState()
  const { getToken } = useToken()
  const env = runtimeEnv()

  let fetchViaApi = async (type, url, payload) => {
    const uri = apiRoot + url
    const token = await getToken()
    const options = {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    }
    let response = {}
    switch (type) {
      case 'GET':
        response = await axios.get(uri, options)
        break
      case 'POST':
        response = await axios.post(uri, payload, options)
        break
      case 'PUT':
        response = await axios.put(uri, payload, options)
        break
      case 'DELETE':
        response = await axios.delete(uri, payload, options)
        break
      default:
        setError(new Error('Invalid request.'))
        return null
    }
    let result = {response}
    if (response.ok) {
      setFetchResult(result)
    } else {
      if (response.status === 403) {
        setError(new Error('You do not not have access to the requested resource'))
        return result
      }
      if (response.status === 401) {
        setError(new Error('Access denied. Something something something'))
        // maybe log them out?
        return result
      }
      if (result.response.error?.code === DOMException.ABORT_ERR) return result
      result = {...result, message: response.errorMessage}
      setFetchResult(result)
      setError(result.response.error)
    }
   
    return result.response.data
  } 


  return (
    <FetchContext.Provider value={{
      fetchViaApi,
      fetchResult,
      error
    }}>
      {children}
    </FetchContext.Provider>
  )
}

FetchProvider.propTypes = {
  children: PropTypes.element.isRequired,
}

export default FetchProvider
