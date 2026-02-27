import React from 'react'
import { Container, Logo, LogoutBtn } from '../index.js'
import { useSelector } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'

function Header() {
  const authStatus = useSelector((state) => state.auth.status)
  const navigate = useNavigate()

  const navItems = [
    {
      name: 'Home',
      slug: '/',
      active: true,
    },
    {
      name: 'Login',
      slug: '/login',
      active: !authStatus,
    },
    {
      name: 'Signup',
      slug: '/signup',
      active: !authStatus,
    },
    {
      name: 'All Posts',
      slug: '/all-posts',
      active: authStatus,
    },
    {
      name: 'Add Post',
      slug: '/add-post',
      active: authStatus,
    },
  ]

  return (
    <header className="bg-slate-900 shadow-md sticky top-0 z-50">
      <Container>
        <nav className="flex items-center justify-between py-4">

          {/* Logo */}
          <Link to="/">
            <Logo width={150} />
          </Link>

          {/* Navigation */}
          <ul className="flex items-center gap-8 text-gray-300 font-medium">
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <button
                    onClick={() => navigate(item.slug)}
                    className="hover:text-white transition duration-200"
                  >
                    {item.name}
                  </button>
                </li>
              ) : null
            )}

            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>

        </nav>
      </Container>
    </header>
  )
}

export default Header
