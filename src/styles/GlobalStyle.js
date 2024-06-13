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
        --primary-color3: #a49c95;
        --border-color: #ffffff;
        --hazel-color: #A64F0D;
        --hazel-color-dark: #994700;
        --hazel-color-light: #cc6633;
        --default-gradient: linear-gradient(45deg, #cc6633, #994700);
        --reverse-gradient: linear-gradient(45deg, #994700, #cc6633);
        --color-green: #42AD00;
        --color-accent: #A64F0D;
        --background-color: rgba(252, 246, 249, 0.78);
        --background: #eee2f2;
        --white-color: #FCF6F9;

        --primary-text-color: #090909;
        --secondary-text-color: #ffffff;
        --toggle-bg: #f0eb9d;
        --toggle-fg: #ffd000;
    }

    [data-theme=true] {
        /* Primary Colors */
        --primary-color: #c4c4c5;         /* Inverted Dark Gray */
        --primary-color2: #aaaaaa;        /* Inverted Medium Gray */
        --primary-color3: #696c73;        /* Inverted Light Gray */

        --border-color: #48485a;

        /* Hazel Colors */
        --hazel-color: #A64F0D;
        --hazel-color-dark: #994700;
        --hazel-color-light: #cc6633;

        /* Gradients */
        --default-gradient: linear-gradient(45deg, #cc6633, #994700);
        --reverse-gradient: linear-gradient(45deg, #994700, #cc6633);

        /* Accent and Other Colors */
        --color-green: #42AD00;
        --color-accent: #5ab0f3;          /* Blue (Inverted Hazel) */
        --background-color: rgba(36, 39, 43, 0.78);  /* Dark Transparent Background */
        --background: #1e1e2e;            /* Dark Blue Background */
        --white-color: #1e1e2e;           /* Near-Black */

        /* Text Colors */
        --primary-text-color: #f5f5f5;    /* Light Text */
        --secondary-text-color: #0a0a0a;  /* Dark Text */

        /* Toggle Colors */
        --toggle-bg: #0f1457;             /* Dark Blue Toggle Background */
        --toggle-fg: #00bfff;             /* Cyan Toggle Foreground */
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