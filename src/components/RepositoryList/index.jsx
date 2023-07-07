import { FlatList, View, StyleSheet } from 'react-native'
import RepositoryItem from './RepositoryItem'
import { useQuery } from '@apollo/client'
import { ALL_REPOSIORIES } from '../../graphql/queries'
import LoadingSpinner from '../LoadingSpinner'
import ErrorPage from '../ErrorPage'

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
})

export const RepositoryListContainer = ({ repositories }) => {
  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : []
  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => <RepositoryItem {...item} />}
    />
  )
}

const ItemSeparator = () => <View style={styles.separator} />

const RepositoryList = () => {
  const { data, error, loading } = useQuery(ALL_REPOSIORIES, {
    fetchPolicy: 'cache-and-network',
  })

  const refetch = () => {
    console.log('refetching...')
    return null
  }

  if (loading) return <LoadingSpinner visible={loading} />
  if (error) return <ErrorPage errorMessage={error.message} onRetry={refetch} />

  return <RepositoryListContainer repositories={data.repositories} />
}

export default RepositoryList
