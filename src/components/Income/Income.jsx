import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { InnerLayout } from '../../styles/Layouts';
import { useGlobalContext } from '../../context/globalContext';
import Form from '../Form/Form';
import IncomeItem from '../IncomeItem/IncomeItem';
import DetailedIncomeInfo from '../IncomeItem/ItemInformation';
import GuidedTour from '../GuidedTour/IncomeGuidedTour';
import HelpButton from '../HelpButton/HelpButton'; 

function currencyFormat(num) {
  return (num / 100).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
}

function Income() {
  const {
    language,
    accountCurrency,
    getAccountCurrency,
    accountIncome,
    accountIncomeAmount,
    sliceIncomes,
    currentIncomeIndex,
    incomesSliced,
    navigateIncomes,
    getIncomes,
    deleteIncomes,
    getIncomesCategories,
    totalIncome,
    incomes,
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
    sliceIncomes();
  }, [currentIncomeIndex, incomes]);

  useEffect(() => {
    getAccountCurrency();
    getIncomes();
    getIncomesCategories();
    sliceIncomes();
    accountIncome();
  }, []);

  const handleTransactionItemClick = (transaction) => {
    setSelectedTransaction(transaction);
  };

  return (
    <IncomeStyled>
      <InnerLayout>
        {open && <GuidedTour />}
        <div className="top">
          <h1>{language === 'Portuguese' ? 'Receitas' : 'Incomes'}</h1>
        </div>
        <h2 className="total-income">
          <h3>{language === 'Portuguese' ? 'Total ganho: ' : 'Total income: '}</h3>
          <span>{accountCurrency}{currencyFormat(accountIncomeAmount)}</span>
        </h2>
        <div className="income-content">
          <div className="income-form-container">
            <Form />
          </div>
          <div className="incomes">
            {incomesSliced.map((income) => {
              const {
                id,
                account_id,
                categoryName,
                currency,
                amount,
                is_income,
                payment_date,
                description,
                icon,
                categoryColor,
              } = income;
              return (
                <IncomeItem
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
                  currency={currency}
                  onSelect={handleTransactionItemClick}
                />
              );
            })}
            <div className="arrow-icons">
              <i
                className={
                  currentIncomeIndex > 0
                    ? 'fa-solid fa-arrow-left'
                    : 'fa-solid fa-arrow-left disabled'
                }
                onClick={() => navigateIncomes('prev')}
              />
              <i
                className={
                  currentIncomeIndex + 2 < incomes.length
                    ? 'fa-solid fa-arrow-right'
                    : 'fa-solid fa-arrow-right disabled'
                }
                onClick={() => navigateIncomes('next')}
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
    </IncomeStyled>
  );
}

const IncomeStyled = styled.div`
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
  .total-income {
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
  .income-content {
    display: flex;
    gap: 2rem;
    position: relative;
    .incomes {
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
    .total-income {
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
    .income-content {
      flex-direction: column;
      align-items: center;
    }
    .income-form-container {
      margin-bottom: 2rem;
    }
    .arrow-icons {
      justify-content: space-between;
    }
  }
`;

export default Income;
