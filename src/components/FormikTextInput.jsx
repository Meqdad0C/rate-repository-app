import { StyleSheet } from 'react-native'
import { useField } from 'formik'

import TextInput from './TextInput'
import Text from './Text'

const styles = StyleSheet.create({
  errorText: {
    color: 'red',
  },
  error: {
    borderColor: 'red',
  },
})

const FormikTextInput = ({ name, ...props }) => {
  const [field, meta, helpers] = useField(name)
  let timeOutId = null
  const showError = meta.touched && meta.error
  if (showError) {
    clearTimeout(timeOutId)
    timeOutId = setTimeout(() => {
      helpers.setTouched(false)
    }, 3000)
  }

  return (
    <>
      <TextInput
        onChangeText={(value) => helpers.setValue(value)}
        onBlur={() => helpers.setTouched(true)}
        value={field.value}
        error={showError}
        style={showError ? styles.error : null}
        {...props}
      />
      {showError && <Text style={styles.errorText}>{meta.error}</Text>}
    </>
  )
}

export default FormikTextInput
