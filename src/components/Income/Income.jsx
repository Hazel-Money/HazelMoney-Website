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
  }, [incomes])
  
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