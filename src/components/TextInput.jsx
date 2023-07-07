import { TextInput as NativeTextInput, StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    textInput: {
        padding: 10,
        borderWidth: 1,
        borderRadius: 5,
        margin: 5,
        borderColor: 'grey',
    },
    error: {
        borderColor: 'red',
    },
})

const TextInput = ({ style, error, ...props }) => {
  const textInputStyle = [style]

  return <NativeTextInput style={[styles.textInput,textInputStyle]} {...props} />
}

export default TextInput
