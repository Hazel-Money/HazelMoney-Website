import {createGlobalStyle} from 'styled-components'

export const GlobalStyle = createGlobalStyle`
    *{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        list-style: none;
    }

    :root{
        --primary-color: #3b3b3c;
        --primary-color2: #555555;
        --primary-color3: #b6b1a7;
        --hazel-color: #A64F0D;
        --hazel-color-dark: #994700;
        --hazel-color-light: #cc6633;
        --default-gradient: linear-gradient(45deg, #cc6633, #994700);
        --reverse-gradient: linear-gradient(45deg, #994700, #cc6633);
        --color-green: #42AD00;
        --color-accent: #A64F0D;
        --background-color: rgba(252, 246, 249, 0.78);
        --background: #eee2f2;

        --primary-text-color: #0a0a0a;
        --secondary-text-color: #ffffff;
        --toggle-bg: #f0eb9d;
        --toggle-fg: #ffd000;
    }

    [data-theme=true] {
        --primary-color: #ffffff;
        --primary-color2: #ffffff;
        --primary-color3: #ffffff;
        --background-color: #222224;
        --background: #2e3134;
        
        --primary-text-color: #f6f6f6;
        --secondary-text-color: #0a0a0a;
        --toggle-bg: #283452;
        --toggle-fg: #00a6ff;
    }

    body{
        font-family: 'Nunito', sans-serif;
        font-size: clamp(1rem, 1.5vw, 1.2rem);
        overflow: hidden;
        color: rgba(34, 34, 96, .6);
    }

    h1, h2, h3, h4, h5, h6{
        color: var(--primary-color);
    }

    .error{
        color: red;
        animation: shake 0.5s ease-in-out;
        @keyframes shake {
            0%{
                transform: translateX(0);
            }
            25%{
                transform: translateX(10px);
            }
            50%{
                transform: translateX(-10px);
            }
            75%{
                transform: translateX(10px);
            }
            100%{
                transform: translateX(0);
            }
        }
    }

`;