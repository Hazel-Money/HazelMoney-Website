import React, { useEffect, useState } from 'react';
import styled from "styled-components";
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
import { Toggle } from "./components/Toggle/Toggle";
import { IconButton, SwipeableDrawer, Toolbar } from '@mui/material';
import { menuItems } from './utils/menuItems';

function App() {
  const [isDark, setIsDark] = useState(false); 
  const [active, setActive] = useState(1);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const isDrawerPermanent = window.innerWidth > 1000;

  const cookies = new Cookies();

  if (!cookies.get('jwt')) {
    return <Landing/>
  }

  const displayData = () => {
    switch (active) {
      case 1:
        return <Dashboard isDark={isDark} />;
      case 2:
        return <Chart isDark={isDark} />;
      case 3:
        return <Income isDark={isDark} />;
      case 4:
        return <Expenses isDark={isDark} />;
      case 5:
        return <Categories isDark={isDark} />;
      case 6:
        return <RegularPayments isDark={isDark} />;
      case 7:
        return <Settings isDark={isDark} setIsDark={setIsDark}/>;
      default:
        return <Dashboard isDark={isDark} />;
    }
  };

  // Determine if the toggle should be displayed based on the current active page
  const showToggle = false

  return (
    <AppStyled className="App" data-theme={isDark ? true : false}>
      <MainLayout>
        {showToggle && <Toggle isChecked={isDark} handleChange={() => setIsDark(!isDark)} />}
        {!isDrawerPermanent &&
          <Toolbar style={{height: 50}}>
            <IconButton
              color='inherit'
              edge='end'
              style={{display: 'flex', justifyContent: 'flex-end'}}
              onClick={() => setDrawerOpen(!drawerOpen)}
            >
              {menuItems[0].icon}
            </IconButton>
          </Toolbar>
        }
        <Navigation
          active={active}
          setActive={setActive}
          drawerOpen={drawerOpen}
          setDrawerOpen={setDrawerOpen}
          permanent={isDrawerPermanent}
        />
        <main style={{ marginLeft: isDrawerPermanent ? 374 : 0 }}>{displayData()}</main>
      </MainLayout>
    </AppStyled>
  );
}



const AppStyled = styled.div`
  height: 100vh;
  background: var(--background);
  position: relative;

  main {
    flex: 1;
    background: var(--background-color);
    border: 3px solid #FFFFFF;
    backdrop-filter: blur(4.5px);
    border-radius: 32px;
    overflow: auto;
    overflow-x: hidden;
    &::-webkit-scrollbar {
      width: 0;
    }
  }
`;

export default App;