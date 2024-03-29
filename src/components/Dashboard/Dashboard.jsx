import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { InnerLayout } from '../../styles/Layouts';
import { useGlobalContext } from '../../context/globalContext';
import { dollar } from '../../utils/Icons';
import History from '../History/History';

function currencyFormat(num) {
  return (num/100).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}

function Dashboard() {
  const {language, accountBalance, accountCurrency, getAccountCurrency, accountIncome, accountExpense, accountIncomeAmount, accountExpenseAmount, balance, getIncomes, getExpenses, getAllTransactions} = useGlobalContext()

  //Render data when running website
  useEffect(() => {
    getAccountCurrency()
    getAllTransactions()
    getIncomes()
    getExpenses()
    accountIncome()
    accountExpense()
  }, [])

  const balanceColorClass = balance >= 0 ? 'green-text' : 'red-text';

  return (
    <DashBoardStyled>
      <InnerLayout>
        <div className="stats-con">
          <h1 className='h1-transaction'>{language === 'Portuguese' ? 'Transações' : 'All transactions'}</h1>
          <h2 className='h2-history'>{language === 'Portuguese' ? 'Histórico' : 'Recent history'}</h2>
          <div className="chart-con">
            <div className="amount-con">
              <div className="income">
                <h2>{language === 'Portuguese' ? 'Total Receitas' : 'Total Income'}</h2>
                <p>
                  {accountCurrency} {currencyFormat(accountIncomeAmount)}
                </p>
              </div>
              <div className="expense">
                <h2>{language === 'Portuguese' ? 'Total Despesas' : 'Total Expense'}</h2>
                <p>
                  {accountCurrency} {currencyFormat(accountExpenseAmount)}
                </p>
              </div>
              <div className="balance">
                <h2>{language === 'Portuguese' ? 'Total Saldo' : 'Total Balance'}</h2>
                <p className={balanceColorClass}>
                  {accountCurrency} {currencyFormat(accountBalance)}
                </p>
              </div>
            </div>

          </div>
          <div className="history-con">
              <History />
          </div>
        </div>
      </InnerLayout>
    </DashBoardStyled>
  );
}

const DashBoardStyled = styled.div`
  .stats-con {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    column-gap: 2rem;

    .chart-con {
      grid-column: 1 / 4;
      height: 40vh;

      .amount-con {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 2rem;
        margin-top: 2rem;

        .income p {
          color: var(--color-green) !important;
        }

        .expense p {
          color: red !important;
        }

        .income,
        .expense {
          grid-column: span 2;
        }

        .income,
        .expense,
        .balance {
          justify-content: center;
          align-items: center;
          display: flex;
          flex-direction: column;
          background: #FCF6F9;
          border: 2px solid #FFFFFF;
          box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
          border-radius: 20px;
          padding: 0.8rem;

          p {
            font-size: 1.5rem;
            font-weight: 700;
          }

          h2 {
            font-size: 1.5rem;
          }

          p,
          h2 {
            text-align: center;
          }
        }

        .balance {
          grid-column: 2 / 4;

          p {
            color: var(--color-green);
            opacity: 0.6;
            font-size: 1.7rem;
          }
        }
      }
    }

    h1 {
      grid-column: 1 / 4;
    }

    h2 {
      grid-column: 4 / -1;
      margin: 1rem 0;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .history-con {
      grid-column: 4 / -1;

      .salary-title {
        font-size: 1.2rem;

        span {
          font-size: 1.8rem;
        }
      }
    }
  }

  .balance p {
    color: var(--color-green);
  }

  .balance p.red-text {
    color: red !important;
  }

  @media only screen and (max-width: 600px) {
    .stats-con {
      display: flex;
      flex-direction: column;
      h1{
        font-size: 1.4rem;
      }
      h2{
        font-size: 1.4rem;
        order: 2; 
      }

      .chart-con {
        order: 1;
        .amount-con {
          margin-top: 1rem;
          .income,
          .expense,
          .balance {
            height: 6rem;
            p {
              font-size: 1rem;
              font-weight: 700;
            }

            h2 {
              margin: 0.3rem;
              font-size: 1rem;
            }
          }

          .balance {
            width: 8rem;
            p {
              font-size: 1.2rem;
            }
          }
        }
      }

      .history-con {
        order: 2;
        .salary-title {
          font-size: 0.5rem;

          span {
            font-size: 1.1rem;
          }
        }
      }
    }
  }
`;

export default Dashboard;
