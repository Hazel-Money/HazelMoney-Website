import React from 'react'
import styled from "styled-components";
import { InnerLayout } from '../../styles/Layouts';
import { useGlobalContext } from '../../context/globalContext';
import Form from '../Form/Form'

function Income() {
  const {addIncome} = useGlobalContext()
  return (
    <IncomeStyled>
      <InnerLayout>
        <h1>Incomes</h1>
        <div className="income-content">
          <div className="form-container"></div>
          <div className="incomes">
              <Form />
          </div>
        </div>
        
      </InnerLayout>
    </IncomeStyled>
  )
}

const IncomeStyled = styled.div`
    
`;

export default Income