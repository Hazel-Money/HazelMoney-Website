import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { InnerLayout } from '../../styles/Layouts';
import { useGlobalContext } from '../../context/globalContext';
import ExpenseForm from '../Expenses/ExpenseForm';
import IncomeItem from '../IncomeItem/IncomeItem';
import DetailedIncomeInfo from '../IncomeItem/ItemInformation';
import GuidedTour from '../GuidedTour/ExpenseGuidedTour';
import HelpButton from '../HelpButton/HelpButton'; 

function currencyFormat(num) {
  return (num / 100).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
}

function Expenses() {
  const {
    language,
    accountCurrency,
    getAccountCurrency,
    refreshAccountContent,
    accountExpense,
    accountExpenseAmount,
    expenses,
    sliceExpenses,
    totalExpensesAmount,
    expensesSliced,
    currentExpenseIndex,
    navigateExpenses,
    getExpenses,
    deleteExpense,
    totalExpenses,
    getExpensesCategories,
    user,
  } = useGlobalContext();

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
    getAccountCurrency();
    refreshAccountContent();
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
        <h2 className="total-expense">
          <h3>{language === 'Portuguese' ? 'Total gasto: ' : 'Total expense: '}</h3>
          <span>{accountCurrency}{currencyFormat(accountExpenseAmount)}</span>
        </h2>
        <div className="expense-content">
          <div className="expense-form-container">
            <ExpenseForm />
          </div>
          <div className="expenses">
            {expensesSliced.map((expense) => {
              const {
                id,
                account_id,
                currency,
                categoryName,
                amount,
                is_income,
                payment_date,
                description,
                icon,
                categoryColor,
              } = expense;
              return (
                <IncomeItem
                  key={id}
                  id={id}
                  account_id={account_id}
                  currency={currency}
                  category={categoryName}
                  amount={amount}
                  is_income={is_income}
                  payment_date={payment_date}
                  description={description}
                  icon={icon}
                  color={categoryColor}
                  indicatorColor="var(--color-green)"
                  deleteItem={deleteExpense}
                  onSelect={handleTransactionItemClick}
                />
              );
            })}
            <div className="arrow-icons">
              <i
                className={
                  currentExpenseIndex > 0
                    ? 'fa-solid fa-arrow-left'
                    : 'fa-solid fa-arrow-left disabled'
                }
                onClick={() => navigateExpenses('prev')}
              />
              <i
                className={
                  currentExpenseIndex + 2 < expenses.length
                    ? 'fa-solid fa-arrow-right'
                    : 'fa-solid fa-arrow-right disabled'
                }
                onClick={() => navigateExpenses('next')}
              />
            </div>
          </div>
          <HelpButton onClick={handleClickOpen} />
        </div>
      </InnerLayout>
      {selectedTransaction && (
        <DetailedIncomeInfo
          transaction={selectedTransaction}
          setSelectedTransaction={setSelectedTransaction}
        />
      )}
    </ExpenseStyled>
  );
}

const ExpenseStyled = styled.div`
  display: flex;
  overflow: auto;
  .top {
    display: flex;
    width: 100%;
    height: 4rem;
    h1 {
      float: left;
      width: 95%;
    }
  }
  .total-expense {
    display: flex;
    justify-content: center;
    align-items: center;
    background: var(--white-color);
    border: 2px solid var(--border-color)FFF;
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
    border-radius: 20px;
    padding: 1rem;
    margin: 1rem 0;
    font-size: 2rem;
    gap: 0.5rem;
    span {
      font-size: 2.5rem;
      font-weight: 800;
      color: var(--color-green);
    }
  }
  .expense-content {
    display: flex;
    gap: 2rem;
    position: relative;
    .expenses {
      flex: 1;
      height: 50%;
    }
  }
  .arrow-icons {
    display: flex;
    justify-content: space-between;
    margin-top: 1rem;
    color: var(--primary-color2);
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
  @media only screen and (max-width: 600px) {
    .total-expense {
      margin-top: -0.6rem;
      h3 {
        display: none;
      }
      padding: 0.5rem;
      margin: 0.5 0;
      font-size: 2rem;
      gap: 0.5rem;
      span {
        font-size: 2rem;
        font-weight: 800;
      }
    }
    .expense-content {
      flex-direction: column;
      align-items: center;
    }
    .expense-form-container {
      margin-bottom: 2rem;
    }
    .arrow-icons {
      justify-content: space-between;
    }
  }
`;

export default Expenses;
