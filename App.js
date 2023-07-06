import { StatusBar } from 'react-native'
import Main from './src/components/Main'
import theme from './src/theme'

const App = () => {
  return (
    <>
      <Main  />
      <StatusBar backgroundColor={theme.colors.appBarBackground}  />
    </>
  )
}

export default App
