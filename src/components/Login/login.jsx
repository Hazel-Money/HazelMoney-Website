import React, { useState } from 'react'
import styled from 'styled-components'
import {user, emailIcon, pass} from '../../utils/Icons'
import { useGlobalContext } from '../../context/globalContext';
import Button from '../Button/Button';

const LoginSignup = () => {
  const {registerUser, loginUser, loginError, setLoginError} = useGlobalContext();

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
    setLoginError('');
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
    <LoginSignupStyled onSubmit={handleSubmit} autoComplete="off">
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
        <div className='submit-container'>
          Go to
          <p className='go' onClick={() => { setAction(action === 'Login' ? 'Sign Up' : 'Login') }}>
            {action === 'Login' ? 'Sign Up' : 'Login'}
          </p>
        </div>
        {loginError && <p className='error'>{loginError}</p>}
        <div className="submit-btn">
            <Button
              name={action==='Login' ? 'Login' : 'Sign Up'}
              bPad={".8rem 1.6rem"}
              bRad={"50px"}
              bg={"#4c00b4"}
              color={"#fff"}
              cursor={"pointer"}
            />
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
    .error {
      text-align: center;
    }
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
  .submit-container{
    display: flex;
    gap: 10px;
    margin: 20px auto;
    margin-left: 10vh; 
  }
  .Button{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 220px;
    height: 59px;
    font-size: 19px;
    font-weight: 700;
    cursor: pointer;
  }
  .submit-btn{
    margin-top: 3vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .go{
    color: #3c009d;
    cursor: pointer;
    margin-left: 0;
  }

`;

export default LoginSignup;