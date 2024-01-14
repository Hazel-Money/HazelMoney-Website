import axios from "axios"
import React, { useContext, useState, useEffect  } from "react"

const BASE_URL = "http://localhost:80/api";

const GlobalContext = React.createContext()


export const GlobalProvider = ({children}) => {

    const[incomes, setIncomes] = useState([])
    const[expenses, setExpenses] = useState([])
    const [categories, setCategories] = useState([]);
    const[error, setError] = useState(null)

    const addIncome = async (income) => {
    const { account_id, is_income } = income;  // Extract account_id and is_income from income

        try {
            const response = await axios.post(`${BASE_URL}/transactions.php`, {
                ...income,  // Spread the existing properties of income
                account_id,  // Include account_id
                is_income    // Include is_income
            });
        } catch (err) {
            setError(err.response?.data?.message || "An error occurred");
        }
    };

    const getIncomes = async () => {
        const response = await axios.get(`${BASE_URL}/transactions.php`)
        setIncomes(response.data)
        console.log(response.data)
    }

    const getCategories = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/categories.php`);

            if (response && response.data) {
                setCategories(response.data);
            } else {
                console.error("Response data is undefined or null");
            }
        } catch (err) {
            setError(err.response?.data?.message || "An error occurred");
        }
    };

    useEffect(() => {
        // Fetch categories when the component mounts
        getCategories();
    }, []);

    return(
        <GlobalContext.Provider value={{
            addIncome, 
            getIncomes,
            incomes,
            categories 
        }}>
            {children}
        </GlobalContext.Provider>
    )
}

export const useGlobalContext = () => {
    return useContext(GlobalContext)
}