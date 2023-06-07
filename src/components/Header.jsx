import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useSnackbar } from 'notistack'


function Header() {
  
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()
  const {logout, currentUser} = useAuth()
  const navigate =  useNavigate("")

  async function handleLogout() {
    try {
      await logout()
      navigate("/login")
      enqueueSnackbar('Logged out successfully', {
        variant: "success"
      })
    } catch {
      enqueueSnackbar('Failed to log out', {
        variant: "error"
      })
    }
  }

  return (
        <header className="z-30 w-full px-2 py-4 bg-gray-100 sm:px-4">
  <div className="flex items-center justify-between mx-auto max-w-7xl">
    {currentUser && <div className="flex items-center space-x-1" >
    <Link to="my_feeds"><button className='btn btn-primary'>{currentUser.email}</button></Link>
    </div>}
    <div className="relative hidden space-x-1 md:inline-flex" x-data="{ one: false, two: false }">
      <div className="relative">
        <Link to="/">
      <img style={{width: "50px"}}  src="https://wp-assets.rss.com/blog/wp-content/uploads/2019/10/10111557/social_style_3_rss-512-1.png"/>
        </Link>
      </div>
    </div>
    {currentUser && <div className="flex items-center space-x-1">
      <button className='btn btn-primary' onClick={handleLogout}>Log Out</button>
    </div>}
  </div>
</header>
  )
}

export default Header