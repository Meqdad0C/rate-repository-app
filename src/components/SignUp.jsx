import { useMutation } from '@apollo/client'
import FormikTextInput from './FormikTextInput'
import { useNavigate } from 'react-router-native'
import { Formik } from 'formik'
import * as yup from 'yup'
import { CREATE_USER } from '../graphql/mutations'
import { View, Text, Pressable, StyleSheet } from 'react-native'
import useSignIn from '../hooks/useSignIn'
const validationSchema = yup.object().shape({
  username: yup
    .string()
    .required('Username is required')
    .min(5, 'Username must be at least 5 characters long')
    .max(30, 'Username must be at most 30 characters long'),
  password: yup
    .string()
    .required('Password is required')
    .min(5, 'min 5')
    .max(50, 'max 50'),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required('Password confirmation is required'),
})

const SignUpForm = ({ onSubmit }) => {
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
      <FormikTextInput name="password" placeholder="password" secureTextEntry/>
      <FormikTextInput name="passwordConfirm" placeholder="confirm password" secureTextEntry/>
      <Pressable onPress={onSubmit} style={styles.button}>
        <Text style={styles.text}>Sign up</Text>
      </Pressable>
    </View>
  )
}

const initialValues = {
  username: '',
  password: '',
  passwordConfirm: '',
}
const SignUpView = () => {
  const Navigate = useNavigate()
  const [signIn] = useSignIn()
  const [createUser] = useMutation(CREATE_USER, {
    onError: (error) => {
      console.log(error)
    },
  })
  const onSubmit = async (values) => {
    const { username, password } = values
    await createUser({
      variables: {
        username,
        password,
      },
    })
    await signIn({ username, password })
    Navigate('/')
  }
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ handleSubmit }) => <SignUpForm onSubmit={handleSubmit} />}
    </Formik>
  )
}
export default SignUpView
