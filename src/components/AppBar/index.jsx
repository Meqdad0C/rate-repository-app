import { View, StyleSheet, Pressable } from 'react-native'
import Constants from 'expo-constants'
import Text from '../Text'
import theme from '../../theme'

const PreesableText = (props) => {
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
  const handlePress = (e) => {
    console.log('Pressed');
    e.persist()
    const Button = e.target
    Button.setNativeProps({
      style: styles.pressedText,
    })
    setTimeout(() => {
      e.target.setNativeProps({
        style: styles.text,
      })
    }, 1000)
  }

  return (
    <Pressable onPress={handlePress}>
      <Text style={styles.text}>{props.children}</Text>
    </Pressable>
  )
}

const AppBar = () => {
  const styles = StyleSheet.create({
    container: {
      paddingTop: Constants.statusBarHeight,
      backgroundColor: theme.colors.appBarBackground,
      opacity: 0.9,
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
      <PreesableText>Repositories</PreesableText>
    </View>
  )
}

export default AppBar
