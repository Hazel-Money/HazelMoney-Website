import axios from "axios"
import React, { useContext, useState } from "react"

//TODO add api url
const BASE_URL = "http://localhost:5000/api/v1";

const GlobalContext = React.createContext()


export const GlobalProvider = ({children}) => {

    const[incomes, setIncomes] = useState([])
    const[expenses, setExpenses] = useState([])
    const[error, setError] = useState(null)

    const addIncome = async (income) => {
        const response = await axios.post(`${BASE_URL}add-income`, income)
            .catch((error) => {
                setError(error.response.data.message)
            })
    }

    return(
        <GlobalContext.Provider value= {{
            addIncome
        }}>
            {children}
        </GlobalContext.Provider>
    )
}

export const useGlobalContext = () => {
    return useContext(GlobalContext)
}