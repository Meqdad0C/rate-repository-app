import { useMutation } from '@apollo/client'
import FormikTextInput from './FormikTextInput'
import { useNavigate } from 'react-router-native'
import { Formik } from 'formik'
import * as yup from 'yup'
import { CREATE_REVIEW } from '../graphql/mutations'
import { View, Text, Pressable, StyleSheet } from 'react-native'

const validationSchema = yup.object().shape({
  ownerName: yup.string().required('Owner name is required'),
  repositoryName: yup.string().required('Repository name is required'),
  rating: yup
    .number()
    .required('Rating is required')
    .min(0, 'Rating must be greater or equal to 0')
    .max(100, 'Rating must be less than or equal to 100'),
  text: yup.string(),
})

const ReviewForm = ({ onSubmit }) => {
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
      <FormikTextInput name="ownerName" placeholder="Repository owner name" />
      <FormikTextInput name="repositoryName" placeholder="Repository name" />
      <FormikTextInput name="rating" placeholder="Rating betwwen 0 and 100" />
      <FormikTextInput name="text" placeholder="Review" multiline />
      <Pressable onPress={onSubmit} style={styles.button}>
        <Text style={styles.text}>Create a review</Text>
      </Pressable>
    </View>
  )
}

const initialValues = {
  ownerName: '',
  repositoryName: '',
  rating: '',
  text: '',
}
const ReviewView = () => {
  console.log('ReviewView')
  const Navigate = useNavigate()
  const [createReview] = useMutation(CREATE_REVIEW, {
    onError: (error) => {
      console.log(error)
    },
  })
  const onSubmit = async (values) => {
    const { repositoryName, ownerName, rating, text } = values
    console.log(values)
    const { data } = await createReview({
      variables: {
        repositoryName,
        ownerName,
        rating: parseInt(rating),
        text,
      },
    })
    const id = data.createReview.repositoryId
    Navigate(`/repository/${id}`)
  }
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ handleSubmit }) => <ReviewForm onSubmit={handleSubmit} />}
    </Formik>
  )
}
export default ReviewView
