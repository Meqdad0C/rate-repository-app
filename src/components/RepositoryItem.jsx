import { Image, Text, View, StyleSheet } from 'react-native'
import theme from '../theme'

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

const RepositoryItem = ({
  fullName,
  description,
  language,
  stargazersCount,
  forksCount,
  reviewCount,
  ratingAverage,
  ownerAvatarUrl,
}) => {
  const styles = StyleSheet.create({
    container: {
      backgroundColor: 'white',
    },
    flexContainerRow: {
      display: 'flex',
      flexDirection: 'row',
    },
    flexContainerColumn: {
      display: 'flex',
      flexDirection: 'column',
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
  })

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
    </View>
  )
}

export default RepositoryItem
