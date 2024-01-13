import axios from "axios"
import React, { useContext, useState } from "react"

const BASE_URL = "http://localhost:80/api";

const GlobalContext = React.createContext()


export const GlobalProvider = ({children}) => {

    const[incomes, setIncomes] = useState([])
    const[expenses, setExpenses] = useState([])
    const[error, setError] = useState(null)

    const addIncome = async (income) => {
    const { account_id, is_income } = income;  // Extract account_id and is_income from income

    try {
        const response = await axios.post(`${BASE_URL}/transactions.php`, {
            ...income,  // Spread the existing properties of income
            account_id,  // Include account_id
            is_income    // Include is_income
        });

        if (response && response.data) {
            // Process your data here
        } else {
            console.error("Response data is undefined or null");
        }
    } catch (err) {
        setError(err.response?.data?.message || "An error occurred");
    }
    };

    /*const getUsers = async () => {
        try {
            const response = await fetch(`${BASE_URL}/users.php`,{
                method: 'GET'
            });
            
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return await response.json();

        } catch (error) {
            console.error('Error:', error);
        }
    }*/

    return(
        <GlobalContext.Provider value= {{addIncome}}>
            {children}
        </GlobalContext.Provider>
    )
}

export const useGlobalContext = () => {
    return useContext(GlobalContext)
}