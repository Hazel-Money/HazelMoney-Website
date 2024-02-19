import React, { useState } from 'react';
import styled from 'styled-components';
import { user, emailIcon, pass, eye, eyeSlash } from '../../utils/Icons'; // Assuming you have eye and eyeSlash icons
import { useGlobalContext } from '../../context/globalContext';
import Button from '../Button/Button';
import { useNavigate } from "react-router-dom";
import hazelMoneyIcon from '../../img/hazelmoneyIcon2.png';

const LoginSignup = () => {
  const { registerUser, loginUser, language } = useGlobalContext();

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

  const [showPassword, setShowPassword] = useState(false);

  const { email, username, password } = signUpInputState;
  const { email: loginEmail, password: loginPassword } = loginInputState;

  const handleInput = (name) => (e) => {
    if (action === 'Sign Up') {
      setSignUpInputState({ ...signUpInputState, [name]: e.target.value });
    } else {
      setLoginInputState({ ...loginInputState, [name]: e.target.value });
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (action === 'Sign Up') {
      registerUser(signUpInputState);
      setSignUpInputState({
        email: '',
        username: '',
        password: ''
      });
    } else {
      loginUser(loginInputState, navigate);
      setLoginInputState({
        email: '',
        password: ''
      });
    }
  };

  const handleOnClick = () => {
    navigate('/');
  };

  return (
    <LoginSignupStyled onSubmit={handleSubmit} autoComplete="off">
      <div className="nav">
        <div className="icon">
          <img src={hazelMoneyIcon} alt="HazelMoney Icon" />
          <span onClick={handleOnClick}>HazelMoney</span>
        </div>
      </div>
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
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={action === 'Sign Up' ? password : loginPassword}
              onChange={handleInput('password')}
              required
            />
            <span className="eye-icon" onClick={togglePasswordVisibility}>
              {showPassword ? eyeSlash : eye}
            </span>
          </div>
        </div>
        <div className="submit-container">
          {language === 'Portuguese' ? 'Ir para' : 'Go to'}
          <p className="go" onClick={() => setAction(action === 'Login' ? 'Sign Up' : 'Login')}>
            {action === 'Login' ? (language === 'Portuguese' ? 'Registro' : 'Sign Up') : (language === 'Portuguese' ? 'Log in' : 'Log in')}
          </p>
        </div>
        <div className={action === 'Login' ? 'submit-btn login' : 'submit-btn signup'}>
          <Button
            name={action === 'Login' ? 'Login' : 'Sign Up'}
            bPad=".8rem 1.6rem"
            bRad="50px"
            bg="red"
            style={{ backgroundImage: 'var(--gradient)' }}
            color="#fff"
            cursor="pointer"
          />
        </div>
      </div>
    </LoginSignupStyled>
  );
};

const LoginSignupStyled = styled.form`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  .nav {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    display: flex;
    align-items: center; 
    padding: 20px;
    background-color: #ffffff; 
    height: 14vh;    
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

    .icon {
      margin-left: 3%;
      display: flex;
      align-items: center;

      img {
        width: 40px;
        height: auto; 
        margin-right: 10px; 
      }
    
      span {
        font-size: 24px; 
        font-weight: bold; 
        color:  #994700;
        cursor: pointer;
      }
    }
  }

  .container {
    margin-top: 15vh;
    display: flex;
    flex-direction: column;
    padding-top: 4vh;
    padding-bottom: 5vh;
    width: 80vw;
    max-width: 50vh; 
    border-radius: 7%;
    box-shadow: 0 2px 41px rgba(0, 0, 0, 0.2)
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
    color: var(--hazel-color);
    font-size: 6vw;
    font-weight: 700;
  }

  .underline {
    width: 7vw;
    height: 1px;
    background: var(--hazel-color);
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
    height: 7vh;
    background: #ffffff;
    border-radius: 30px;
    box-shadow: 0 2px 13px rgba(0, 0, 0, 0.1);
    position: relative;
  }

  .input span {
    margin: 0 1rem;
  }

  .eye-icon {
    position: absolute;
    right: 1.5rem;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
  }

  .input input {
    width: 64%;
    height: 50px;
    background: transparent !important;
    border: none;
    outline: none;
    color:#707070; 
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
    Button {
      background-image: var(--default-gradient) !important; 
    }
  }

  .login {
    margin-top: 7%;
  }

  .go {
    color: #994700;
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
`;

export default LoginSignup;
