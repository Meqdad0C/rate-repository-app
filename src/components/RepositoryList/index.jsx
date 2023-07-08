import { FlatList, View, StyleSheet, Text, Pressable } from 'react-native'
import RepositoryItemContainer from './RepositoryItem'
import { useQuery } from '@apollo/client'
import { ALL_REPOSIORIES } from '../../graphql/queries'
import LoadingSpinner from '../LoadingSpinner'
import ErrorPage from '../ErrorPage'
import { useEffect, useState } from 'react'
import { Searchbar } from 'react-native-paper'
import { useDebounce } from 'use-debounce'
import { useNavigate } from 'react-router-native'
import useRepositories from '../../hooks/useRepositoriesQL'
const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
})

const SearchBar = ({ refetch }) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [debouncedText] = useDebounce(searchQuery, 500)

  const onChangeSearch = (query) => setSearchQuery(query)
  console.log(debouncedText)

  useEffect(() => {
    if (debouncedText) {
      refetch({ searchKeyword: debouncedText })
      console.log('refetching... ', debouncedText)
    }
  }, [debouncedText])

  return (
    <Searchbar
      placeholder="Search"
      onChangeText={onChangeSearch}
      value={searchQuery}
    />
  )
}

const Picker = ({ sort }) => {
  const styles = StyleSheet.create({
    container: {
      backgroundColor: 'white',
      padding: 5,
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
    },
    text: {
      color: 'grey',
      fontSize: 14,
    },
    button: {
      backgroundColor: 'skyblue',
      color: 'white',
      padding: 5,
      borderRadius: 5,
      margin: 1,
      fontWeight: 'bold',
      fontSize: 12,
      textAlign: 'center',
    },
    Pressed: {
      backgroundColor: 'blue',
    },
  })
  const { setOrder, setDirection } = sort
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Sort by: </Text>
      <Pressable
        onPress={() => {
          setOrder('CREATED_AT')
          setDirection('DESC')
        }}
      >
        <Text style={styles.button}>Latest repositories</Text>
      </Pressable>
      <Pressable
        onPress={() => {
          setOrder('RATING_AVERAGE')
          setDirection('DESC')
        }}
      >
        <Text style={styles.button}>Highest rated repositories</Text>
      </Pressable>
      <Pressable
        onPress={() => {
          setOrder('RATING_AVERAGE')
          setDirection('ASC')
        }}
      >
        <Text style={styles.button}>Lowest rated repositories</Text>
      </Pressable>
    </View>
  )
}

export const RepositoryListContainer = ({ repositories, sort, refetch,fetchMore }) => {
  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : []

  const onEndReached = () => {
    fetchMore()
  }

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      ListHeaderComponent={
        <>
          <SearchBar refetch={refetch} />
          <Picker sort={sort} />
        </>
      }
      onEndReached={onEndReached}
      renderItem={({ item }) => <RepositoryItemContainer {...item} />}
    />
  )
}

export const ItemSeparator = () => <View style={styles.separator} />

const RepositoryList = () => {
  const Navigate = useNavigate()
  const [order, setOrder] = useState('CREATED_AT')
  const [direction, setDirection] = useState('DESC')
  const { repositories, error, loading, refetch, fetchMore } = useRepositories({
    fetchPolicy: 'cache-and-network',
    variables: { orderBy: order, orderDirection: direction, first: 5 },
    onError: (error) => {
      console.log(error)
    },
  })

  console.log('fetching data...')

  if (loading) return <LoadingSpinner visible={loading} />
  if (error)
    return (
      <ErrorPage errorMessage={error.message} onRetry={() => Navigate('/')} />
    )

  return (
    <RepositoryListContainer
      repositories={repositories}
      sort={{ setOrder, setDirection }}
      refetch={refetch}
      fetchMore={fetchMore}
    />
  )
}

export default RepositoryList
