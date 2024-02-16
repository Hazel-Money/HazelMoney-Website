import React from 'react'
import styled from "styled-components";
import { InnerLayout } from '../../styles/Layouts';
import CategoryForm from './CategoryForm';
import { useGlobalContext } from '../../context/globalContext';
import hazelMoneyIcon from '../../img/hazelmoneyIcon.png'

function Categories() {
  const { language } = useGlobalContext();

  return (
    <CategoriesStyled>
      <InnerLayout>
        <div className="top">
          <h1>{language === 'Portuguese' ? 'Adicionar categoria' : 'Add category'}</h1>
          <img src={hazelMoneyIcon}/>
        </div>
        <div className="form-container">
          <CategoryForm />
        </div>
      </InnerLayout>
    </CategoriesStyled>
  )
}

const CategoriesStyled = styled.div`
    display: flex;
    overflow: auto;
    .form-container{
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
        img{
            margin-top: -2%;
            margin-bottom: 1%;
            float: right;
            transform: rotate(30deg);
        }
    }
`;

export default Categories