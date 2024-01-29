import React, {useEffect} from 'react'
import styled from "styled-components";
import { InnerLayout } from '../../styles/Layouts';
import RegularPaymentForm from './RegularPaymentForm';
import { useGlobalContext } from '../../context/globalContext';

function RegularPayments() {
  const { getExpensesCategories, getIncomesCategories, getFrequencies} = useGlobalContext();

  useEffect(() => {
    getIncomesCategories();
    getExpensesCategories();   
    getFrequencies();
  }, []);

  return (
    <RegularPaymentsStyled>
      <InnerLayout>
        <h1>Add regular payment</h1>
        <div className="form-container">
          <RegularPaymentForm />
        </div>
      </InnerLayout>
    </RegularPaymentsStyled>
  )
}

const RegularPaymentsStyled = styled.div`
    display: flex;
    overflow: auto;
    .form-container{
      margin-top: 5vh;
    }
`;

export default RegularPayments