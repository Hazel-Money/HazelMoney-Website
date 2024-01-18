import React, { useEffect  }from 'react'
import styled from "styled-components";
import { InnerLayout } from '../../styles/Layouts';
import { useGlobalContext } from '../../context/globalContext';
import ExpenseForm from '../Expenses/ExpenseForm'
import IncomeItem from '../IncomeItem/IncomeItem';

function currencyFormat(num) {
  return (num/100).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}

function Expenses() {
  const {expenses, getExpenses, deleteExpense, totalExpenses} = useGlobalContext()

  useEffect(() => {
    getExpenses()
  }, [])
  
  return (
    <ExpenseStyled>
      <InnerLayout>
        <h1>Expenses</h1>
        <h2 className="total-income">Total Expense: <span>$-{currencyFormat(totalExpenses())}</span></h2>
        <div className="income-content">
          <div className="form-container">
              <ExpenseForm />
          </div>
          <div className="incomes">
            {expenses.map((expense) => {
              const {id, account_id , categoryName, amount, is_income, payment_date, description, icon, categoryColor} = expense;
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
                  indicatorColor="red"
                  deleteItem={deleteExpense}
              />
            })}
          </div>
        </div>
        
      </InnerLayout>
    </ExpenseStyled>
  )
}

const ExpenseStyled = styled.div`
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
        color: red;
      }
    }
    .income-content{
      display: flex;
      gap: 2rem;
      .incomes{
        flex: 1;
      }
    }
`;

export default Expenses