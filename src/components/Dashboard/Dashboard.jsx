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
  const {totalExpenses, incomes, expenses, totalIncome, totalBalance, getIncomes, getExpenses} = useGlobalContext()

  //Render data when running website
  useEffect(() => {
    getIncomes()
    getExpenses()
  }, [])

  return (
    <DashBoardStyled>
      <InnerLayout>
        <h1 className='h1-transaction'>All Transactions</h1>
        <div className="stats-con">
          <div className="chart-con">
            <Chart />
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
                  {dollar} {currencyFormat(totalExpenses())}
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
              <h2 className="salary-category">Min <span>Income</span>Max</h2>
              <div className="salary-item">
                <p>
                  {Math.min(...incomes.map(item => currencyFormat(item.amount)))}
                </p>
                <p>
                  {Math.max(...incomes.map(item => currencyFormat(item.amount)))}
                </p>
              </div>
              <h2 className="salary-category">Min <span>Expense</span>Max</h2>
              <div className="salary-item">
                <p>
                  {Math.min(...expenses.map(item => currencyFormat(item.amount)))}
                </p>
                <p>
                  {Math.max(...expenses.map(item => currencyFormat(item.amount)))}
                </p>
              </div>
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
    gap: 2rem;
    .chart-con{
      grid-column: 1 / 4;
      height: 40vh;
      .amount-con{
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 2rem;
        margin-top: 2rem;
        .income, .expense{
          grid-column: span 2;
        }
        .income, .expense, .balance{
          background: #FCF6F9;
          border: 2px solid #FFFFFF;
          box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
          border-radius: 20px;
          padding: 0.8rem;
          p{
            font-size: 2.5rem;
            font-weight: 700;
          }
        }

        .balance{
          grid-column: 2 / 4;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          p{
            color: var(--color-green);
            opacity: 0.6;
            font-size: 2.5rem;
          }
        }
      }
    }

    .history-con{
      grid-column: 4 / -1;
      h2{
        margin: 1rem 0;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
      .salary-title{
        font-size: 1.2rem;
        span{
          font-size: 1.8rem;
        }
      }
      .salary-item{
        background: #FCF6F9;
        border: 2px solid #FFFFFF;
        box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
        padding: 1rem;
        border-radius: 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        p{
          font-weight: 600;
          font-size: 1.6rem;
        }
      }
    }
  }
`;

export default Dashboard;
