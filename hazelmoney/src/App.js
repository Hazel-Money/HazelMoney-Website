import React from "react";
import styled from 'styled-components';
import Sidebar from './components/Sidebar';
import RightSidebar from './components/RightSidebar';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <Div>
      <Sidebar />
      <Dashboard />
      <RightSidebar />
    </Div>
  );
}

export default App;
const Div = styled.div `
position: relative;
`;