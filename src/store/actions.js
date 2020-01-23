const BASE_URL = process.env.REACT_APP_API_BASE_URL

export const setIsSignedIn = (store, isSignedIn) => {
  store.setState({ isSignedIn })
}

export const setIdToken = (store, idToken) => {
  store.setState({ idToken })
}

export const setApiClient = (store) => {
  store.setState({ apiClient: {
    get: async (path) => {
      return await fetch(`${BASE_URL}/${path}`)
    },

    post: async (path, data) => {
      return await fetch(`${BASE_URL}/${path}`, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${store.state.idToken}`
        },
        body: JSON.stringify(data)
      })
    },

    put: async (path, data) => {
      return await fetch(`${BASE_URL}/${path}`, {
        method: 'PUT',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${store.state.idToken}`
        },
        body: JSON.stringify(data)
      })
    },

    delete: async (path) => {
      return await fetch(`${BASE_URL}/${path}`, {
        method: 'DELETE',
        mode: 'cors'
      })
    }
  } })
}
