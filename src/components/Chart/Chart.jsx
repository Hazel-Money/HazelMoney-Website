import React, { useState, useEffect } from 'react';
import { BarChart, PieChart, Pie, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LabelList } from 'recharts';
import styled from "styled-components";
import { useGlobalContext } from '../../context/globalContext';
import { format } from "date-fns";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Box } from "@mui/material";

function currencyFormat(num) {
    return (num / 1).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}

function Chart() {

    const dateFormat = 'd/MM';
    const { accountId, getBarChartData, refreshAccountContent, language, transactions, getAllTransactions, getUserFromCookies, Incomescategories, Expensescategories, getIncomesCategories, getExpensesCategories, getAccountCurrency, accountCurrency } = useGlobalContext();

    useEffect(() => {
        fetchDataAndProcess(startDate, endDate);
    }, [accountId]);

    const [chartData, setChartData] = useState([]);
    const initialDays = window.innerWidth <= 650 ? 5 : 30;
    const [days, setDays] = useState(initialDays);
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);

    useEffect(() => {
      const handleResize = () => {
        setScreenWidth(window.innerWidth);
        if (screenWidth <= 650) {
          setDays(5);
        } else {  
          setDays(30);
        }
      };

      window.addEventListener('resize', handleResize);

      return () => {
          window.removeEventListener('resize', handleResize);
      };
    }, []);

    useEffect(() => {
      getAllTransactions();
      getIncomesCategories();
      getExpensesCategories();
      fetchDataAndProcess(startDate, endDate);
      getAccountCurrency();
  }, []);

    const handleInput = (event) => {
      const inputValue = Math.min(365, event.target.value);

      // Check if inputValue is a valid number
      if (inputValue == 0 ){
        setDays(0);

        const startDate = getStartDate(0);
        const endDate = getEndDate();
        fetchDataAndProcess(startDate, endDate);
      } else {
        const newDays = parseInt(inputValue);
        setDays(newDays);

        const startDate = getStartDate(newDays);
        const endDate = getEndDate();
        fetchDataAndProcess(startDate, endDate);
      }
  };
  

    function getEndDate() {
        var endDate = new Date();
        return endDate;
    }

    function getStartDate(days) {
        var endDate = new Date();
        var startDate = new Date();
        startDate.setDate(endDate.getDate() - parseInt(days));
        return startDate;
    }

    const startDate = getStartDate(days);
    const endDate = getEndDate();

    const expenses = transactions.filter((transaction) => !transaction.is_income);
    const incomes = transactions.filter((transaction) => transaction.is_income);

    async function fetchDataAndProcess(startDate, endDate) {
        try {
            const barChartData = await getBarChartData(startDate, endDate);
            const chartData = barChartData.map((dayData) => {
                const dateString = format(dayData.date, dateFormat);
                return {
                    name: dateString,
                    Expense: dayData.expense / 100,
                    Income: dayData.income / 100,
                };
            });

            // Now you can use chartData in your code
            setChartData(chartData);
        } catch (error) {
            console.log("Error fetching or processing data:", error);
        }
    }

    const maxTicks = 10;
    const chartInterval = Math.ceil(chartData.length / maxTicks);

    const incomeChartData = Incomescategories.filter(category => {
        const categoryAmount = incomes
            .filter(income => income.category_id === category.id)
            .reduce((sum, income) => sum + parseInt(income.amount), 0);
        return categoryAmount > 0;
    }).map(category => {
        const categoryAmount = incomes
            .filter(income => income.category_id === category.id)
            .reduce((sum, income) => sum + parseInt(income.amount), 0);

        return {
            name: category.name,
            value: categoryAmount,
            fill: category.color,
        };
    });

    const expenseChartData = Expensescategories.filter(category => {
        const categoryAmount = expenses
            .filter(expense => expense.category_id === category.id)
            .reduce((sum, expense) => sum + parseInt(expense.amount), 0);
        return categoryAmount > 0;
    }).map(category => {
        const categoryAmount = expenses
            .filter(expense => expense.category_id === category.id)
            .reduce((sum, expense) => sum + parseInt(expense.amount), 0);

        return {
            name: category.name,
            value: categoryAmount,
            fill: category.color,
        };
    });

    const [chart, setChart] = useState('bar');

    const handleChange = (event) => {
        setChart(event.target.value);
    };

    const user = getUserFromCookies();

    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            return (
                <div
                    className="custom-tooltip"
                    style={{
                        backgroundColor: '#ffff',
                        padding: '5px',
                        border: '1px solid #cccc',
                    }}
                >
                    <label>{`${payload[0].name}: ${accountCurrency + currencyFormat(payload[0].value)}`}</label>
                </div>
            );
        }
        return null;
    };

    const CustomBarTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            const { name, Expense, Income } = payload[0].payload;
            return (
                <div
                    className="custom-tooltip"
                    style={{
                        backgroundColor: '#ffff',
                        padding: '5px',
                        border: '1px solid #cccc',
                    }}
                >
                    <label>{`${name}:`}</label>
                    <p style={{ color: 'red' }}>{`${language === 'Portuguese' ? 'Despesas' : 'Expense'}: ${accountCurrency + currencyFormat(Expense)}`}</p>
                    <p style={{ color: 'green' }}>{`${language === 'Portuguese' ? 'Receitas' : 'Income'}: ${accountCurrency + currencyFormat(Income)}`}</p>
                </div>
            );
        }
        return null;
    };
      
    return (
        <Section>
        <div className="chart-con">
          <div className="sales">
            <div className="sales_details">
              <div className="top">
                <div className="chart-selection">
                  
                  <FormControl className='select-chart'>
                    <InputLabel
                      id="demo-simple-select-label"
                      className='select-chart-label'
                    >
                      {language === 'Portuguese' ? 'Gráfico' : 'Chart'}
                    </InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={chart}
                        label={language === 'Portuguese' ? 'Gráfico' : 'Chart'}
                        onChange={handleChange}
                        sx={{
                            color: 'var(--primary-color)',
                            borderColor: 'var(--primary-color)',
                            borderWidth: '1px'
                        }}
                    >
                        <MenuItem value={"bar"}>{language === 'Portuguese' ? 'Barras' : 'Bar'}</MenuItem>
                        <MenuItem value={"pie"}>{language === 'Portuguese' ? 'Circular' : 'Pie'}</MenuItem>
                    </Select>
                  </FormControl>
                </div>
                {chart === "bar" ? 
                  <div className="input-control">
                    <span className="days-text">{language === 'Portuguese' ? 'ÚLTIMOS' : 'LAST'}</span>
                    <input
                      type="text"
                      value={days}
                      name={"days"}
                      placeholder={language === 'Portuguese' ? 'Dias' : 'Days'}
                      onChange={handleInput} 
                      className="days-input"
                    />
                    <span className="days-text">{language === 'Portuguese' ? 'DIAS' : 'DAYS'}</span>
                  </div>
                : '' }
              </div>
            </div>
            {chart === "bar" ? (
              <div className="sales_graph">
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
                      <XAxis dataKey="name" interval={chartInterval}/>
                      <YAxis />
                      <Tooltip content={<CustomBarTooltip />} />
                      <Legend />
                      <Bar dataKey="Expense" stackId="a" fill="red" name={language === 'Portuguese' ? 'Despesa' : 'Expense'} />
                      <Bar dataKey="Income" stackId="a" fill="var(--color-green)" name={language === 'Portuguese' ? 'Receita' : 'Income'} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            ) : (
                <div className="sales_pies">
                  <div className="income_pie  text-center">
                    <h1>{language === 'Portuguese' ? 'Receitas' : 'Incomes'}</h1>
                    <Box
                      sx={{
                        width: '100%',  
                        height: '40vh',
                      }}
                    >
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart style={{ cursor: 'pointer' }}>
                          <Pie
                            dataKey="value"
                            data={incomeChartData}
                            nameKey="name"
                          >
                          {incomeChartData.map((entry, index) => (
                            <Cell key={`cell-income-${index}`} fill={entry.fill} />
                          ))}
                          </Pie>
    
                          <Tooltip content={<CustomTooltip />} />
                          <Legend
                            iconType="circle"
                            formatter={(value, entry, index) => (
                                <span style={{ color: 'var(--primary-color)' }}>{value}</span>
                            )}
                          />
                          </PieChart>
                      </ResponsiveContainer>
                    </Box>
                  </div>        
                  {/* Expenses Pie */}
                  <div className="expense_pie text-center">
                    <h1>{language === 'Portuguese' ? 'Despesas' : 'Expenses'}</h1>
                      <Box
                        sx={{
                          width: '100%',  
                          height: '40vh',
                        }}
                      >
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart style={{ cursor: 'pointer' }}>
                            <Pie
                              dataKey="value"
                              data={expenseChartData}
                              nameKey="name"
                            >
                              {expenseChartData.map((entry, index) => (
                                <Cell key={`cell-expense-${index}`} fill={entry.fill} />
                              ))}
                            </Pie>
      
                            <Tooltip content={<CustomTooltip />} />
                            <Legend 
                              iconType="circle"
                              formatter={(value) => (
                                  <span style={{ color: 'var(--primary-color)' }}>{value}</span>
                              )}
                            />
                          </PieChart>
                        </ResponsiveContainer>
                      </Box>
                  </div>
                  {/* <div style={{ clear: 'both' }}></div> */}
                </div>
              )}
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
      .top{
        justify-content: space-evenly;
        margin: 1rem;
        display: flex;
        flex: 1;
      }
      .select-chart {
        border-color: var(--border-color);
        color: var(--primary-color);
        .select-chart-label {
          color: var(--primary-color2);
        }
        input {
          color: var(--primary-color) !important;
        }
      }
      .input-control{
        display: flex;
        align-items: center;
        .days-text {
          margin-left: 25px;
          margin-right: 25px;
          color: var(--primary-color);
        }
        input{
          text-align: center;
          width: 15%;
          font-family: inherit;
          font-size: inherit;
          outline: none;
          border: none;
          padding: .5rem 1rem;
          border-radius: 5px;
          border: 2px solid var(--border-color);
          background: transparent;
          resize: none;
          box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
          color: var(--primary-color);
          &::placeholder{
              color: var(--primary-color3);
          }
        }
      }
      .sales_graph {
        margin-top: 15vh;
        height: 8rem;
        width: 100%;
        .recharts-default-tooltip {
            background-color: black !important;
            border-color: black !important;
            color: white !important;
        }
      }
      .text-center {
          text-align: center;
      }  
      .sales_pies {
        display: flex;
        justify-content: space-between; 
        .income_pie,
        .expense_pie {
          margin-top: 15vh;
          width: 50%;
          height: 50%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center; 
          h1 {
            width: 100%;
            text-align: center;
          }
        }
      }
    } 
  
`;