import { useQuery } from '@apollo/client'
import { SINGLE_REPOSITORY } from '../graphql/queries'

const useSingleRepositories = (variables) => {
  const { data, loading,error, fetchMore, refetch, ...result } = useQuery(SINGLE_REPOSITORY, {
    ...variables,
    // ...
  })

  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.repository.reviews.pageInfo.hasNextPage


    if (!canFetchMore) {
      return
    }

    fetchMore({
      variables: {
        after: data.repository.reviews.pageInfo.endCursor,
        ...variables,
      },
    })
  }

  return {
    repo: data?.repository,
    fetchMore: handleFetchMore,
    loading,
    error,
    refetch,
    ...result,
  }
}

export default useSingleRepositories
