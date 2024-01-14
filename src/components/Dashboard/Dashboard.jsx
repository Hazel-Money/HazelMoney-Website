import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { InnerLayout } from '../../styles/Layouts';
import { useGlobalContext } from '../../context/globalContext';

function Dashboard() {
  
  return (
    <DashBoardStyled>
      <InnerLayout>
        
      </InnerLayout>
    </DashBoardStyled>
  );
}

const DashBoardStyled = styled.div``;

export default Dashboard;
