import React from 'react'
import logo from '../assets/logo.png'

function Logo({ width = 150 }) {
  return (
    <img
      src={logo}
      alt="BlogSphere"
      style={{ width: `${width}px` }}
      className="object-contain"
    />
  )
}

export default Logo
