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
    const [frequencies, setFrequencies] = useState([])
    const[error, setError] = useState(null)
    const[historyError, setHistoryError] = useState(null)
    const[loginError, setLoginError] = useState(null)

    //calculate incomes
    const addIncome = async (income) => {
        const { account_id, is_income } = income;
        try {
            const user = getUserFromCookies();
            axios.defaults.headers.common['Authorization'] = `Bearer ${cookies.get('jwt')}`;
            const response = await axios.post(`${BASE_URL}/transactions.php`, {
                ...income,
                account_id,
                is_income
            });
            getIncomes(user.id); 
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Income added successfully",
                showConfirmButton: false,
                timer: 1500
            });
        } catch (err) {
            setError(err.response?.data?.message || "An error occurred1");
        }
    };

    
    const getIncomes = async () => {
        try {
            const user = getUserFromCookies();
            axios.defaults.headers.common['Authorization'] = `Bearer ${cookies.get('jwt')}`;
            const incomesResponse = await axios.get(`${BASE_URL}/transactions.php?user_id=${user.id}&is_income=1`);
            const incomesData = incomesResponse.data;
    
            const categoriesResponse = await axios.get(`${BASE_URL}/categories.php?user_id=${user.id}&is_income=1`);
            const categoriesData = categoriesResponse.data;
    
            const categoryMap = {};
            categoriesData.forEach(category => {
                categoryMap[category.id] = category;
            });
    
            const incomesWithCategories = incomesData.length > 0
                ? incomesData.map(income => ({
                    ...income,
                    categoryName: categoryMap[income.category_id]?.name || 'Unknown', // Check if defined
                    categoryColor: categoryMap[income.category_id]?.color || 'gray', // Provide default color
                }))
                : [];
    
            if (incomesWithCategories.length > 0) {
                setIncomes(incomesWithCategories);
            }
        } catch (err) {
            setError(err.response?.data?.message || "An error occurred2");
            console.error("Error in getIncomes:", err);
        }
    };
    
    
    const deleteIncomes = async (id) => {
            axios.defaults.headers.common['Authorization'] = `Bearer ${cookies.get('jwt')}`;
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
            const user = getUserFromCookies();
            axios.defaults.headers.common['Authorization'] = `Bearer ${cookies.get('jwt')}`;
            const response = await axios.post(`${BASE_URL}/transactions.php`, {
                ...expense,  
                account_id,  
                is_income    
            });

            getExpenses(user.id)
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Expense added successfully",
                showConfirmButton: false,
                timer: 1500
              });
        } catch (err) {
            setError(err.response?.data?.message || "An error occurred3");
        }
    };
    
    const getExpenses = async () => {
        try {
            const user = getUserFromCookies();
            axios.defaults.headers.common['Authorization'] = `Bearer ${cookies.get('jwt')}`;
            const expensesResponse = await axios.get(`${BASE_URL}/transactions.php?user_id=${user.id}&is_income=0`);
            const expensesData = expensesResponse.data;

            const categoriesResponse = await axios.get(`${BASE_URL}/categories.php?user_id=${user.id}&is_income=0`);
            const categoriesData = categoriesResponse.data;

            const categoryMap = {};
            categoriesData.forEach(category => {
                categoryMap[category.id] = category;
            });
            
            const expensesWithCategories = expensesData.length > 0
                ? expensesData.map(expense => ({
                    ...expense,
                    categoryName: categoryMap[expense.category_id]?.name || 'Unknown',
                    categoryColor: categoryMap[expense.category_id]?.color || 'gray',
                }))
                : [];

            if (expensesWithCategories.length > 0) {
                setExpenses(expensesWithCategories);
            }
        } catch (err) {
            setError(err.response?.data?.message || "An error occurred4");
        }
    }
        
    const deleteExpense = async (id) => {
            axios.defaults.headers.common['Authorization'] = `Bearer ${cookies.get('jwt')}`;
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
            const user = getUserFromCookies();
            axios.defaults.headers.common['Authorization'] = `Bearer ${cookies.get('jwt')}`;
            const transactionsResponse = await axios.get(`${BASE_URL}/transactions.php?user_id=${user.id}`);
            const transactionsData = transactionsResponse.data;

            const categoriesResponse = await axios.get(`${BASE_URL}/categories.php?user_id=${user.id}`);
            const categoriesData = categoriesResponse.data;
            const categoryMap = {};
            categoriesData.forEach(category => {
                categoryMap[category.id] = category;
            });

            const transactionsWithCategories = transactionsData.length > 0
             ? transactionsData.map(transaction => ({
                ...transaction,
                categoryName: categoryMap[transaction.category_id]?.name,
                categoryColor: categoryMap[transaction.category_id]?.color,
            }))
            : [];

            if (transactionsWithCategories.length > 0) {
                setTransactions(transactionsWithCategories);
            }
        } catch (err) {
            setHistoryError(err.response?.data?.message || "An error occurred5");
        }
    }

    const transactionHistory = () => {
        const history = [...transactions]

        history.sort((a, b) => {
            return new Date(b.createdAt) - new Date(a.createdAt)
        })
        return history.slice(0, 5)
    }

    const addCategory = async (category) => {
        const { user_id } = category;  
        try {
            axios.defaults.headers.common['Authorization'] = `Bearer ${cookies.get('jwt')}`;
            const response = await axios.post(`${BASE_URL}/categories.php`, {
                ...category,
                user_id});
            console.log(response);
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Category successfully added",
                showConfirmButton: false,
                timer: 1500
              });
        } catch (err) {
            setLoginError(err.response?.data?.message || "An error occurred6");
        }
    }

    const getIncomesCategories = async () => {
        try {
            const user = getUserFromCookies();
            axios.defaults.headers.common['Authorization'] = `Bearer ${cookies.get('jwt')}`;
            const response = await axios.get(`${BASE_URL}/categories.php?is_income=1&user_id=${user.id}`);

            if (response && response.data) {
                setIncomeCategories(response.data);
            } else {
                console.error("Response data is undefined or null");
            }
        } catch (err) {
            setError(err.response?.data?.message || "An error occurred7");
        }
    };

    const getExpensesCategories = async () => {
        try {
            const user = getUserFromCookies();
            axios.defaults.headers.common['Authorization'] = `Bearer ${cookies.get('jwt')}`;
            const response = await axios.get(`${BASE_URL}/categories.php?is_income=0&user_id=${user.id}`);

            if (response && response.data) {
                setExpenseCategories(response.data);
            } else {
                console.error("Response data is undefined or null");
            }
        } catch (err) {
            setError(err.response?.data?.message || "An error occurred8");
        }
    };

 

    const registerUser = async (credentials) => {
        try {
            const response = await axios.post(`${BASE_URL}/register.php`, credentials);
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Successfully registered",
                showConfirmButton: false,
                timer: 1500
              });
        } catch (err) {
            setLoginError(err.response?.data?.message || "An error occurred9");
        }
    }

    const loginUser = async (credentials) => {
        try {
            const response = await axios.post(`${BASE_URL}/login.php`, credentials);
        
            axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.jwt}`;
            const token = jwtDecode(response.data.jwt);
            const userData = token.data;

            cookies.set('jwt', response.data.jwt, {
                expires: new Date(token.exp * 1000),
            });

            Swal.fire({
                position: "center",
                icon: "success",
                title: "Successful logged in",
                showConfirmButton: false,
                timer: 1500
              });

              window.location.reload(false);

        } catch (err) {
            setLoginError(err.response?.data?.message || "An error occurred");
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
    

    const logout = () => {
        Swal.fire({
            title: "Do you to sign out ?",
            showDenyButton: true,   
            confirmButtonText: "Sign out",
            denyButtonText: `Cancel`
          }).then((result) => {
            if (result.isConfirmed) {
                cookies.remove('jwt');
                window.location.reload(false);
            } else if (result.isDenied) {
              Swal.fire("Changes are not saved", "", "info");
            }
          });
    };

    const getFrequencies = async () => {
        try {
            const user = getUserFromCookies();
            axios.defaults.headers.common['Authorization'] = `Bearer ${cookies.get('jwt')}`;
            const response = await axios.get(`${BASE_URL}/frequencies.php`);

            if (response && response.data) {
                setFrequencies(response.data);
            } else {
                console.error("Response data is undefined or null");
            }
        } catch (err) {
            setError(err.response?.data?.message || "An error occurred12");
        }
    };

    const addRegularPayment = async (payment) => {
        const { account_id } = payment;  
        console.log(account_id)
        try {
            const user = getUserFromCookies();
            axios.defaults.headers.common['Authorization'] = `Bearer ${cookies.get('jwt')}`;
            const response = await axios.post(`${BASE_URL}/regular_payments.php`, {
                ...payment,  
                account_id,  
            });
            console.log(response)
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Regular payment added successfully",
                showConfirmButton: false,
                timer: 1500
                });
        } catch (err) {
            setError(err.response?.data?.message || "An error occurred13");
        }
    }

    useEffect(() => {
        getAllTransactions();
        getExpensesCategories();
        getIncomesCategories();
    }, []);

    return(
        <GlobalContext.Provider value={{
            addIncome, 
            getIncomes,
            getIncomesCategories,
            deleteIncomes,
            totalIncome,
            addExpense,
            getExpenses,
            getExpensesCategories,
            deleteExpense,
            totalExpenses,
            totalBalance,
            transactionHistory,
            getAllTransactions,
            registerUser,
            loginUser,
            logout,
            addCategory,
            setError,
            setLoginError,
            getUserFromCookies,
            setHistoryError,
            getFrequencies,
            setFrequencies,
            addRegularPayment,
            frequencies,
            loginError,
            error,
            historyError,
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