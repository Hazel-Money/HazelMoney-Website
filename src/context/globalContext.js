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
    const[incomesSliced, setIncomesSliced] = useState([])
    const[expensesSliced, setExpensesSliced] = useState([])
    const [currentIncomeIndex, setCurrentIncomeIndex] = useState(0);
    const [currentExpenseIndex, setCurrentExpenseIndex] = useState(0);
    const[expenses, setExpenses] = useState([])
    const[transactions, setTransactions] = useState([])
    const [Incomescategories, setIncomeCategories] = useState([])
    const [Expensescategories, setExpenseCategories] = useState([])
    const [frequencies, setFrequencies] = useState([])
    const [regularPayments , setRegularPayments] = useState([])
    const[paymentsSliced, setPaymentsSliced] = useState([])
    const [currentPaymentIndex, setCurrentPaymentIndex] = useState(0);
    const [currencies, setCurrencies] = useState([])
    const [accounts, setAccounts] = useState([])
    const[error, setError] = useState(null)
    const[historyError, setHistoryError] = useState(null)
    const[loginError, setLoginError] = useState(null)
    const[currency, setCurrency] = useState('USD')
    const[balance, setBalance] = useState(null)
    const[totalIncomeAmount, setTotalIncomeAmount] = useState(null)
    const[totalExpensesAmount, setTotalExpensesAmount] = useState(null)


    //calculate incomes
    const addIncome = async (income) => {
        const { account_id, is_income } = income;
        try {
            const user = getUserFromCookies();
            axios.defaults.headers.common['Authorization'] = `Bearer ${cookies.get('jwt')}`;
            const requestData = {
                ...income,
                account_id,
                is_income
            };
            const response = await axios.post(`${BASE_URL}/transactions.php`, requestData);
            getIncomes(user.id);
            getBalance(); 
            sliceIncomes();
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

    const sliceIncomes = () => {
        const history = [...incomes];
        history.sort((a, b) => {
            return new Date(b.createdAt) - new Date(a.createdAt);
        });
    
        const endIndex = Math.min(currentIncomeIndex + 2, incomes.length);
        setIncomesSliced(history.slice(currentIncomeIndex, endIndex));
    };
    
    const navigateIncomes = (direction) => {
        const step = 2; 
        let newIndex;
    
        if (direction === 'next') {
            newIndex = Math.min(currentIncomeIndex + step, incomes.length - 1);
        } else {
            newIndex = Math.max(currentIncomeIndex - step, 0);
        }
    
        setCurrentIncomeIndex(newIndex);
        sliceIncomes();
    };
    
    const deleteIncomes = async (id) => {
            axios.defaults.headers.common['Authorization'] = `Bearer ${cookies.get('jwt')}`;
            const res = await axios.delete(`${BASE_URL}/transactions.php`, {
            data: { id }
        })
        getIncomes()
    }

    const totalIncome = async () => {
        const user = getUserFromCookies();
        axios.defaults.headers.common['Authorization'] = `Bearer ${cookies.get('jwt')}`;
        const response = await axios.get(`${BASE_URL}/user/total_income`);
        const totalIncome =  response.data.total_income;
        setTotalIncomeAmount(totalIncome);
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
            getBalance();
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

    const sliceExpenses = () => {
        const history = [...expenses];
        history.sort((a, b) => {
            return new Date(b.createdAt) - new Date(a.createdAt);
        });
    
        const endIndex = Math.min(currentExpenseIndex + 2, expenses.length);
        setExpensesSliced(history.slice(currentExpenseIndex, endIndex));
    };
    
    const navigateExpenses = (direction) => {
        const step = 2; 
        let newIndex;
    
        if (direction === 'next') {
            newIndex = Math.min(currentExpenseIndex + step, expenses.length - 1);
        } else {
            newIndex = Math.max(currentExpenseIndex - step, 0);
        }
    
        setCurrentExpenseIndex(newIndex);
        sliceExpenses();
    };
        
    const deleteExpense = async (id) => {
            axios.defaults.headers.common['Authorization'] = `Bearer ${cookies.get('jwt')}`;
            const res = await axios.delete(`${BASE_URL}/transactions.php`, {
            data: { id }
        })
        getExpenses()
    }

    const totalExpenses = async () => {
        try {
            const user = getUserFromCookies();
            axios.defaults.headers.common['Authorization'] = `Bearer ${cookies.get('jwt')}`;
            const response = await axios.get(`${BASE_URL}/user/total_expense`);
            const totalExpenses =  response.data.total_expense;
            setTotalExpensesAmount(totalExpenses);
        } catch (err) {
            console.log(err.response?.data?.message);
        }
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

    const getAccounts = async () => {
        try{
            const user = getUserFromCookies();
            axios.defaults.headers.common['Authorization'] = `Bearer ${cookies.get('jwt')}`;
            const userAccounts = await axios.get(`${BASE_URL}/accounts.php?user_id=${user.id}`);
            setAccounts(userAccounts.data)
        } catch{
            console.log("nao ha contas pa ninguem seus nabos")
        }
    }
    
    const addAccount = async (credentials) => {
        const {user_id, currency} = credentials
        try{
            const user = getUserFromCookies();
            axios.defaults.headers.common['Authorization'] = `Bearer ${cookies.get('jwt')}`;
            const response = await axios.post(`${BASE_URL}/accounts.php`, {
            ...credentials,
            user_id,
            currency,
            });
            getAccounts()
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Account created successfully",
                showConfirmButton: false,
                timer: 1500
            });
        } catch (err){
            console.log(err.response?.data?.message || "nao ha contas pa ninguem");
        }
    }

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
        try {
            const user = getUserFromCookies();
            axios.defaults.headers.common['Authorization'] = `Bearer ${cookies.get('jwt')}`;
            const response = await axios.post(`${BASE_URL}/regular_payments.php`, {
                ...payment,  
                account_id,  
            });
            getRegularPayments(user.id); 
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

    const getRegularPayments = async () => {
        try {
            const user = getUserFromCookies();
            axios.defaults.headers.common['Authorization'] = `Bearer ${cookies.get('jwt')}`;
            const response = await axios.get(`${BASE_URL}/regular_payments.php?account_id=12`);
            const paymentsData = response.data;

            const categoriesResponse = await axios.get(`${BASE_URL}/categories.php?user_id=${user.id}`);
            const categoriesData = categoriesResponse.data;
            const categoryMap = {};
            categoriesData.forEach(category => {
                categoryMap[category.id] = category;
            });
            
            const paymentsWithCategories = paymentsData.length > 0
             ? paymentsData.map(payment => ({
                ...payment,
                categoryName: categoryMap[payment.category_id]?.name,
                categoryColor: categoryMap[payment.category_id]?.color,
                icon: categoryMap[payment.category_id]?.icon
            }))
            : [];
            if (paymentsWithCategories.length > 0) {
                setRegularPayments(paymentsWithCategories);
            }

        } catch (err) {
            setError(err.response?.data?.message || "An error occurred17");
        }
    };

    const slicePayments = () => {
        const history = [...regularPayments];
        history.sort((a, b) => {
            return new Date(b.createdAt) - new Date(a.createdAt);
        });
    
        const endIndex = Math.min(currentPaymentIndex + 3, regularPayments.length);
        setPaymentsSliced(history.slice(currentPaymentIndex, endIndex));
    };
    
    const navigatePayments = (direction) => {
        const step = 3; 
        let newIndex;
    
        if (direction === 'next') {
            newIndex = Math.min(currentPaymentIndex + step, regularPayments.length - 1);
        } else {
            newIndex = Math.max(currentPaymentIndex - step, 0);
        }
    
        setCurrentPaymentIndex(newIndex);
        slicePayments();
    };

    const deleteRegularPayments = async (id) => {
        axios.defaults.headers.common['Authorization'] = `Bearer ${cookies.get('jwt')}`;
        const res = await axios.delete(`${BASE_URL}/regular_payments`, {
        data: { id }
        })
        getRegularPayments()
    }

    const getCurrencies = async () => {
        const user = getUserFromCookies();
        axios.defaults.headers.common['Authorization'] = `Bearer ${cookies.get('jwt')}`;
        const response = await axios.get(`${BASE_URL}/currencies.php`);
        if (response && response.data) {
            setCurrencies(response.data);
        } else {
            console.error("Response data is undefined or null");
        }
    }

    const changeCurrency = async (newCurrencyCode) => {
        try {
            const user = getUserFromCookies();
            axios.defaults.headers.common['Authorization'] = `Bearer ${cookies.get('jwt')}`;
            const currencyJSON = JSON.stringify({'code': newCurrencyCode});
            const response = await axios.put(`${BASE_URL}/change_currency/user`, currencyJSON);
            //setCurrency(newCurrencyCode)
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Currency changed successfully",
                showConfirmButton: false,
                timer: 1500
                }); 
            getCurrency()
        } catch (err) {
            Swal.fire({
                position: "center",
                icon: "error",
                title: "You must select a currency",
                showConfirmButton: false,
                timer: 1500
            }); 
        }
    }

    const getCurrency = async () => {
        try{
            const user = getUserFromCookies();
            axios.defaults.headers.common['Authorization'] = `Bearer ${cookies.get('jwt')}`;
            const response = await axios.get(`${BASE_URL}/user/default_currency`);
            const currency = response.data.currency; 
            setCurrency(currency);
            getBalance();
        } catch{
            console.log("cheiras a coco")
        }
    }

    const getBalance = async () => {
        try{
            const user = getUserFromCookies();
            axios.defaults.headers.common['Authorization'] = `Bearer ${cookies.get('jwt')}`;
            const response = await axios.get(`${BASE_URL}/users?id=${user.id}`);
            const responseUser = response.data;
            const balance = responseUser.balance;
            setBalance(balance);
        } catch{
            console.log("cheiras mal")
        }
    }

    useEffect(() => {
        getAllTransactions();
        getExpensesCategories();
        getIncomesCategories();
    }, []);

    return(
        <GlobalContext.Provider value={{
            totalExpenses,
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
            getRegularPayments,
            deleteRegularPayments,
            getCurrencies,
            setCurrency,
            getCurrency,
            changeCurrency,
            getAccounts,
            getBalance,
            addAccount,
            sliceIncomes,
            navigateIncomes,
            sliceExpenses,
            navigateExpenses,
            navigatePayments,
            slicePayments,
            currentPaymentIndex,
            paymentsSliced,
            currentExpenseIndex,
            expensesSliced,
            currentIncomeIndex,
            incomesSliced,
            totalIncomeAmount,
            totalExpensesAmount,
            balance,
            accounts,
            currency,
            currencies,
            regularPayments,
            frequencies,
            loginError,
            error,
            historyError,
            transactions,
            incomes,
            expenses,
            Incomescategories,
            Expensescategories,
            incomesSliced,
        }}>
            {children}
        </GlobalContext.Provider>
    )
}

export const useGlobalContext = () => {
    return useContext(GlobalContext)
}