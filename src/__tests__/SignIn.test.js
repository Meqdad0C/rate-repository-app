import { LogInForm } from '../components/SignIn'
import {
  render,
  screen,
  fireEvent,
  waitFor,
} from '@testing-library/react-native'
import { Formik } from 'formik'

describe('SignIn', () => {
  describe('LogInForm', () => {
    it('calls onSubmit function with correct arguments when a valid form is submitted', async () => {
      const onSubmit = jest.fn()
      render(
        <Formik
          initialValues={{ username: '', password: '' }}
          onSubmit={onSubmit}
        >
          {({ handleSubmit }) => <LogInForm onSubmit={handleSubmit} />}
        </Formik>,
      )
      screen.debug()
      fireEvent.changeText(screen.getByPlaceholderText('username'), 'kalle')
      fireEvent.changeText(screen.getByPlaceholderText('password'), 'password')
      await waitFor(() => {
        fireEvent.press(screen.getByText('login'))
        expect(onSubmit).toHaveBeenCalledTimes(1)
        expect(onSubmit.mock.calls[0][0]).toEqual({
          username: 'kalle',
          password: 'password',
        })
      })
    })
  })
})
