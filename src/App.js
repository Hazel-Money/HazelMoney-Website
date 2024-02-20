import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import bg from "./img/bg.png";
import {MainLayout} from "./styles/Layouts";
import Navigation from "./components/Navigation/Navigation";
import Dashboard from "./components/Dashboard/Dashboard";
import Income from "./components/Income/Income";
import Expenses from "./components/Expenses/Expenses";
import { useGlobalContext } from "./context/globalContext";
import Cookies from "universal-cookie";
import LoginSignup from "./components/Login/login";
import Chart from "./components/Chart/Chart"
import Categories from './components/Categories/Categories';
import RegularPayments from './components/RegularPayments/RegularPayments'
import Settings from "./components/Settings/Settings"
import Landing from "./components/Landing/Landing"

function App() {
  
  const [active, setActive] = useState(1);
  const cookies = new Cookies();
  if (!cookies.get('jwt')) {
    return <Landing/>
  }

  const displayData = () => {
    switch (active) {
      case 1:
        return <Dashboard />;
      case 2:
        return <Chart />;
      case 3:
        return <Income />;
      case 4:
        return <Expenses />;
      case 5:
        return <Categories />;
      case 6:
        return <RegularPayments />;
      case 7:
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <AppStyled bg={bg} className="App">
      <MainLayout>
          <Navigation active={active} setActive={setActive} />
          <main>{displayData()}</main>
      </MainLayout>
    </AppStyled>
  );
}

const AppStyled = styled.div`
  height: 100vh;
  background-image: url(${props => props.bg});
  position: relative;

  main{
    flex: 1;
    background: rgba(252, 246, 249, 0.78);
    border: 3px solid #FFFFFF;
    backdrop-filter: blur(4.5px);
    border-radius: 32px;
    overflow: auto;
    overflow-x: hidden;
    &::-webkit-scrollbar{
      width: 0;
    }
  }
`;


export default App;
