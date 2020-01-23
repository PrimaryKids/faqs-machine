import React from 'react'
import useGlobalHook from 'use-global-hook'

import * as actions from './actions'

const initialState = {
  isSignedIn: false,
  idToken: null,
  apiClient: null
}

const useGlobal = useGlobalHook(React, initialState, actions)

export default useGlobal
