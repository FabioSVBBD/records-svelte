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
    // eslint-disable-next-line no-restricted-syntax
    console.error('login error', e)
  } finally {
    popupOpen.set(false)
  }
}

const logout = client => client.logout({ logoutParams: { returnTo: window.location.origin } })

export const auth = {
  createClient,
  loginWithPopup,
  logout,
}
