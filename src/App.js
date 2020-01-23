import React from 'react'
import { ToastProvider } from 'react-toast-notifications'
import Header from './components/Header'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Home from './pages/Home'
import FaqEdit from './components/FaqEdit'
import './Faq.css'
import FaqGroup from './components/FaqGroup';

const App = () => {
  return (
    <ToastProvider>
      <Router>
        <Header />
        <div className='faq-container'>
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
        </div>
      </Router>
    </ToastProvider>
  );
}

export default App
