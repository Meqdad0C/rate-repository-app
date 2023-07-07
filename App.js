import { StatusBar } from 'react-native'
import Main from './src/components/Main'
import theme from './src/theme'
import { NativeRouter } from 'react-router-native'
import { ApolloProvider } from '@apollo/client'
import createApolloClient from './src/utils/apolloClient'

const apolloClient = createApolloClient()
const App = () => {
  return (
    <>
      <NativeRouter>
        <ApolloProvider client={apolloClient}>
          <Main />
        </ApolloProvider>
      </NativeRouter>
      <StatusBar backgroundColor={theme.colors.appBarBackground} />
    </>
  )
}

export default App
