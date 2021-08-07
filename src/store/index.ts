import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { rootReducer } from './RouteReducer'

export const store = createStore(rootReducer, compose(
  applyMiddleware(thunk),
  ((window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__()) || compose
))

store.subscribe(() => {
  console.log(`Store State: ${JSON.stringify(store.getState())}`)
})