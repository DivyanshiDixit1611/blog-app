import { useEffect, useState } from 'react'
import { login, logout } from "./store/AuthSlice"
import { useDispatch } from 'react-redux'
import authService from "./appwrite/Auth"
import { Footer, Header } from './components/index'
import { Outlet } from 'react-router-dom'

function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    authService.getCurrentUser()
      .then((user) => {
        if (user) {
          dispatch(login(user))   // ✅ FIXED
        } else {
          dispatch(logout())
        }
      })
      .finally(() => setLoading(false))
  }, [dispatch])

  if (loading) {
    return <h1>Loading...</h1>
  }

  return (
    <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
      <div className='w-full block'>
        <Header />
        <Outlet />
        <Footer />
      </div>
    </div>
  )
}

export default App
