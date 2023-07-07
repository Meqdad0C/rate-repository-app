import { View, StyleSheet, Pressable } from 'react-native'
import Constants from 'expo-constants'
import Text from '../Text'
import theme from '../../theme'
import { Link } from 'react-router-native'
import { ScrollView } from 'react-native'
import { useLazyQuery } from '@apollo/client'
import { AUTHORIZED_USER } from '../../graphql/queries'
import { useAuthStorage } from '../../hooks/useAuthStorage'
import { useApolloClient } from '@apollo/client'
import { useState, useEffect } from 'react'
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
  const authStorage = useAuthStorage()
  const apolloClient = useApolloClient()
  const [queryMe, { called, loading, data }] = useLazyQuery(AUTHORIZED_USER)
  const [user, setUser] = useState(null)

  useEffect(() => {
    const fetchUser = async () => {
      await queryMe()
      if (data?.me) {
        setUser(data.me.username)
      }
    }
    fetchUser()
  }, [data])

  const handleSignOut = async () => {
    console.log('sign out')
    await authStorage.removeAccessToken()
    apolloClient.resetStore()
    setUser(null)
  }

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <LinkText to={'/'}>Repositories</LinkText>
        {!user ? (
          <LinkText to={'/signin'}>Sign in</LinkText>
        ) : (
          <>
            <Pressable onPress={handleSignOut}>
              <Text style={styles.text}>Sign out</Text>
            </Pressable>
            <Text style={styles.text}>{user}</Text>
          </>
        )}
      </ScrollView>
    </View>
  )
}

export default AppBar
