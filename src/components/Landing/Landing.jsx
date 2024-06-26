import React from 'react';
import styled from "styled-components";
import hazelMoneyIcon from '../../img/hazelmoneyIcon2.png';
import graphImage from '../../img/woman_money.svg';
import waveSVG from '../../img/onda.svg';
import Button from '../Button/Button';
import { plus } from '../../utils/Icons';
import { useGlobalContext } from '../../context/globalContext';
import { useNavigate } from "react-router-dom";

function Landing() {
    const { language, setLanguage } = useGlobalContext();
    const navigate = useNavigate();

    if (localStorage.getItem('environmentLanguage') === null) {
        const language = navigator.language.startsWith('pt') ? "Portuguese" : "English";
        setLanguage(language);
        localStorage.setItem('environmentLanguage', language);
    }

    const handleSignupClick = () => {
        navigate('/login');
    };

    return (
        <LandingStyled>
            <div className="landing">
                <div className="nav">
                    <div className="icon">
                        <img src={hazelMoneyIcon} alt="HazelMoney Icon" />
                        <span>HazelMoney</span>
                    </div>
                </div>
                <div className="middle-content">
                    <div className="content">
                        <h2>{language === 'Portuguese' ? 'Ganha controlo' : 'Take control'}</h2>
                        <h1>{language === 'Portuguese' ? 'do teu dinheiro' : 'of your money'}</h1>
                        <p>{language === 'Portuguese' ? 'O orçamento pessoal é o segredo para a liberdade financeira. Comece hoje a sua viagem.' : 'Personal budgeting is the secret to financial freedom. Start your journey today.'}</p>
                        <Button
                            name={language === 'Portuguese' ? 'Entrar' : 'Login'}
                            bPad={".8rem 1.6rem"}
                            icon={plus}
                            bRad={"30px"}
                            bg={"#994700"}
                            color={"#fff"}
                            onClick={handleSignupClick}
                            cursor={"pointer"}
                        />
                    </div>
                    <img src={graphImage} alt="Graph" className="graph" />
                </div>
            </div>
            <div className="wave">
                <img src={waveSVG} alt="Wave" />
            </div>
        </LandingStyled>
    );
}

const LandingStyled = styled.div`
    overflow: none;

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
                color:  #994700;
            }
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

        .content {
            margin-top: 5vh;
            margin-left: 24vh;
            display: flex;
            flex-direction: column;
            text-align: left;
            width: 35%;
            margin-right: 20px;
            h1{
                color: var(--hazel-color) !important;
                font-size: 9vh;
                margin-bottom: 2vh;
            }
            h2{
                color: var(--primary-color) !important;
                font-size: 6vh;
                margin-top: 0;
            }
            p{
                color: #484761 !important;
            }
            Button {
                width: 30vh;
                margin-top: 3vh;
                display: flex;
                justify-content: center;
                background-image: var(--default-gradient) !important; 
            }
        }
        .graph {
            width: 40%; 
            height: auto;
        }
    }

    
    .wave {
        position: fixed; 
        bottom: -11%; 
        left: 0;
        width: 100%;
        z-index: -1;
    }

    @media only screen and (max-width: 600px) {
        .wave{
            bottom: -25%;
        }

        .middle-content{
            flex-direction: column; 
            justify-content: center; 
            align-items: center; 
            height: 50%;
            margin:0;
            .content{
                width: 100%;
                margin: 0;
                text-align: center;
                align-items: center; 
                h1{
                    font-size: 7vh;
                    width: 100%;
                    margin-bottom: 1vh;
                }
                h2{
                    width: 100%;
                    font-size: 5vh;
                    margin-top: 0;
                }
                p{
                    font-size: 3vh;
                    width: 100%;
                }
                Button {
                    width: 60%; 
                    margin-top: 20px; 
                    background-image: var(--default-gradient) !important; 
                }
            }
            .graph{
                width: 100%; 
                margin-top: 50px;
                height: 150px;
            }
        }
    }
`;

export default Landing;
