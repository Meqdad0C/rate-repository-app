import { useMutation } from '@apollo/client'
import { SIGN_IN } from '../graphql/mutations'
import { useAuthStorage } from '../hooks/useAuthStorage'
import { useApolloClient } from '@apollo/client'
const useSignIn = () => {
  const apolloClient = useApolloClient()
  const authStorage = useAuthStorage()
  const [mutate, result] = useMutation(SIGN_IN, {
    onError: (error) => {
      console.log(error)
    },
  })

  const signIn = async ({ username, password }) => {
    // call the mutate function here with the right arguments
    const { data } = await mutate({ variables: { username, password } })
    const token = data.authenticate.accessToken
    await authStorage.setAccessToken(token)
    apolloClient.resetStore()
    return data
  }

  return [signIn, result]
}

export default useSignIn
