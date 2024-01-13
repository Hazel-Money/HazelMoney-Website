import axios from "axios"
import React, { useContext, useState } from "react"

const BASE_URL = "http://localhost:80/api";

const GlobalContext = React.createContext()


export const GlobalProvider = ({children}) => {

    const[incomes, setIncomes] = useState([])
    const[expenses, setExpenses] = useState([])
    const[error, setError] = useState(null)

    const addIncome = async (income) => {
        const response = await axios.post(`${BASE_URL}/transactions.php`, income)
            .catch((err) => {
                setError(err.response?.data?.message)
            })
    }

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