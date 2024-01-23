import React, {useState, useEffect} from 'react'
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import styled from "styled-components";
import { useGlobalContext } from '../../context/globalContext';
import { format } from "date-fns";
function Chart() {
    const dateFormat = 'M/d';
    function getDatesBetweenNowAndXDaysAgo(x) {
        var currentDate = new Date();
        var xDaysAgo = new Date();
        xDaysAgo.setDate(currentDate.getDate() - x);
      
        var datesArray = [];
      
        while (xDaysAgo <= currentDate) {
          datesArray.push(format(new Date(xDaysAgo), dateFormat));
          xDaysAgo.setDate(xDaysAgo.getDate() + 1);
        }
      
        return datesArray;
    }

    const {transactionHistory} = useGlobalContext()
    const [...history] = transactionHistory()
    console.log(history)
    
    var datesBetweenNowAndXDaysAgo = getDatesBetweenNowAndXDaysAgo(30);

    // Filter transactions for expenses and incomes
    const expenses = history.filter((transaction) => !transaction.is_income);
    const incomes = history.filter((transaction) => transaction.is_income);

    // Organize data for the BarChart
    const chartData = datesBetweenNowAndXDaysAgo.map((date) => {
        const dateString = format(date, dateFormat);
        const expenseAmount = expenses
        .filter((transaction) => format(transaction.payment_date.split(' ')[0], dateFormat) === dateString)
        .reduce((sum, transaction) => sum + transaction.amount, 0);
        const incomeAmount = incomes
        .filter((transaction) => format(transaction.payment_date.split(' ')[0], dateFormat) === dateString)
        .reduce((sum, transaction) => sum + transaction.amount, 0);

        return {
            name: dateString,
            Expense: expenseAmount,
            Income: incomeAmount,
        };
    });


    return (
        <Section>
        <div className="chart-con">
           
            <div className="sales">
                <div className="sales__details">
                    <div>
                        <h4>Balance</h4>
                    </div>
                    <div>
                        <h5>PAST 30 DAY</h5>
                    </div>
                </div>
                <div className="sales__graph">
                    <ResponsiveContainer width="100%" height="350%">

                    <BarChart
                        width={500}
                        height={200}
                        data={chartData}
                        margin={{
                            top: 20,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                        >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="Expense" stackId="a" fill="red" />
                        <Bar dataKey="Income" stackId="a" fill="green" />
                     </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
        </Section>
    )
}

export default Chart
const Section = styled.section`
.sales{
    color: black;
    width: 100%;
    .sales__details {
        display: flex;
        justify-content: space-between;
        margin: 1rem 0;
        div{
            display: flex;
            gap: 1rem;
            h5{
                color: gray;
            }
        }
    }
    .sales__graph{
        height: 8rem;
        width: 100%;
        .recharts-default-tooltip {
            background-color: black !important;
            border-color: black !important;
            color: white !important;
        }
    }
}

`;