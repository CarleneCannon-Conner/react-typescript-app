import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter, Route } from 'react-router-dom';
import App from './App'
import { store } from '../../store'
import { create } from 'react-test-renderer'

const contextProvider = (component: JSX.Element) => 
<Provider store={store}>
      <BrowserRouter>
      <Route
        exact
        path='/'>
          {component}
        </Route>
      </BrowserRouter>
      </Provider>

describe('<App />',() => {
  test('Snapshot test', () => {
    let tree = create(contextProvider(
      <App userType='admin' userName='someone' />
    ))
    expect(tree.toJSON()).toMatchSnapshot()
  })
})