import { useQuery } from '@apollo/client'
import { AUTHORIZED_USER } from '../graphql/queries'
import {
  FlatList,
  View,
  Text,
  StyleSheet,
  Pressable,
  Alert,
} from 'react-native'
import { RatingCircle } from './RepositoryView'
import theme from '../theme'
import { ItemSeparator } from './RepositoryList'
import { useNavigate } from 'react-router-native'
import { useMutation } from '@apollo/client'
import { DELETE_REVIEW } from '../graphql/mutations'
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
    justifyContent: 'space-around',
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
    marginRight: 5,
    marginLeft: 5,
    minWidth: '40%',
  },
  separator: {
    height: 10,
  },
})
const ReviewItem = ({ review, refetch }) => {
  const Navigate = useNavigate()
  const [deleteReview] = useMutation(DELETE_REVIEW)
  return (
    <View style={styles.container}>
      <View style={styles.flexContainerRow}>
        <RatingCircle rating={review.rating} />
        <View style={styles.flexContainerColumn}>
          <Text style={styles.mainText}>{review.repository.fullName}</Text>
          <Text style={styles.subText}>{review.createdAt.slice(0, 10)}</Text>
          <Text style={styles.main}>{review.text}</Text>
        </View>
      </View>
      <View style={[styles.flexContainerRow, { justifyContent: 'center' }]}>
        <Pressable
          onPress={() => Navigate(`/repository/${review.repository.id}`)}
        >
          <Text style={styles.button}>View repository</Text>
        </Pressable>
        <Pressable
          onPress={() => {
            Alert.alert(
              'Delete review',
              'Are you sure you want to delete this review?',
              [
                {
                  text: 'Cancel',
                },
                {
                  text: 'Delete',
                  onPress: async () => {
                    await deleteReview({ variables: { id: review.id } })
                    refetch()
                  },
                },
              ],
            )
          }}
        >
          <Text style={[styles.button, { backgroundColor: 'red' }]}>
            Delete review
          </Text>
        </Pressable>
      </View>
    </View>
  )
}

const MyReviews = () => {
  const { data, loading, error, refetch } = useQuery(AUTHORIZED_USER, {
    fetchPolicy: 'cache-and-network',
    variables: { includeReviews: true },
  })
  console.log(data)
  if (loading) return <Text>Loading...</Text>
  if (error) return <Text>Error: {error.message}</Text>

  const reviews = data.me.reviews.edges.map((edge) => edge.node)

  return (
    <FlatList
      data={reviews}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => <ReviewItem review={item} refetch={refetch} />}
    />
  )
}

export default MyReviews
