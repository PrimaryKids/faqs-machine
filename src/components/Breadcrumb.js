import React, { useState, useEffect } from 'react'
import { Link, useLocation, useRouteMatch, useParams } from 'react-router-dom'

const Breadcrumbs = () => {
  const { pathname } = useLocation()
  const { faqGroupId, faqId } = useParams()
  // const match = useRouteMatch()

  return (
    <span>
      <Link to='/home' /> / <Link />
    </span>
  )
}
