import axios from "axios";
import React, { useContext, useState, useEffect  } from "react";
import Cookies from "universal-cookie"
import {jwtDecode} from "jwt-decode"
import Swal from 'sweetalert2'


const BASE_URL = "http://localhost:80/api";

const GlobalContext = React.createContext()


export const GlobalProvider = ({children}) => {
    const cookies = new Cookies();
    const[incomes, setIncomes] = useState([])
    const[expenses, setExpenses] = useState([])
    const[transactions, setTransactions] = useState([])
    const [Incomescategories, setIncomeCategories] = useState([]);
    const [Expensescategories, setExpenseCategories] = useState([]);
    const[error, setError] = useState(null)
    const[user, setUser] = useState(null)

    //calculate incomes
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
            const incomesResponse = await axios.get(`${BASE_URL}/transactions.php?is_income=1`);
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

    const totalIncome = () => {
        let totalIncome = 0;
        incomes.forEach((income) => {
            totalIncome = totalIncome + parseInt(income.amount)
        })
        
        return totalIncome;
    }

    //calculate expenses
    const addExpense = async (expense) => {
        const { account_id, is_income } = expense;  
        try {
            const response = await axios.post(`${BASE_URL}/transactions.php`, {
                ...expense,  
                account_id,  
                is_income    
            });

            getExpenses()
        } catch (err) {
            setError(err.response?.data?.message || "An error occurred");
        }
    };
    
    const getExpenses = async () => {
        try {
            const expensesResponse = await axios.get(`${BASE_URL}/transactions.php?is_income=0`);
            const expensesData = expensesResponse.data;
            
            const categoriesResponse = await axios.get(`${BASE_URL}/categories.php?is_income=0&user_id=5`);
            const categoriesData = categoriesResponse.data;
            
            const categoryMap = {};
            categoriesData.forEach(category => {
                categoryMap[category.id] = category;
            });
            
            const expensesWithCategories = expensesData.map(expense => ({
                ...expense,
                categoryName: categoryMap[expense.category_id]['name'],
                categoryColor: categoryMap[expense.category_id]['color']
            }));
    
            setExpenses(expensesWithCategories);
        } catch (err) {
            setError(err.response?.data?.message || "An error occurred");
        }
    }
        
    const deleteExpense = async (id) => {
        const res = await axios.delete(`${BASE_URL}/transactions.php`, {
            data: { id }
        })
        getExpenses()
    }

    const totalExpenses = () => {
        let totalExpense = 0;
        expenses.forEach((expense) => {
            totalExpense = totalExpense + parseInt(expense.amount)
        })
        
        return totalExpense;
    }

    const totalBalance = () => {
        return totalIncome() - totalExpenses()
    }

    const getAllTransactions = async () => {
        try {
            const transactionsResponse = await axios.get(`${BASE_URL}/transactions.php?account_id=12`);
            const transactionsData = transactionsResponse.data;
            
            const categoriesResponse = await axios.get(`${BASE_URL}/categories.php?user_id=5`);
            const categoriesData = categoriesResponse.data;
            const categoryMap = {};
            categoriesData.forEach(category => {
                categoryMap[category.id] = category;
            });
            
            const transactionsWithCategories = transactionsData.map(transaction => ({
                ...transaction,
                categoryName: categoryMap[transaction.category_id]['name'],
                categoryColor: categoryMap[transaction.category_id]['color']
            }));
            setTransactions(transactionsWithCategories);
        } catch (err) {
            setError(err.response?.data?.message || "An error occurred");
        }
    }

    const transactionHistory = () => {
        const history = [...transactions]

        history.sort((a, b) => {
            return new Date(b.createdAt) - new Date(a.createdAt)
        })
        return history.slice(0, 6)
    }

    const getIncomesCategories = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/categories.php?is_income=1&user_id=5`);

            if (response && response.data) {
                setIncomeCategories(response.data);
            } else {
                console.error("Response data is undefined or null");
            }
        } catch (err) {
            setError(err.response?.data?.message || "An error occurred");
        }
    };

    const getExpensesCategories = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/categories.php?is_income=0&user_id=5`);

            if (response && response.data) {
                setExpenseCategories(response.data);
            } else {
                console.error("Response data is undefined or null");
            }
        } catch (err) {
            setError(err.response?.data?.message || "An error occurred");
        }
    };

    const registerUser = async (credentials) => {
        try {
            const response = await axios.post(`${BASE_URL}/register.php`, credentials);
        } catch (err) {
            setError(err.response?.data?.message || "An error occurred");
        }
    }

    const loginUser = async (credentials) => {
        try {
            const response = await axios.post(`${BASE_URL}/login.php`, credentials);
            
            // const d1 = new Date()
            // const currentTime = parseInt(d1.getTime() / 1000)
            // const maxAge = response.expiresAt - currentTime
            
            const token = jwtDecode(response.data.jwt);
            const userData = token.data;

            cookies.set('jwt', response.data.jwt, {
                expires: new Date(token.exp * 1000),
            });

            setUser(userData);
        } catch (err) {
            setError(err.response?.data?.message || "An error occurred");
        }
    }

    const getUserFromCookies = () => {
        try {
            const cookie = cookies.get('jwt');
            const userData = jwtDecode(cookie).data;
            return userData;
        } catch (err) {
        
        }
    };
    
    const getUser = () => {
        const userData = getUserFromCookies();
    
        setUser(userData);
    };

    const logout = () => {
        Swal.fire({
            title: "Do you to sign out ?",
            showDenyButton: true,   
            confirmButtonText: "Sign out",
            denyButtonText: `Cancel`
          }).then((result) => {
            if (result.isConfirmed) {
                cookies.remove('jwt');
                setUser(null);
            } else if (result.isDenied) {
              Swal.fire("Changes are not saved", "", "info");
            }
          });
    };

    useEffect(() => {
        // Fetch categories when the component mounts
        getAllTransactions();
        getExpensesCategories();
        getIncomesCategories();
    }, []);

    return(
        <GlobalContext.Provider value={{
            addIncome, 
            getIncomes,
            deleteIncomes,
            totalIncome,
            addExpense,
            getExpenses,
            deleteExpense,
            totalExpenses,
            totalBalance,
            transactionHistory,
            getAllTransactions,
            registerUser,
            loginUser,
            getUser,
            logout,
            error,
            setError,
            user,
            transactions,
            incomes,
            expenses,
            Incomescategories,
            Expensescategories,
            
        }}>
            {children}
        </GlobalContext.Provider>
    )
}

export const useGlobalContext = () => {
    return useContext(GlobalContext)
}