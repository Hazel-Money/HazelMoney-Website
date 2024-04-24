import React, {useState, useEffect} from 'react'
import styled from "styled-components";
import { InnerLayout } from '../../styles/Layouts';
import CategoryForm from './CategoryForm';
import { useGlobalContext } from '../../context/globalContext';
import GuidedTour from '../GuidedTour/CategoriesGuidedTour';
import Button from '@mui/material/Button';

function Categories() {
  const { language } = useGlobalContext();

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  useEffect(() => {
    if (open) {
      setOpen(false); 
    }
  }, [open]);

  return (
    <CategoriesStyled>
      <InnerLayout>
        {open && <GuidedTour />}
        <div className="top">
          <h1>{language === 'Portuguese' ? 'Adicionar categoria' : 'Add category'}</h1>
        </div>
        <div className="categories-form-container">
          <CategoryForm />
        </div>
        <div className='help'>
          <Button className='help-button' variant="help-button" onClick={handleClickOpen}> 
              {language === 'Portuguese' ? '?' : '?'}
          </Button>
        </div>
      </InnerLayout>
    </CategoriesStyled>
  )
}

const CategoriesStyled = styled.div`
    display: flex;
    overflow: auto;
    .categories-form-container{
      margin-top: 5vh;
    }
    .top{
      display: flex;
      width: 100%;
      height: 4rem;
      h1{
          float: left;
          width: 95%;
      }
    }
    .help{
        position: absolute;
        bottom: 2vh;
        right: 3vh;
        border-radius: 50%;
        height: 45px;
        width: 45px;
        border-radius: 50%;
        display: inline-block;
        text-align: center;
        vertical-align: center;
        box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
        background: var(--default-gradient);
        &:hover{
          cursor: pointer;
          opacity: 90%;
        }
        .help-button{
          font-family: inherit;
          color: white;
          right: 8px;
          bottom: 10px;
          font-size: 30px;
        }
      }
`;

export default Categories