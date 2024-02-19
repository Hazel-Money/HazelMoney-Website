import React from 'react';
import styled from "styled-components";
import hazelMoneyIcon from '../../img/hazelmoneyIcon2.png';
import graphImage from '../../img/imagemloca.jpg';
import waveSVG from '../../img/onda.svg';
import Button from '../Button/Button';
import { plus } from '../../utils/Icons';
import { useGlobalContext } from '../../context/globalContext';
import LoginSignup from "../Login/login";

function Landing() {
    const { language, showLogin, setShowLogin } = useGlobalContext();

    const handleSignupClick = () => {
        setShowLogin(true);
    };

    return (
        <LandingStyled>
            {showLogin && <LoginSignup />}
            <div className="landing">
                <div className="nav">
                    <div className="icon">
                        <img src={hazelMoneyIcon} alt="HazelMoney Icon" />
                        <span>HazelMoney</span>
                    </div>
                    <div className="login-button">
                        <Button
                            name={language === 'Portuguese' ? 'Log in' : 'Entrar'}
                            bPad={".8rem 1.6rem"}
                            icon={plus}
                            bRad={"30px"}
                            bg={"#994700"}
                            color={"#fff"}
                            onClick={handleSignupClick}
                        />
                    </div>
                </div>
                <div className="middle-content">
                    <div className="content">
                        <h2>Take control</h2><h1>of your money</h1>
                        <p>Personal budgeting is the secret to financial freedom. Start your journey today.</p>
                        <Button
                            name={language === 'Portuguese' ? 'Sign up' : 'Registro'}
                            bPad={".8rem 1.6rem"}
                            icon={plus}
                            bRad={"30px"}
                            bg={"#994700"}
                            color={"#fff"}
                            onClick={handleSignupClick}
                        />
                    </div>
                    <img src={graphImage} alt="Graph" className="graph" />
                </div>
                <div className="wave">
                    <img src={waveSVG} alt="Wave" />
                </div>
            </div>
        </LandingStyled>
    );
}

const LandingStyled = styled.div`
    overflow:none;

    .nav {
        display: flex;
        align-items: center; 
        padding: 20px;
        background-color: #ffffff; 
        height: 20vh;    

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
                color: 	#994700;
            }
        }

        .login-button {
            margin-left: auto; 
            margin-right: 3%;
        }
    }

    .middle-content {
        display: flex;
        justify-content: space-between; 
        align-items: center;
        height: calc(60vh - 100px);
        padding: 0 20px; 
        margin-top: 10vh;
        margin-right: 4vh;
    }

    .content {
        margin-top: 5vh;
        margin-left: 24vh;
        display: flex;
        flex-direction: column;
        text-align: left;
        width: 30%;
        margin-right: 20px;
        h1{
            color: #994700 !important;
            font-size: 9vh;
            margin-bottom: 2vh;
        }
        h2{
            color: #1d1a1799 !important;
            font-size: 6vh;
            margin-top: 0;
        }

        Button {
            width: 30vh;
            margin-top: 3vh;
            display: flex;
            justify-content: center;
        }
    }

    .graph {
        width: 40%; 
        height: auto;
    }

    .wave {
        position: fixed; 
        bottom: -11%; 
        left: 0;
        width: 100%;
        z-index: -1;
    }

`;

export default Landing;
