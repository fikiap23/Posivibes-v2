import * as decode from 'jwt-decode'

// we instantiate a new version of this for every component that imports it.
// this ensures we are using a new version of this functionality and removes some risk of leaving remnant data hanging around
class AuthService {
  // retrieve data saved in token
  getProfile() {
    return decode(this.getToken())
  }

  // check if the user is still logged in
  loggedIn() {
    // check if there is a saved token and it's still valid
    const token = this.getToken()
    // check if token is NOT undefined and the token is NOT expired
    return !!token && !this.isTokenExpired(token)
  }

  // check if the token has expired
  isTokenExpired(token) {
    try {
      const decoded = decode(token)
      if (decoded.exp < Date.now() / 1000) {
        return true
      } else {
        return false
      }
    } catch (err) {
      return false
    }
  }

  // retrieves the user token from localStorage
  getToken() {
    return localStorage.getItem('token')
  }

  getUser() {
    const user = localStorage.getItem('user')
    return user ? JSON.parse(user) : null
  }

  login(idToken) {
    // saves token to localStorage
    localStorage.setItem('token', idToken)
  }

  logout() {
    // clear token from localStorage
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    // this will reload the page and reset the state of the application
    window.location.assign('/')
  }
}

export default new AuthService()
