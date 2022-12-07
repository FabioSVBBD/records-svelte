import { Home, Transactions, NotFound } from '$/pages'

export const routeNameMap = [
  {
    route: '/',
    name: 'Home',
  },
  {
    route: '/#/transactions',
    name: 'Transactions',
  },
]

export const routes = {
  '/': Home,
  '/transactions': Transactions,
  '*': NotFound,
}
