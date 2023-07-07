import { Text, Pressable, View, StyleSheet } from 'react-native'
import FormikTextInput from './FormikTextInput'
import { Formik } from 'formik'
import * as yup from 'yup'
import useSignIn from '../hooks/useSignIn'
import LoadingSpinner from './LoadingSpinner'
import ErrorPage from './ErrorPage'

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .min(1, 'Username must be greater or equal to 1')
    .max(30, 'Username must be less than or equal to 30')
    .required('Username is required'),
  password: yup
    .string()
    .min(5, 'Password must be greater or equal to 5')
    .max(50, 'Password must be less than or equal to 50')
    .required('Password is required'),
})

const initialValues = {
  username: '',
  password: '',
}

const LogInForm = ({ onSubmit }) => {
  const styles = StyleSheet.create({
    container: {
      display: 'flex',
      flexDirection: 'column',
      padding: 15,
      flexGrow: 1,
      backgroundColor: 'white',
    },
    button: {
      backgroundColor: '#0366d6',
      padding: 10,
      margin: 10,
      borderRadius: 5,
      alignItems: 'center',
    },
    text: {
      color: 'white',
      fontSize: 16,
      fontWeight: 'bold',
    },
  })

  return (
    <View style={styles.container}>
      <FormikTextInput name="username" placeholder="username" />
      <FormikTextInput name="password" placeholder="password" secureTextEntry />
      <Pressable onPress={onSubmit} style={styles.button}>
        <Text style={styles.text}>login</Text>
      </Pressable>
    </View>
  )
}

const SignIn = () => {
  const [signIn, result] = useSignIn()

  const onSubmit = async (values) => {
    const { username, password } = values
    signIn({ username, password })
      .then((res) => {
        console.log(res)
      })
  }

  if (result.loading) return <LoadingSpinner visible={result.loading} />

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ handleSubmit }) => <LogInForm onSubmit={handleSubmit} />}
    </Formik>
  )
}

export default SignIn
