import { useQuery } from '@apollo/client'
import { useParams } from 'react-router-native'
import { SINGLE_REPOSITORY } from '../graphql/queries'
import { RepositoryItem } from './RepositoryList/RepositoryItem'
import { View, Text, Pressable, FlatList } from 'react-native'
import * as Linking from 'expo-linking'
import theme from '../theme'
import { StyleSheet } from 'react-native'
import  useSingleRepositories from '../hooks/useSingleRepository'
import LoadingSpinner from './LoadingSpinner'
import ErrorPage from './ErrorPage'
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 5,
  },
  flexContainerRow: {
    display: 'flex',
    flexDirection: 'row',
  },
  flexContainerColumn: {
    display: 'flex',
    flexDirection: 'column',
    flexShrink: 1,
  },
  mainText: {
    color: theme.colors.textPrimary,
    fontSize: theme.fontSizes.subheading,
    fontWeight: theme.fontWeights.bold,
  },
  subText: {
    color: theme.colors.textSecondary,
    fontSize: theme.fontSizes.subheading,
    fontWeight: theme.fontWeights.normal,
  },
  image: {
    width: 50,
    height: 50,
    margin: 10,
    borderRadius: 5,
  },
  languageTag: {
    backgroundColor: theme.colors.primary,
    color: 'white',
    padding: 5,
    marginTop: 5,
    borderRadius: 5,
    alignSelf: 'flex-start',
    fontWeight: theme.fontWeights.bold,
  },
  stats: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  button: {
    backgroundColor: theme.colors.primary,
    color: 'white',
    padding: 10,
    borderRadius: 5,
    fontWeight: theme.fontWeights.bold,
    fontSize: theme.fontSizes.subheading,
    textAlign: 'center',
    minWidth: '90%',
    alignSelf: 'center',
  },
  separator: {
    height: 10,
  },
})

const SingleRepository = ({ repository, url }) => {
  return (
    <RepositoryItem {...repository}>
      <Pressable onPress={() => Linking.openURL(url)}>
        <Text style={styles.button}>Open in GitHub</Text>
      </Pressable>
    </RepositoryItem>
  )
}
export const RatingCircle = ({ rating }) => {
  const styles = StyleSheet.create({
    container: {
      width: 50,
      height: 50,
      borderRadius: 25,
      borderColor: theme.colors.primary,
      borderWidth: 2,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      margin: 10,
    },
    text: {
      color: theme.colors.primary,
      fontSize: theme.fontSizes.subheading,
      fontWeight: theme.fontWeights.bold,
    },
  })
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{rating}</Text>
    </View>
  )
}

const ReviewItem = ({ review }) => {
  return (
    <View style={styles.container}>
      <View style={styles.flexContainerRow}>
        <RatingCircle rating={review.rating} />
        <View style={styles.flexContainerColumn}>
          <Text style={styles.mainText}>{review.user.username}</Text>
          <Text style={styles.subText}>{review.createdAt.slice(0, 10)}</Text>
          <Text style={styles.main}>{review.text}</Text>
        </View>
      </View>
    </View>
  )
}

const ItemSeparator = () => <View style={styles.separator} />

const RepositoryView = () => {
  const id = useParams().id
  const { repo, error, loading, refetch, fetchMore } = useSingleRepositories({
    fetchPolicy: 'network',
    variables: { id, first: 5 },
    onError: (error) => {
      console.log(error)
    },
  })

  console.log('fetching single repo...')

  if (loading) return <LoadingSpinner visible={loading} />
  if (error) return <ErrorPage errorMessage={error.message} onRetry={refetch} />

  const onEndReach = () => {
    console.log('end reached')
    fetchMore()
  }

  const url = repo.url
  return (
    <FlatList
      data={repo.reviews.edges}
      ItemSeparatorComponent={ItemSeparator}
      ListHeaderComponent={() => (
        <SingleRepository repository={repo} url={url} />
      )}
      onEndReached={onEndReach}
      renderItem={({ item }) => <ReviewItem review={item.node} />}
    />
  )
}

export default RepositoryView
