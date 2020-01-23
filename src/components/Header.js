import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../svgs/primary-logo-small.svg'

const Header = () => {
  return (
    <header className='faq-header'>
      <div className='container'>
        <img src={logo} alt='logo' className='faq-logo' />
        <nav className="faq-nav">
          <ul className="faq-nav-list">
            <li>
              <Link to='/' className="faq-text-link--secondary">Home</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header
