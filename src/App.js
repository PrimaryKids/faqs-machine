import React from 'react'
import { ToastProvider } from 'react-toast-notifications'
import Header from './components/Header'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import FaqList from './components/FaqList'
import FaqEdit from './components/FaqEdit'
import './Faq.css'

const App = () => {
  return (
    <ToastProvider>
      <Router>
        <Header />
        <div className='faq-container'>
          <Switch>
            <Route exact path='/'>
              <FaqList />
            </Route>
            <Route path='/faqs/:id/edit'>
              <FaqEdit />
            </Route>
          </Switch>
        </div>
      </Router>
    </ToastProvider>
  );
}

export default App
