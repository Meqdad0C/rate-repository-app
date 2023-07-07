import { useState, useEffect } from 'react'
import Constants from 'expo-constants'

const baseUri = Constants.manifest.extra.restUri

const useRepositories = () => {
  const [repositories, setRepositories] = useState()
  const [loading, setLoading] = useState(false)

  const fetchRepositories = async () => {
    setLoading(true)

    const response = await fetch(`${baseUri}/api/repositories`)
    const json = await response.json()

    setLoading(false)
    setRepositories(json)
  }

  useEffect(() => {
    fetchRepositories()
  }, [])

  return { repositories, loading, refetch: fetchRepositories }
}

export default useRepositories
