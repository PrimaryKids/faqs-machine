import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../svgs/primary-logo-small.svg'

const Header = () => {
  return (
    <header className='faq-container faq-header faq-p-t-3 faq-p-b-3 faq-m-b-4'>
      <div className='faq-d-flex faq-flex-justify-space-between'>
        <img src={logo} alt='logo' className='faq-logo' />
        <Link to='/' className='faq-text-link--secondary'>Home</Link>
      </div>
      <h1 className="faq-title--lg">FAQs Machine</h1>
    </header>
  )
}

export default Header
