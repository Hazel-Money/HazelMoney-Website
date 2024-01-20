import React, { useState } from 'react'
import styled from 'styled-components'
import {user, emailIcon, pass} from '../../utils/Icons'
import { useGlobalContext } from '../../context/globalContext';

const LoginSignup = () => {
  const {registerUser, loginUser} = useGlobalContext();

  const [action, setAction] = useState('Login');
  const [signUpInputState, setSignUpInputState] = useState({
    email: '',
    username: '',
    password: ''
  });

  const [loginInputState, setLoginInputState] = useState({
    email: '',
    password: ''
  });

  const { email, username, password } = signUpInputState;
  const { email: loginEmail, password: loginPassword } = loginInputState;
  
  const handleInput = (name) => (e) => {
    if (action === 'Sign Up'){
      setSignUpInputState({ ...signUpInputState, [name]: e.target.value });
    } else {
      setLoginInputState({ ...loginInputState, [name]: e.target.value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if(action==='Sign Up'){
      registerUser(signUpInputState);
      setSignUpInputState({
        email: '', 
        username: '',
        password: '',
      })
    } else {
      loginUser(loginInputState)
      setLoginInputState({
        email: '', 
        password: '',
      })
    }

    
  };

  return (
    <LoginSignupStyled  autoComplete="off">
      <div className='container'>
        <div className="header">
          <div className="text">{action}</div>
          <div className='underline'></div>
        </div>
        <div className="inputs">
          {action === 'Login' ? <div></div> : 
            <div className="input">
              <span>
                {user}
              </span>
              <input type="text" placeholder='Username' onChange={handleInput("username")}/>
            </div>
          }
          <div className="input">
            <span>
              {emailIcon}
            </span>
            <input type="email" placeholder='Email' onChange={handleInput("email")}/>
          </div>
          <div className="input">
            <span>
              {pass}
            </span>
            <input type="password" placeholder='Password' onChange={handleInput("password")}/>
          </div>
        </div>
        {action==='Sign Up' ? <div></div> : 
          <div className='forgot-password'>
            Lost Password? <span>Click here!</span>
          </div>
        }
        <div className='submit-container'>
          <div className={action === 'Sign Up' ? 'submit gray' : 'submit'} onClick={() => { setAction("Sign Up")}}>Sign Up</div>
          <div className={action === 'Login' ? 'submit gray' : 'submit'} onClick={() => { setAction("Login")}}>Login</div>
        </div>
      </div>
    </LoginSignupStyled>
  );
};



const LoginSignupStyled = styled.form`
  height: 100vh;
  background: linear-gradient(135deg, #cb6e00,#9f4c00);
  display:flex;
  flex-direction: column;

  .container{
    display:flex;
    flex-direction: column;
    margin: auto;
    background: #fff;
    padding-top: 4vh;
    padding-bottom: 30px;
    width: 80vh;
    height: 80vh;
    border-radius: 7%;
  }
  .header{
    display:flex;
    flex-direction:column;
    align-items: center;
    gap: 9px;
    width: 100%;
    margin-top: 0;
  }
  .text{
    color: #3c009d;
    font-size: 6vh;
    font-weight:700;
  }
  .underline{
    width: 7vh;
    height: 1vh;
    background: #3c009d;
    border-radius: 9px;
  }
  .inputs{
    margin-top: 5vh;
    display: flex;
    flex-direction: column;
    gap: 4vh;
  }
  .input{
    display: flex;
    align-items: center;
    margin: auto;
    width: 63vh;
    height: 10vh;
    background: #eaeaea;
    border-radius: 30px;
  }
  .input span{
    margin: 0px 30px;
  }
  .input input{
    width: 400px;
    height: 50px;
    background: transparent !important;
    border: none;
    outline: none;
    color: #797979;
    font-size: 19px;
  }
  .forgot-password{
    padding-left: 62px;
    margin-top: 27px;
    color: #797979;
    font-size: 18px;
  }
  .forgot-password span{
    color: #4c00b4;
    cursor: pointer;
  }
  .submit-container{
    display: flex;
    gap: 30px;
    margin: 60px auto;
  }
  .submit{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 220px;
    height: 59px;
    color: #fff;
    background: #4c00b4;
    border-radius: 50px;
    font-size: 19px;
    font-weight: 700;
    cursor: pointer;
  }
  .gray{
    background: #eaeaea;
    color: #676767;
  }

`;

export default LoginSignup;