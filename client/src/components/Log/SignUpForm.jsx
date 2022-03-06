// hooks
import { useState } from "react"

import axios from "axios"

// components
import SignInForm from "./SignInForm"


const SignUpForm = () => {
  const [formSubmit, setFormSubmit] = useState(false)

  const [pseudo, setPseudo] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [controlPassword, setControlPassword] = useState('')

  const handleRegister = async (e) => {
    e.preventDefault()
    console.log('register')
    const terms = document.getElementById('terms')
    const pseudoError = document.querySelector('.pseudo.error')
    const emailError = document.querySelector('.email.error')
    const passwordError = document.querySelector('.password.error')
    const controlPasswordError = document.querySelector('.control-password.error')
    const termsError = document.querySelector('.terms.error')

    pseudoError.innerHTML = ''
    emailError.innerHTML = ''
    passwordError.innerHTML = ''
    controlPasswordError.innerHTML = ''
    termsError.innerHTML = ''

    if (password !== controlPassword || !terms.checked) {
      if (password !== controlPassword) 
        controlPasswordError.innerHTML = 'Les mots de passe ne correspondent pas'

      if (!terms.checked)
        termsError.innerHTML = 'Veuillez valider les conditions générales'
    } else {
      console.log('else')
      await axios({
        method: 'post',
        url: `${process.env.REACT_APP_API_URL}api/user/register`,
        data: {
          pseudo,
          email,
          password
        }
      })
        .then((res) => {
          console.log("New user registered!")
          setFormSubmit(true)
        })
        .catch((err) => {
          const errors = err.response.data.errors
          pseudoError.innerHTML = errors.pseudo
          emailError.innerHTML = errors.email
          passwordError.innerHTML = errors.password
          console.log(err)
        })
    }
  }
  
  return (
    <>{/* FRAGMENT */}
      {formSubmit ? (
        <>
          <SignInForm />
          <h4 className="success">Enregistrement réussi, maintenant connectez-vous</h4>
        </>
      ) : (
        <form action="" onSubmit={handleRegister} id="sign-up-form">
        <label htmlFor="pseudo">Pseudo</label>
        <input 
          type="text" 
          name="pseudo" 
          id="pseudo" 
          value={pseudo} 
          onChange={(e) => setPseudo(e.target.value)} 
          />
        <div className="pseudo error"></div>
        <br />
        <label htmlFor="email">Email</label>
        <input 
          type="email" 
          name="email" 
          id="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
        />
        <div className="email error"></div>
        <br />
        <label htmlFor="password">Mot de passe</label>
        <input 
          type="password" 
          name="password" 
          id="password" 
          required
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          />
        <div className="password error"></div>
        <br />
        <label htmlFor="password-control">Confirmer mot de passe</label>
        <input 
          type="password" 
          name="password-control" 
          id="password-control" 
          required
          value={controlPassword} 
          onChange={(e) => setControlPassword(e.target.value)} 
        />
        <div className="control-password error"></div>
        <br />
        <input type="checkbox" id="terms" />
        <label htmlFor="terms">J'accepte les<a href="/" target="_blank" rel="noopener noreferrer">conditions générales</a></label>
        <div className="terms error"></div>
        <br />
        <input type="submit" value="Valider inscription" />
      </form>
      )}
    </>
  )
}

export default SignUpForm
