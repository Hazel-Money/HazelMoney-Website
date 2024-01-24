import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { InnerLayout } from '../../styles/Layouts';
import { useGlobalContext } from '../../context/globalContext';
import Chart from '../Chart/Chart';
import { dollar } from '../../utils/Icons';
import History from '../History/History';

function currencyFormat(num) {
  return (num/100).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}

function Dashboard() {
  const {totalExpenses, incomes, expenses, totalIncome, totalBalance, getIncomes, getExpenses, getAllTransactions} = useGlobalContext()

  //Render data when running website
  useEffect(() => {
    getAllTransactions()
    getIncomes()
    getExpenses()
  }, [])

  return (
    <DashBoardStyled>
      <InnerLayout>
        <div className="stats-con">
          <h1 className='h1-transaction'>All Transactions</h1>
          <h2 className='h2-history'>Recent History</h2>
          <div className="chart-con">
            <div className="amount-con">
              <div className="income">
                <h2>Total Income</h2>
                <p>
                  {dollar} {currencyFormat(totalIncome())}
                </p>
              </div>
              <div className="expense">
                <h2>Total Expense</h2>
                <p>
                  {dollar} -{currencyFormat(totalExpenses())}
                </p>
              </div>
              <div className="balance">
                <h2>Total Balance</h2>
                <p>
                  {dollar} {currencyFormat(totalBalance())}
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

 .stats-con{
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    column-gap: 2rem;
    .chart-con{
      grid-column: 1 / 4;
      height: 40vh;
      .amount-con {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 2rem;
        margin-top: 2rem;
        .income p{
          color: var(--color-green) !important;
        }
        .expense p{
          color: red !important;
        }
        .income, .expense{
          grid-column: span 2;
        }
        .income, .expense, .balance {
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
          p, h2 {
            text-align: center;
          }
        }

        .balance {
          grid-column: 2 / 4;
          p{
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

    .history-con{
      grid-column: 4 /  -1;
      .salary-title{
        font-size: 1.2rem;
        span{
          font-size: 1.8rem;
        }
      }
    }
  }
`;


export default Dashboard;
