import { FlatList, View, StyleSheet, Text, Pressable } from 'react-native'
import RepositoryItemContainer from './RepositoryItem'
import { useQuery } from '@apollo/client'
import { ALL_REPOSIORIES } from '../../graphql/queries'
import LoadingSpinner from '../LoadingSpinner'
import ErrorPage from '../ErrorPage'
import { useState } from 'react'
import { useNavigate } from 'react-router-native'
const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
})

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
    Pressed : {
      backgroundColor: 'blue',
    }

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

export const RepositoryListContainer = ({ repositories, sort }) => {
  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : []
  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      ListHeaderComponent={<Picker sort={sort} />}
      renderItem={({ item }) => <RepositoryItemContainer {...item} />}
    />
  )
}

export const ItemSeparator = () => <View style={styles.separator} />

const RepositoryList = () => {
  const Navigate = useNavigate()
  const [order, setOrder] = useState('CREATED_AT')
  const [direction, setDirection] = useState('DESC')
  const { data, error, loading } = useQuery(ALL_REPOSIORIES, {
    fetchPolicy: 'cache-and-network',
    variables: { orderBy: order, orderDirection: direction },
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
      repositories={data.repositories}
      sort={{ setOrder, setDirection }}
    />
  )
}

export default RepositoryList
