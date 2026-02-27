import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export default function Protected({ children, authentication = true }) {

  const navigate = useNavigate()
  const authStatus = useSelector(state => state.auth.status)
  const [loading, setLoading] = useState(true)

  useEffect(() => {

    if (authentication && !authStatus) {
      navigate("/login")
    }

    if (!authentication && authStatus) {
      navigate("/")
    }

    setLoading(false)

  }, [authStatus, authentication, navigate])

  if (loading) {
    return <h1>Loading...</h1>
  }

  return <>{children}</>
}
