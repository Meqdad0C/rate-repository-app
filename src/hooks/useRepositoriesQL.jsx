import { useQuery } from '@apollo/client'
import { ALL_REPOSIORIES } from '../graphql/queries'

const useRepositories = (variables) => {
  const { data, loading,error, fetchMore, refetch, ...result } = useQuery(ALL_REPOSIORIES, {
    ...variables,
    // ...
  })

  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.repositories.pageInfo.hasNextPage

    if (!canFetchMore) {
      return
    }

    fetchMore({
      variables: {
        after: data.repositories.pageInfo.endCursor,
        ...variables,
      },
    })
  }

  return {
    repositories: data?.repositories,
    fetchMore: handleFetchMore,
    loading,
    error,
    refetch,
    ...result,
  }
}

export default useRepositories
