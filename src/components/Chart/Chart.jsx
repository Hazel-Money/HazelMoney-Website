import React, {useState, useEffect} from 'react'
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import styled from "styled-components";
import { useGlobalContext } from '../../context/globalContext';
function Balance() {

    const {getAllTransactions} = useGlobalContext();

    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        // Fetch transactions data when the component mounts
        const fetchData = async () => {
            try {
                const transactions = await getAllTransactions();
                
                // Check if transactions is not undefined and not empty
                if (transactions && transactions.length > 0) {
                    // Process the transactions data and set it in the state
                    const processedChartData = transactions.map(transaction => ({
                        name: transaction.payment_date, // Assuming payment_date is the date field
                        Income: transaction.is_income === '1' ? transaction.amount : 0,
                        Expense: transaction.is_income === '0' ? transaction.amount : 0,
                    }));
                    
                    setChartData(processedChartData);
                } else {
                    // Handle the case where transactions is undefined or empty
                    console.error("No transactions data available");
                }
            } catch (error) {
                // Handle any errors that might occur during the fetch
                console.error("Error fetching transactions:", error);
            }
        };
    
        fetchData();
    }, [getAllTransactions]); // Add getAllTransactions to the dependency array
    

    return (
        <Section>
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
                    <ResponsiveContainer width="100%" height="150%">

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
        </Section>
    )
}

export default Balance
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