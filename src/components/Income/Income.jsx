import React, { useEffect  }from 'react'
import styled from "styled-components";
import { InnerLayout } from '../../styles/Layouts';
import { useGlobalContext } from '../../context/globalContext';
import Form from '../Form/Form'
import IncomeItem from '../IncomeItem/IncomeItem';

function Income() {
  const {addIncome, incomes, getIncomes} = useGlobalContext()

  useEffect(() => {
    getIncomes()
  }, [])
  
  return (
    <IncomeStyled>
      <InnerLayout>
        <h1>Incomes</h1>
        <div className="income-content">
          <div className="form-container">
              <Form />
          </div>
          <div className="incomes">
            {incomes.map((income) => {
              const {id, account_id , category_id, amount, is_income, payment_date, description, icon} = income;
              return <IncomeItem 
                  key={id}
                  id={id}
                  account_id={account_id}
                  category_id={category_id}
                  amount={amount}
                  is_income={is_income}
                  payment_date={payment_date}
                  description={description}
                  icon={icon}
                  indicatorColor="var(--color-green)"
              />
            })}
          </div>
        </div>
        
      </InnerLayout>
    </IncomeStyled>
  )
}

const IncomeStyled = styled.div`
    display: flex;
    overflow: auto;
    .income-content{
      display: flex;
      gap: 2rem;
      .incomes{
        flex: 1;
      }
    }
`;

export default Income