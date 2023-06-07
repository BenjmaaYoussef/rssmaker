import React, {useRef, useState} from 'react'
import { useAuth } from '../context/AuthContext'
import { Link, useNavigate } from 'react-router-dom'
import { useSnackbar } from 'notistack'

function Login() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const {login, currentUser} = useAuth()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const navigate =  useNavigate("")
    const { enqueueSnackbar, closeSnackbar } = useSnackbar()

    async function handleSubmit(e) {
        e.preventDefault()


        try {   
            setError("")
            setLoading(true)
            await login(emailRef.current.value, passwordRef.current.value)
            navigate("/")
            enqueueSnackbar('Logged in successfully', {
                variant: "success"
              })
        } catch {
            enqueueSnackbar('Failed to log in', {
                variant: "error"
              })
        }
        setLoading(false)
    }
  return (
    <div>
        <section className="px-4 py-24 mx-auto max-w-7xl">
  <div className="w-full mx-auto space-y-5 sm:w-8/12 md:w-6/12 lg:w-4/12 xl:w-3/12">
    <h1 className="text-4xl font-semibold text-center text-gray-900">Log in</h1>
    <form className="space-y-4" onSubmit={handleSubmit}>
      <label className="block">
        <span className="block mb-1 text-xs font-medium text-gray-700">Email</span>
        <input className="form-input" type="email" ref={emailRef} placeholder="name@example.com" required />
      </label>
      <br />
      <label className="block">
        <span className="block mb-1 text-xs font-medium text-gray-700">Password</span>
        <input className="form-input" type="password" ref={passwordRef} placeholder="••••••••" required />
      </label>
      <br />
      <input type="submit" className="w-full btn btn-primary btn-lg" value="Login" disabled={loading} />
      <br />
    </form>
    <p className="my-8 text-xs font-medium text-center text-gray-700">
      Need an account? <Link to="/signup">SIGN UP</Link>
    </p>
    <p className="my-8 text-xs font-medium text-center text-gray-700">
        <Link className="block mb-1 text-xs font-medium text-gray-700" to="/reset_password">Forgot password?</Link>
    </p>
  </div>
</section>


    </div>
  )
}

export default Login