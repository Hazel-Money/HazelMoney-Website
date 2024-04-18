import React, { useEffect, useState  }from 'react'
import styled from "styled-components";
import { InnerLayout } from '../../styles/Layouts';
import { useGlobalContext } from '../../context/globalContext';
import ExpenseForm from '../Expenses/ExpenseForm'
import IncomeItem from '../IncomeItem/IncomeItem';
import DetailedIncomeInfo from '../IncomeItem/ItemInformation'
import GuidedTour from '../GuidedTour/ExpenseGuidedTour';
import Button from '@mui/material/Button';

function currencyFormat(num) {
  return (num/100).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}

function Expenses() {
  const {language, accountCurrency, getAccountCurrency,refreshAccountContent, accountExpense, accountExpenseAmount, expenses, sliceExpenses, totalExpensesAmount, expensesSliced, currentExpenseIndex, navigateExpenses, getExpenses, deleteExpense, totalExpenses, getExpensesCategories, user} = useGlobalContext()
  
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  useEffect(() => {
    if (open) {
      setOpen(false); 
    }
  }, [open]);

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

  const handleTransactionItemClick = (transaction) => {
    setSelectedTransaction(transaction);
  };
  
  return (
    <ExpenseStyled>
      <InnerLayout>
        {open && <GuidedTour />}
        <div className="top">
          <h1>{language === 'Portuguese' ? 'Despesas' : 'Expenses'}</h1>
        </div>
        <h2 className="total-expense">{language === 'Portuguese' ? 'Total gasto: ' : 'Total expense: '}<span>{accountCurrency}{currencyFormat(accountExpenseAmount)}</span></h2>
        <div className="expense-content">
          <div className="expense-form-container">
              <ExpenseForm />
          </div>
          <div className="expenses">
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
                onSelect= {handleTransactionItemClick}
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
          <div className='help'>
            <Button className='help-button' variant="help-button" onClick={handleClickOpen}> 
                {language === 'Portuguese' ? '?' : '?'}
            </Button>
          </div>
        </div>
        
      </InnerLayout>
      {selectedTransaction && <DetailedIncomeInfo transaction={selectedTransaction} setSelectedTransaction={setSelectedTransaction} />}

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
    }
    .total-expense{
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
    .expense-content{
      display: flex;
      gap: 2rem;
      .expenses{
        flex: 1;
        height: 50%;
      }
      .help{
        position: absolute;
        bottom: 2vh;
        right: 3vh;
        border-radius: 50%;
        height: 45px;
        width: 45px;
        border-radius: 50%;
        display: inline-block;
        text-align: center;
        vertical-align: center;
        box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
        background: var(--default-gradient);
        &:hover{
          cursor: pointer;
          opacity: 90%;
        }
        .help-button{
          font-family: inherit;
          color: white;
          right: 8px;
          bottom: 10px;
          font-size: 30px;
        }
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