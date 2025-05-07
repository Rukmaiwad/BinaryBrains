import { CredentialResponse, GoogleLogin } from '@react-oauth/google'
import axios from 'axios'
import { Navigate, useNavigate } from 'react-router-dom'
import { GOOGLE_LOGIN_ROUTE, MAIL_LOGIN_ROUTE } from '@/utils/Urlpaths'
import { useDispatch } from 'react-redux'
import { getIsLoggedIn, setUser } from '@/redux/slices/User'
import { showToast } from '@/utils/toast'
import { Input } from '@/components/ui/input'
import { EyeClosed, Eye, Lock, Mail } from 'lucide-react'
import { useState } from 'react'
import { useAppSelector } from '@/redux/hooks'

const LoginPage = () => {
  const dispatch = useDispatch()
  const isLoggedIn = useAppSelector(getIsLoggedIn);
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const googleResponse = async (res: CredentialResponse) => {
    try {
      const token = res.credential
      if (!token) {
        showToast({
          title: "ERROR",
          description: "No credential returned from Google",
          color: "red"
        })
        return
      }

      setIsLoading(true)
      const response = await axios.post(GOOGLE_LOGIN_ROUTE, { token })

      if (response.status === 200 || response.status === 201) {
        handleLoginSuccess(response.data?.data)
      }
    } catch (error: any) {
      console.error('Google login error:', error)
      showToast({
        title: "ERROR",
        description: error.response?.data?.message || "Google login failed",
        color: "red"
      })
    } finally {
      setIsLoading(false)
    }
  }

  const validEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return re.test(email)
  }

  const loginWithMail = async () => {
    if (!validEmail(email)) {
      showToast({
        title: "ERROR",
        description: "Please enter a valid email address",
        color: "red"
      })
      return
    }

    if (!password) {
      showToast({
        title: "ERROR",
        description: "Please enter your password",
        color: "red"
      })
      return
    }

    try {
      setIsLoading(true)
      const response = await axios.post(MAIL_LOGIN_ROUTE, { email, password })

      if (response.status === 200 || response.status === 201) {
        handleLoginSuccess(response.data?.data)
      } else if (response.status === 403) {
        showToast({
          title: "INCORRECT PASSWORD",
          description: "Login failed, Please Check Your Password",
          color: "red"
        })
      } else if (response.status === 404) {
        showToast({
          title: "INVALID CREDENTIALS",
          description: "Login failed, Please SignUp",
          color: "red"
        })
      }

    } catch (error: any) {
      console.error('Login error:', error)
      showToast({
        title: "ERROR",
        description: error.response?.data?.message || "Login failed",
        color: "red"
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleLoginSuccess = (data: any) => {

    dispatch(
      setUser({
        firstName: data.firstName,
        lastName: data.lastName,
        avatar: data.avatar,
        userName: data.userName,
        newComer: data.newComer,
        token: data.token,
        refreshToken: data.refreshToken,
        isLoggedIn: true
      })
    )
    showToast({
      title: "Success",
      description: "You have successfully logged in to BinaryBrains!",
      color: "green",
      duration: 1500
    })
    // Redirect to home page after successful login
    navigate('/')
  }

  const handleForgotPassword = () => {
    navigate('/forgot-password')
  }

  const handleSignUp = () => {
    navigate('/signup')
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  if(isLoggedIn) {
    return <Navigate to={'/'} />
  }

  return (
    <div className="py-20 flex items-center justify-center">
      <div className="bg-black-1000 rounded-2xl shadow-lg p-10 max-w-md w-full text-center border border-gray-500">
        <h1 className="text-2xl font-semibold mb-1">Welcome to</h1>
        <h2 style={{ fontFamily: 'fantasy' }} className="text-red-600 text-4xl font-bold font-mono mb-6">
          Binary <span className='text-white' >Brains</span>
        </h2>

        <div className="text-gray-500 mb-6">— or sign in with email —</div>

        <form className="space-y-4 text-left">
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="email"
              value={email}
              color='black'
              onChange={(e) => setEmail(e.target.value)}
              placeholder="binarybrains@gmail.com"
              className="pl-10 pr-4 py-2 w-full text-black border rounded-lg shadow-sm"
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type={showPassword ? "text" : "password"}
              value={password}
              color='black'
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="pl-10 pr-10 py-2 w-full text-black border rounded-lg shadow-sm"
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <Eye className="w-5 h-5" /> : <EyeClosed className="w-5 h-5" />}
            </button>
          </div>

          <div className='flex justify-center mb-6'>
            <button
              type="button"
              onClick={loginWithMail}
              disabled={isLoading}
              className={`w-40 text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {isLoading ? 'Logging In...' : 'Login'}
            </button>
          </div>

          <div className='text-center'>
            <button
              type="button"
              onClick={handleForgotPassword}
              className="hover:text-red-500 mb-4"
            >
              Forgot Password?
            </button>

            <div className="flex justify-center mb-6 py-3">
              <GoogleLogin
                width={250}
                theme={'filled_black'}
                useOneTap={true}
                onSuccess={googleResponse}
                onError={() => {
                  showToast({
                    title: "ERROR",
                    description: "Google login failed",
                    color: "red"
                  })
                }}
              />
            </div>

            <button
              type="button"
              onClick={handleSignUp}
              className=""
            >
              Don't you have an account? <span className='text-red-500 text-lg'>Sign Up</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default LoginPage