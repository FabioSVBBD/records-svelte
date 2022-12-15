import { createAuth0Client } from '@auth0/auth0-spa-js'
import { user, isAuthenticated, popupOpen } from '$/stores'
import { config } from 'src/auth_config'

const createClient = async () =>
  await createAuth0Client({
    domain: config.domain,
    clientId: config.clientId,
    cacheLocation: 'localstorage',
  })

const loginWithPopup = async (client, options) => {
  popupOpen.set(true)

  try {
    await client.loginWithPopup(options)

    user.set(await client.getUser())
    isAuthenticated.set(true)
  } catch (e) {
    console.error('login error', e)
  } finally {
    popupOpen.set(false)
  }
}

const signUp = async client => {
  popupOpen.set(true)

  try {
    await client.loginWithPopup({ authorizationParams: { screen_hint: 'signup' } })

    user.set(await client.getUser())
    isAuthenticated.set(true)
  } catch (e) {
    // When user closes without signing up, throws an error,
    // so can customize and prompt them to signup
    console.error('login error', e)
  } finally {
    popupOpen.set(false)
  }
}

const logout = client => client.logout({ logoutParams: { returnTo: window.location.origin } })

export const auth = {
  createClient,
  loginWithPopup,
  signUp,
  logout,
}
