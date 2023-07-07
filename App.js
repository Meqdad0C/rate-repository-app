import { StatusBar } from 'react-native'
import Main from './src/components/Main'
import theme from './src/theme'
import { NativeRouter } from 'react-router-native'
const App = () => {
  return (
    <>
      <NativeRouter>
        <Main />
      </NativeRouter>
      <StatusBar backgroundColor={theme.colors.appBarBackground} />
    </>
  )
}

export default App
