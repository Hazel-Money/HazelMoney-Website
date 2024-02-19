import React, { useState } from 'react'
import styled from 'styled-components'
import { user, emailIcon, pass } from '../../utils/Icons'
import { useGlobalContext } from '../../context/globalContext'
import Button from '../Button/Button'
import { useNavigate } from "react-router-dom";


const LoginSignup = () => {
  const { registerUser, loginUser } = useGlobalContext()

  const [action, setAction] = useState('Login')
  const [signUpInputState, setSignUpInputState] = useState({
    email: '',
    username: '',
    password: ''
  })

  const [loginInputState, setLoginInputState] = useState({
    email: '',
    password: ''
  })

  const { email, username, password } = signUpInputState
  const { email: loginEmail, password: loginPassword } = loginInputState

  const handleInput = (name) => (e) => {
    if (action === 'Sign Up') {
      setSignUpInputState({ ...signUpInputState, [name]: e.target.value })
    } else {
      setLoginInputState({ ...loginInputState, [name]: e.target.value })
    }
  }
  
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault()
    if (action === 'Sign Up') {
      registerUser(signUpInputState)
      setSignUpInputState({
        email: '',
        username: '',
        password: ''
      })
    } else {
      loginUser(loginInputState, navigate)
      setLoginInputState({
        email: '',
        password: ''
      })
    }
  }

  return (
    <LoginSignupStyled onSubmit={handleSubmit} autoComplete="off">
      <div className="container">
        <div className="header">
          <div className="text">{action}</div>
          <div className="underline"></div>
        </div>
        <div className="inputs">
          {action === 'Login' ? (
            <div></div>
          ) : (
            <div className="input">
              <span>{user}</span>
              <input
                type="text"
                placeholder="Username"
                value={action === 'Sign Up' ? username : loginEmail}
                onChange={handleInput('username')}
                required
              />
            </div>
          )}
          <div className="input">
            <span>{emailIcon}</span>
            <input
              type="email"
              placeholder="Email"
              value={action === 'Sign Up' ? email : loginEmail}
              onChange={handleInput('email')}
              required
            />
          </div>
          <div className="input">
            <span>{pass}</span>
            <input
              type="password"
              placeholder="Password"
              value={action === 'Sign Up' ? password : loginPassword}
              onChange={handleInput('password')}
              required
            />
          </div>
        </div>
        <div className="submit-container">
          Go to
          <p className="go" onClick={() => setAction(action === 'Login' ? 'Sign Up' : 'Login')}>
            {action === 'Login' ? 'Sign Up' : 'Login'}
          </p>
        </div>
        <div className={action === 'Login' ? 'submit-btn login' : 'submit-btn signup'}>
          <Button
            name={action === 'Login' ? 'Login' : 'Sign Up'}
            bPad=".8rem 1.6rem"
            bRad="50px"
            bg="#4c00b4"
            color="#fff"
            cursor="pointer"
          />
        </div>
      </div>
    </LoginSignupStyled>
  )
}

const LoginSignupStyled = styled.form`
  height: 100vh;
  background: linear-gradient(135deg, #a997de, #0c3cb4);
  display: flex;
  justify-content: center;
  align-items: center;

  .container {
    display: flex;
    flex-direction: column;
    background: #fff;
    padding-top: 4vh;
    padding-bottom: 5vh;
    width: 80vw;
    max-width: 400px; 
    border-radius: 7%;
  }

  .header {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 9px;
    width: 100%;
    margin-top: 0;
  }

  .text {
    color: #3c009d;
    font-size: 6vw;
    font-weight: 700;
  }

  .underline {
    width: 7vw;
    height: 1px;
    background: #3c009d;
    border-radius: 9px;
  }

  .inputs {
    margin-top: 5vh;
    display: flex;
    flex-direction: column;
    gap: 4vh;
    padding: 0 2vw;
  }

  .input {
    display: flex;
    align-items: center;
    width: 100%;
    height: 10vh;
    background: #eaeaea;
    border-radius: 30px;
  }

  .input span {
    margin: 0px 3vw;
  }

  .input input {
    width: 100%;
    height: 50px;
    background: transparent !important;
    border: none;
    outline: none;
    color: #797979;
    font-size: 4vw;
  }

  .submit-container {
    display: flex;
    justify-content: center;
    gap: 10px;
    margin: 2vh auto;
  }

  .submit-btn {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .login {
    margin-top: 7%;
  }

  .go {
    color: #3c009d;
    cursor: pointer;
    margin-left: 0;
  }

  @media screen and (min-width: 768px) {
    .text {
      font-size: 3rem;
    }

    .underline {
      width: 3rem;
    }

    .input input {
      font-size: 1.2rem;
    }
  }

`

export default LoginSignup
