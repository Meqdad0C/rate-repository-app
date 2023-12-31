import { Image, Text, View, StyleSheet, Pressable } from 'react-native'
import theme from '../../theme'
import { useNavigate } from 'react-router-native'

const Card = ({ number, text }) => {
  const styles = StyleSheet.create({
    container: {
      display: 'flex',
      flexDirection: 'column',
      margin: 10,
      marginTop: 0,
      alignItems: 'center',
      justifyContent: 'center',
    },
    number: {
      color: theme.colors.textPrimary,
      fontSize: theme.fontSizes.subheading,
      fontWeight: theme.fontWeights.bold,
    },
    text: {
      color: theme.colors.textSecondary,
      fontSize: theme.fontSizes.subheading,
      fontWeight: theme.fontWeights.normal,
    },
  })

  return (
    <View style={styles.container}>
      <Text style={styles.number}>
        {number > 1000 ? `${(number / 1000).toFixed(1)}k` : number}
      </Text>
      <Text>{text}</Text>
    </View>
  )
}

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
})

export const RepositoryItemContainer = ({
  id,
  fullName,
  description,
  language,
  stargazersCount,
  forksCount,
  reviewCount,
  ratingAverage,
  ownerAvatarUrl,
}) => {
  const repository = {
    id,
    fullName,
    description,
    language,
    stargazersCount,
    forksCount,
    reviewCount,
    ratingAverage,
    ownerAvatarUrl,
  }

  const Navigate = useNavigate()

  return (
    <Pressable onPress={() => Navigate(`/repository/${id}`)}>
      <RepositoryItem {...repository} />
    </Pressable>
  )
}

export const RepositoryItem = (props) => {
  const {
    fullName,
    description,
    language,
    stargazersCount,
    forksCount,
    reviewCount,
    ratingAverage,
    ownerAvatarUrl,
  } = props

  return (
    <View style={styles.container}>
      <View style={styles.flexContainerRow}>
        <Image source={{ uri: ownerAvatarUrl }} style={styles.image} />
        <View style={[styles.flexContainerColumn, { margin: 10 }]}>
          <Text style={styles.mainText}>{fullName}</Text>
          <Text style={styles.subText}>{description}</Text>
          <Text style={styles.languageTag}>{language}</Text>
        </View>
      </View>
      <View style={styles.stats}>
        <Card number={stargazersCount} text="Stars" />
        <Card number={forksCount} text="Forks" />
        <Card number={reviewCount} text="Reviews" />
        <Card number={ratingAverage} text="Rating" />
      </View>
        {props?.children}
    </View>
  )
}

export default RepositoryItemContainer
