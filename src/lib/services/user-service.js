import { authorizedFetch } from './authorized-fetch'
import { config } from 'src/config'

const { domain } = config

const postUser = async id => {
  const res = await authorizedFetch(`${domain}/users?id=${id}`, { method: 'POST' })

  if (!res.ok) {
    throw new Error('/users POST failure')
  }

  const json = await res.json()

  return json.value
}

export { postUser }
