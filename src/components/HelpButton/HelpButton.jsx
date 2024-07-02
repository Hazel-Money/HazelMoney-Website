import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import styled from 'styled-components';
import { useGlobalContext } from '../../context/globalContext';

const HelpButton = ({ onClick }) => {
  const { language } = useGlobalContext();
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  if (screenWidth >= 600 ) {
     return (
    <HelpButtonStyled>
      <Button className='help-button' variant="help-button" onClick={onClick}> 
        {language === 'Portuguese' ? '?' : '?'}
      </Button>
    </HelpButtonStyled>
  );
  } else {
    return null
  }

 
};

const HelpButtonStyled = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  border-radius: 50%;
  height: 45px;
  width: 45px;
  display: inline-block;
  text-align: center;
  vertical-align: center;
  box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
  background: var(--default-gradient);
  &:hover {
    cursor: pointer;
    opacity: 90%;
  }
  .help-button {
    font-family: inherit;
    color: white;
    right: 8px;
    bottom: 10px;
    font-size: 30px;
  }
`;

export default HelpButton;
