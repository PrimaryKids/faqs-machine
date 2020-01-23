import React, { useState } from 'react'
import { ToastProvider } from 'react-toast-notifications'
import Header from './components/Header'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom'
import Home from './pages/Home'
import FaqEdit from './components/FaqEdit'
import './Faq.css'
import FaqGroup from './components/FaqGroup'
import GoogleLogin from 'react-google-login'
import useGlobal from './store'

const App = () => {
  const [error, onFailure] = useState(null)
  const [globalState, globalActions] = useGlobal()

  const getContent = () => {
    if (globalState.isSignedIn) {
      return (
        <Switch>
          <Route exact path='/'>
            <Home />
          </Route>
          <Route exact path='/faq-groups/:faqGroupId'>
            <FaqGroup />
          </Route>
          <Route path='/faq-groups/:faqGroupId/faqs/:faqId/edit'>
            <FaqEdit />
          </Route>
        </Switch>
      )
    } else {
      return (
        <>
          {error && <span>{error.message}</span>}
          <GoogleLogin
            clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
            onSuccess={onSuccess}
            onFailure={onFailure}
          />
        </>
      )
    }
  }

  const onSuccess = response => {
    globalActions.setIdToken(response.tokenId)
    globalActions.setApiClient()
    globalActions.setIsSignedIn(true)
  }

  return (
    <ToastProvider>
      <Router>
        <Header />
        <div className='faq-container'>
          {getContent()}
        </div>
      </Router>
    </ToastProvider>
  )
}

export default App
