import { useMutation } from '@apollo/client'
import { SIGN_IN } from '../graphql/mutations'

const useSignIn = () => {
  const [mutate, result] = useMutation(SIGN_IN, {
    onError: (error) => {
      console.log(error)
    },
  })

  const signIn = async ({ username, password }) => {
    // call the mutate function here with the right arguments
    console.log('signing in...', username, password)
    const { data } = await mutate({ variables: { username, password } })
    return data
  }

  return [signIn, result]
}

export default useSignIn
