import React, {useEffect} from 'react'
import styled from "styled-components";
import { InnerLayout } from '../../styles/Layouts';
import RegularPaymentForm from './RegularPaymentForm';
import { useGlobalContext } from '../../context/globalContext';
import RegularPaymentsItem from "./Item"

function RegularPayments() {
  const { getExpensesCategories, deleteRegularPayments, regularPayments, getIncomesCategories, getFrequencies, getRegularPayments} = useGlobalContext();

  useEffect(() => {
    getRegularPayments();
    getIncomesCategories();
    getExpensesCategories();   
    getFrequencies();
  }, []);

  return (
    <RegularPaymentsStyled>
      <InnerLayout>
        <h1>Add regular payment</h1>
        <div className='payment-content'>
          <div className="form-container">
            <RegularPaymentForm />
          </div>
          <div className="payment">
            {regularPayments.map((payment) => {
              const {id, account_id , categoryName, amount, is_income, last_payment_date, description, icon, categoryColor} = payment;
              return <RegularPaymentsItem
                  key={id}
                  id={id}
                  account_id={account_id}
                  category={categoryName}
                  amount={amount}
                  is_income={is_income}
                  next_payment_date={last_payment_date}
                  description={description}
                  icon={icon}
                  color={categoryColor}
                  indicatorColor={is_income == '1' ? "var(--color-green)" : "red"}
                  deleteItem={deleteRegularPayments}
              />
            })}
            </div>
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
    .payment-content{
      display: flex;
      gap: 2rem;
      .payment{
        flex: 1;
      }
    }
`;

export default RegularPayments