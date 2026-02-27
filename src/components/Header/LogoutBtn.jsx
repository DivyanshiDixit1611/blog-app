import React from 'react'
import { useDispatch } from 'react-redux'
import authService from '../../appwrite/Auth.js'
import { logout } from '../../store/AuthSlice'

function LogoutBtn() {
  const dispatch = useDispatch()

  const logoutHandler = async () => {
    try {
      await authService.logout()
      dispatch(logout())
    } catch (error) {
      console.error("Logout failed:", error)
    }
  }

  return (
    <button
      onClick={logoutHandler}
      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-200"
    >
      Logout
    </button>
  )
}

export default LogoutBtn
