import React, { useEffect  }from 'react'
import styled from "styled-components";
import { InnerLayout } from '../../styles/Layouts';
import { useGlobalContext } from '../../context/globalContext';
import ExpenseForm from '../Expenses/ExpenseForm'
import IncomeItem from '../IncomeItem/IncomeItem';
import hazelMoneyIcon from '../../img/hazelmoneyIcon.png'

function currencyFormat(num) {
  return (num/100).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}

function Expenses() {
  const {language, accountCurrency, getAccountCurrency,refreshAccountContent, accountExpense, accountExpenseAmount, expenses, sliceExpenses, totalExpensesAmount, expensesSliced, currentExpenseIndex, navigateExpenses, getExpenses, deleteExpense, totalExpenses, getExpensesCategories, user} = useGlobalContext()


  useEffect(() => {
    sliceExpenses();
  }, [currentExpenseIndex, expenses]);

  useEffect(() => {
    getAccountCurrency()
    refreshAccountContent()
    getExpenses();
    getExpensesCategories();   
    accountExpense();
  }, []);
  
  return (
    <ExpenseStyled>
      <InnerLayout>
        <div className="top">
          <h1>{language === 'Portuguese' ? 'Despesas' : 'Expenses'}</h1>
          <img src={hazelMoneyIcon}/>
        </div>
        <h2 className="total-income">{language === 'Portuguese' ? 'Total gasto: ' : 'Total expense: '}<span>{accountCurrency}{currencyFormat(accountExpenseAmount)}</span></h2>
        <div className="income-content">
          <div className="form-container">
              <ExpenseForm />
          </div>
          <div className="incomes">
            {expensesSliced.map((expense) => {
              const {id, account_id , currency, categoryName, amount, is_income, payment_date, description, icon, categoryColor} = expense;
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
                  currency={currency}
              />
            })}
            <div className="arrow-icons">
              <i
              className={currentExpenseIndex > 0 ? "fa-solid fa-arrow-left" : "fa-solid fa-arrow-left disabled"}
              onClick={() => navigateExpenses('prev')}
              />
              <i
              className={currentExpenseIndex + 2 < expenses.length ? "fa-solid fa-arrow-right" : "fa-solid fa-arrow-right disabled"}
              onClick={() => navigateExpenses('next')}
              />
            </div>
          </div>
        </div>
        
      </InnerLayout>
    </ExpenseStyled>
  )
}

const ExpenseStyled = styled.div`
    display: flex;
    overflow: auto;
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

export default Expenses