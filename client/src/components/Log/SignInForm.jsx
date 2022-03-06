// hooks
import { useState } from 'react'

import axios from 'axios'

const SignInForm = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = (e) => {
    e.preventDefault()
    const emailError = document.querySelector('.email.error')
    const passwordError = document.querySelector('.password.error')

    axios({
      method: "post",
      url: `${process.env.REACT_APP_API_URL}api/user/login`,
      withCredentials: true,
      data: {
        email,
        password
      },
    })
      .then(response => {
        console.log("USER =>", response.data.user)
        window.location = '/'
      })
      .catch (err => {
        console.log("Error!!!")
        const errors = err.response.data.errors
        console.log("ERRORS => ", errors)
        console.log(Object.keys(errors))
        emailError.innerHTML = errors.email
        passwordError.innerHTML = errors.password
      })
    
  }

  return (
    <form action='' onSubmit={handleLogin} id='sign-in-form'>
      <label htmlFor='email'>Email</label>
      <br />
      <input 
        type='text' 
        name='email' 
        id='email' 
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />
      <div className="email error"></div>
      <br />
      <label htmlFor='password'>Password</label>
      <input 
        type='password'
        name='password'
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />
      <div className="password error"></div>
      <br />
      <input type='submit' value='Se connecter' />
    </form>
  )
}

export default SignInForm

