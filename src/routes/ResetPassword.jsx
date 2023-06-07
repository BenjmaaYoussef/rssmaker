import React, {useRef, useState} from 'react'
import { useAuth } from '../context/AuthContext'
import { Link, useNavigate } from 'react-router-dom'
import { useSnackbar } from 'notistack'

function ResetPassword() {
    const emailRef = useRef()
    const { enqueueSnackbar, closeSnackbar } = useSnackbar()

    const {resetPassword} = useAuth()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    async function handleSubmit(e) {
        e.preventDefault()


        try {   
            setError("")
            setLoading(true)
            await resetPassword(emailRef.current.value)
            enqueueSnackbar('Check your inbox for further instructions')
        } catch {
            enqueueSnackbar('Failed to reset password')
        }
    }
  return (
    <div>
        <section className="px-4 py-24 mx-auto max-w-7xl">
  <div className="w-full mx-auto space-y-5 sm:w-8/12 md:w-6/12 lg:w-4/12 xl:w-3/12">
    <h1 className="text-4xl font-semibold text-center text-gray-900">Reset your password</h1>
    <form className="space-y-4" onSubmit={handleSubmit}>
      <label className="block">
        <span className="block mb-1 text-xs font-medium text-gray-700">Email</span>
        <input className="form-input" type="email" ref={emailRef} placeholder="name@example.com" required />
      </label>
      <br />
      <input type="submit" className="w-full btn btn-primary btn-lg" value="Reset" disabled={loading} />
      <br />
    </form>
    <p className="my-8 text-xs font-medium text-center text-gray-700">
        <Link className="block mb-1 text-xs font-medium text-gray-700" to="/login">Login</Link>
    </p>
  </div>
</section>


    </div>
  )
}

export default ResetPassword