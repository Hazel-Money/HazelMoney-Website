import React, { useEffect  }from 'react'
import styled from "styled-components";
import { InnerLayout } from '../../styles/Layouts';
import { useGlobalContext } from '../../context/globalContext';
import Form from '../Form/Form'
import IncomeItem from '../IncomeItem/IncomeItem';

function currencyFormat(num) {
  return (num/100).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}

function Income() {
  const {accountIncome, addIncome,accountIncomeAmount , sliceIncomes, currentIncomeIndex, incomesSliced, navigateIncomes, getIncomes, deleteIncomes, totalIncomeAmount, getIncomesCategories, totalIncome, incomes} = useGlobalContext()
  
  useEffect(() => {
    sliceIncomes();
  }, [currentIncomeIndex, incomes]);

  useEffect(() => {
    totalIncome();
    getIncomes();
    getIncomesCategories();
    sliceIncomes();
    accountIncome()
  }, []);

  return (
    <IncomeStyled>
      <InnerLayout>
        <h1>Incomes</h1>
        <h2 className="total-income">Total Income: <span>${currencyFormat(accountIncomeAmount)}</span></h2>
        <div className="income-content">
          <div className="form-container">
              <Form />
          </div>
          <div className="incomes">
            {incomesSliced.map((income) => {
              const {id, account_id , categoryName, amount, is_income, payment_date, description, icon, categoryColor} = income;
              return <IncomeItem 
                  key={id}
                  id={id}
                  account_id={account_id}
                  category={categoryName}
                  amount={amount}
                  is_income={is_income}
                  payment_date={payment_date}
                  description={description}
                  icon={icon}
                  color={categoryColor}
                  indicatorColor="var(--color-green)"
                  deleteItem={deleteIncomes}
              />
            })}
            <div className="arrow-icons">
              <i
              className={currentIncomeIndex > 0 ? "fa-solid fa-arrow-left" : "fa-solid fa-arrow-left disabled"}
              onClick={() => navigateIncomes('prev')}
              />
              <i
              className={currentIncomeIndex + 2 < incomes.length ? "fa-solid fa-arrow-right" : "fa-solid fa-arrow-right disabled"}
              onClick={() => navigateIncomes('next')}
              />
            </div>
          </div>
        </div>
        
      </InnerLayout>
    </IncomeStyled>
  )
}

const IncomeStyled = styled.div`
    display: flex;
    overflow: auto;
    .total-income{
      display: flex;
      justify-content: center;
      align-items: center;
      background: #FCF6F9;
      border: 2px solid #FFFFFF;
      box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
      border-radius: 20px;
      padding: 1rem;
      margin: 1rem 0;
      font-size: 2rem;
      gap: .5rem;
      span{
        font-size: 2.5rem;
        font-weight: 800;
        color: var(--color-green);
      }
    }
    .income-content{
      display: flex;
      gap: 2rem;
      position: relative;
      .incomes{
        flex: 1;
      }
    }

    .arrow-icons {
      position: relative;
      display: flex;
      gap: 50vh;
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

export default Income