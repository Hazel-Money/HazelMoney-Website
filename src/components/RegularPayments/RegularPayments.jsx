import React, {useEffect} from 'react'
import styled from "styled-components";
import { InnerLayout } from '../../styles/Layouts';
import RegularPaymentForm from './RegularPaymentForm';
import { useGlobalContext } from '../../context/globalContext';
import RegularPaymentsItem from "./Item"

function RegularPayments() {
  const {language,accountCurrency, getAccountCurrency, getExpensesCategories, slicePayments, paymentsSliced, navigatePayments, currentPaymentIndex, deleteRegularPayments, regularPayments, getIncomesCategories, getFrequencies, getRegularPayments} = useGlobalContext();

  useEffect(() => {
    slicePayments();
  }, [currentPaymentIndex, regularPayments]);

  useEffect(() => {
    getAccountCurrency();
    getRegularPayments();
    getIncomesCategories();
    getExpensesCategories();   
    getFrequencies();
  }, []);

  return (
    <RegularPaymentsStyled>
      <InnerLayout>
        <h1>{language === 'Portuguese' ? 'Adicionar pagamento regular' : 'Add regular payment'}</h1> 
        <div className='payment-content'>
          <div className="form-container">
            <RegularPaymentForm />
          </div>
          <div className="payment">
            {paymentsSliced.map((payment) => {
              const {id, account_id , categoryName, amount, is_income, next_payment_date, description, icon, categoryColor} = payment;
              return <RegularPaymentsItem
                  key={id}
                  id={id}
                  account_id={account_id}
                  category={categoryName}
                  amount={amount}
                  is_income={is_income}
                  next_payment_date={next_payment_date}
                  description={description}
                  icon={icon}
                  color={categoryColor}
                  indicatorColor={is_income == '1' ? "var(--color-green)" : "red"}
                  deleteItem={deleteRegularPayments}
                  accountCurrency={accountCurrency}
              />
            })}
            <div className="arrow-icons">
              <i
              className={currentPaymentIndex > 0 ? "fa-solid fa-arrow-left" : "fa-solid fa-arrow-left disabled"}
              onClick={() => navigatePayments('prev')}
              />
              <i
              className={currentPaymentIndex + 2 < regularPayments.length ? "fa-solid fa-arrow-right" : "fa-solid fa-arrow-right disabled"}
              onClick={() => navigatePayments('next')}
              />
            </div>
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
        margin-top: 5vh;
        flex: 1;
      }
    }
    .arrow-icons {
      position: relative;
      display: flex;
      gap: 92%;
      i {
        font-size: 24px; 
        cursor: pointer;
        &:hover {
          color: var(--primary-color); 
        }
      }
      .disabled {
        color: rgba(70, 70, 97, 0.176) !important;
        cursor: not-allowed; 
      }
    }
`;

export default RegularPayments