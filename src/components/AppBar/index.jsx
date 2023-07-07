import { View, StyleSheet } from 'react-native'
import Constants from 'expo-constants'
import Text from '../Text'
import theme from '../../theme'
import { Link } from 'react-router-native'
import { ScrollView } from 'react-native'

const LinkText = (props) => {
  const styles = StyleSheet.create({
    text: {
      color: 'white',
      fontSize: theme.fontSizes.subheading,
      fontWeight: theme.fontWeights.bold,
      padding: 10,
    },
    pressedText: {
      color: 'yellow',
      fontSize: theme.fontSizes.subheading,
      fontWeight: theme.fontWeights.bold,
      padding: 10,
    },
  })

  return (
    <Link to={props.to}>
      <Text style={styles.text}>{props.children}</Text>
    </Link>
  )
}

const AppBar = () => {
  const styles = StyleSheet.create({
    container: {
      paddingTop: Constants.statusBarHeight,
      backgroundColor: theme.colors.appBarBackground,
      display: 'flex',
      flexDirection: 'row',
    },
    text: {
      color: 'white',
      fontSize: theme.fontSizes.subheading,
      fontWeight: theme.fontWeights.bold,
      padding: 10,
    },
  })

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <LinkText to={'/'}>Repositories</LinkText>
        <LinkText to={'/signin'}>Sign in</LinkText>
        <LinkText to={'/bmi'}>Bmi</LinkText>
      </ScrollView>
    </View>
  )
}

export default AppBar
