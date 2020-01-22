import React from 'react'
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
  );
}

export default App
