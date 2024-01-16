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

            getIncomes()
        } catch (err) {
            setError(err.response?.data?.message || "An error occurred");
        }
    };

    const getIncomes = async () => {
        try {
            // Fetch incomes
            const incomesResponse = await axios.get(`${BASE_URL}/transactions.php`);
            const incomeData = incomesResponse.data;
    
            // Fetch categories
            const categoriesResponse = await axios.get(`${BASE_URL}/categories.php?is_income=1&user_id=5`);
            const categoriesData = categoriesResponse.data;
            // Map category IDs to category names
            const categoryMap = {};
            categoriesData.forEach(category => {
                categoryMap[category.id] = category;
            });
    
            // Update income data with category names
            const incomesWithCategories = incomeData.map(income => ({
                ...income,
                categoryName: categoryMap[income.category_id].name,
                categoryColor: categoryMap[income.category_id].color
            }));
    
            setIncomes(incomesWithCategories);
        } catch (err) {
            setError(err.response?.data?.message || "An error occurred");
        }
    }

    const deleteIncomes = async (id) => {
        const res = await axios.delete(`${BASE_URL}/transactions.php`, {
            data: { id }
        })
        getIncomes()
    }


     

    const getCategories = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/categories.php?is_income=1&user_id=5`);

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
            deleteIncomes,
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