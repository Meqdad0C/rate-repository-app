import AsyncStorage from '@react-native-async-storage/async-storage'

class AuthStorage {
  constructor(namespace = 'auth') {
    this.namespace = namespace
  }

  async getAccessToken() {
    // Get the access token for the storage
    const rawToken = await AsyncStorage.getItem(`${this.namespace}:token`)
    return rawToken ? JSON.parse(rawToken) : null
  }

  async setAccessToken(accessToken) {
    const accessTokenString = JSON.stringify(accessToken)
    // Add the access token to the storage
    await AsyncStorage.setItem(`${this.namespace}:token`, accessTokenString)
  }

  async removeAccessToken() {
    // Remove the access token from the storage
    return await AsyncStorage.removeItem(`${this.namespace}:token`)
  }
}

export default AuthStorage
