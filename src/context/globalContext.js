import axios from "axios";
import React, { useContext, useState } from "react";
import Cookies from "universal-cookie"
import {jwtDecode} from "jwt-decode"
import Swal from 'sweetalert2'

const BASE_URL = "http://localhost:80/api";

const GlobalContext = React.createContext()


export const GlobalProvider = ({children}) => {
    const cookies = new Cookies();
    const [incomes, setIncomes] = useState([])
    const [incomesSliced, setIncomesSliced] = useState([])
    const [expensesSliced, setExpensesSliced] = useState([])
    const [currentIncomeIndex, setCurrentIncomeIndex] = useState(0)
    const [currentExpenseIndex, setCurrentExpenseIndex] = useState(0)
    const [expenses, setExpenses] = useState([])
    const [transactions, setTransactions] = useState([])
    const [Incomescategories, setIncomeCategories] = useState([])
    const [Expensescategories, setExpenseCategories] = useState([])
    const [allCategories, setAllCategories] = useState([])
    const [frequencies, setFrequencies] = useState([])
    const [regularPayments , setRegularPayments] = useState([])
    const [paymentsSliced, setPaymentsSliced] = useState([])
    const [currentPaymentIndex, setCurrentPaymentIndex] = useState(0)
    const [currencies, setCurrencies] = useState([])
    const [accounts, setAccounts] = useState([])
    const [error, setError] = useState(null)
    const [expenseError, setExpenseError] = useState(null)
    const [paymentError, setPaymentError] = useState(null)
    const [historyError, setHistoryError] = useState(null)
    const [currency, setCurrency] = useState('USD')
    const [balance, setBalance] = useState(null)
    const [accountBalance, setAccountBalance] = useState(null)
    const [accountIncomeAmount, setAccountIncomeAmount] = useState(null)
    const [accountExpenseAmount, setAccountExpenseAmount] = useState(null)
    const [totalExpensesAmount, setTotalExpensesAmount] = useState(null)
    const [accountName, setAccountName] = useState("All")
    const [accountId, setAccountId] = useState("All")
    const [accountCurrency, setAccountCurrency] = useState(null)
    const [profilePicture, setProfilePicture] = useState("")
    const [language, setLanguage] = useState(localStorage.getItem('environmentLanguage'))
    const [userUsername, setUsername] = useState("")
    const [userEmail, setEmail] = useState("")
    const [action, setAction] = useState('Login');

    function formatDate(date) {
        // Get year, month, day, hours, minutes, and seconds from the Date object
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');
    
        // Concatenate the date components into the desired format
        const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    
        return formattedDate;
    }

    function formatDateForGET(date) {
        // Get year, month, day, hours, minutes, and seconds from the Date object
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
        const day = String(date.getDate()).padStart(2, '0');
    
        // Concatenate the date components into the desired format
        const formattedDate = `${year}-${month}-${day}`;
    
        return formattedDate;
    }

    //calculate incomes
    const addIncome = (income) => {
        return new Promise(async (resolve, reject) => {
          const { is_income } = income;
          try {
            if (cookies.get('jwt') === undefined) {
              reject('JWT token not found');
            }
            axios.defaults.headers.common['Authorization'] = `Bearer ${cookies.get('jwt')}`;
            const requestData = {
              ...income,
              is_income
            };
            requestData.payment_date = formatDate(requestData.payment_date);
            const response = await axios.post(`${BASE_URL}/transactions.php`, requestData);
            getIncomes();
            getBalance();
            sliceIncomes();
            accountIncome();
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: language === 'Portuguese' ? 'Receita adicionada com sucesso' : 'Income added successfully',
              showConfirmButton: false,
              timer: 1500
            });
            resolve(response);
          } catch (err) {
            Swal.fire({
              position: 'center',
              icon: 'error',
              title: err.response?.data?.message || 'Something bad has happened',
              showConfirmButton: true
            });
            reject(err);
          }
        });
    };
      
    
    const getIncomes = async () => {
        try {
            const user = getUserFromCookies();
            if (cookies.get('jwt') === undefined) {
                return [];
            }
            axios.defaults.headers.common['Authorization'] = `Bearer ${cookies.get('jwt')}`;
            let request;
            if (accountId == "All") {
                request = `${BASE_URL}/transactions.php?user_id=${user.id}&is_income=1`;
            } else {
                request = `${BASE_URL}/transactions.php?account_id=${accountId}&is_income=1`;
            }
            const incomesResponse = await axios.get(request);
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
            } else {
                setIncomes([]);
            }
        } catch (err) {
            setError(err.response?.data?.message || "Error getting incomes");
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
        const history = [...incomes];
        const step = 2;
        let newIndex;
        
        let endDiff = 1;
        if (history.length % 2 === 0) {
            endDiff = 2;
        }

        if (direction === 'next') {
            newIndex = Math.min(currentIncomeIndex + step, incomes.length - endDiff);
        } else {
            newIndex = Math.max(currentIncomeIndex - step, 0);
        }
    
        setCurrentIncomeIndex(newIndex);
        sliceIncomes();
    };
    
    const deleteIncomes = async (id) => {
        if (cookies.get('jwt') === undefined) {
            return [];
        }
        axios.defaults.headers.common['Authorization'] = `Bearer ${cookies.get('jwt')}`;
        const res = await axios.delete(`${BASE_URL}/transactions.php`, {
            data: { id }
        })
        getIncomes()
        accountIncome();
        getBalance();
    }

    const totalIncome = async () => {
        if (cookies.get('jwt') === undefined) {
                return [];
        }
        axios.defaults.headers.common['Authorization'] = `Bearer ${cookies.get('jwt')}`;
        const response = await axios.get(`${BASE_URL}/user/total_income`);
        const totalIncome =  response.data.total_income;
        if (totalIncome == null){
            setAccountIncomeAmount("0");
            return;
        }
        setAccountIncomeAmount(totalIncome);
    }

    const accountIncome = async () => {
        if (cookies.get('jwt') === undefined) {
                return [];
        }
        axios.defaults.headers.common['Authorization'] = `Bearer ${cookies.get('jwt')}`;
        let request;
        if (accountId == "All") {
            totalIncome();
            return;
        } else {
            request = `${BASE_URL}/account/${accountId}/total_income`;
        }
        const response = await axios.get(request);
        const total_income =  response.data.total_income;
        setAccountIncomeAmount(total_income);
    }

    //calculate expenses
    const addExpense = async (expense) => { 
        return new Promise(async (resolve, reject) => {
            const { is_income } = expense;  
            try {
                if (cookies.get('jwt') === undefined) {
                    return [];
                }
                axios.defaults.headers.common['Authorization'] = `Bearer ${cookies.get('jwt')}`;
                expense.payment_date = formatDate(expense.payment_date);
                const response = await axios.post(`${BASE_URL}/transactions.php`, {
                    ...expense,  
                    is_income    
                });
                getExpenses()
                getBalance()
                accountExpense()
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title:(language === 'Portuguese' ? "Despesa adicionada com sucesso" : "Expense added successfully"),
                    showConfirmButton: false,
                    timer: 1500
                });
            } catch (err) {
                Swal.fire({
                    position: "center",
                    icon: "error",
                    title: err.response?.data?.message || "Something bad has happened",
                    showConfirmButton: true
                }); 
                reject(err);
            }
        })
    };
    
    const getExpenses = async () => {
        try {
            const user = getUserFromCookies();
            if (cookies.get('jwt') === undefined) {
                return [];
            }
            axios.defaults.headers.common['Authorization'] = `Bearer ${cookies.get('jwt')}`;
            let request;
            if (accountId == "All") {
                request = `${BASE_URL}/transactions.php?user_id=${user.id}&is_income=0`;
            } else {
                request = `${BASE_URL}/transactions.php?account_id=${accountId}&is_income=0`;
            }
            const expensesResponse = await axios.get(request);
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
            } else {
                setExpenses([]);
            }
        } catch (err) {
            setExpenseError(err.response?.data?.message || "Error getting expenses");
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
        const history = [...expenses];
        const step = 2; 
        let newIndex;

        let endDiff = 1;
        if (history.length % 2 === 0) {
            endDiff = 2;
        }
    
        if (direction === 'next') {
            newIndex = Math.min(currentExpenseIndex + step, expenses.length - endDiff);
        } else {
            newIndex = Math.max(currentExpenseIndex - step, 0);
        }
    
        setCurrentExpenseIndex(newIndex);
        sliceExpenses();
    };
        
    const deleteExpense = async (id) => {
            if (cookies.get('jwt') === undefined) {
                return [];
            }
            axios.defaults.headers.common['Authorization'] = `Bearer ${cookies.get('jwt')}`;
            const res = await axios.delete(`${BASE_URL}/transactions.php`, {
            data: { id }
        })
        getExpenses();
        accountExpense();
        getBalance();
    }

    const totalExpenses = async () => {
        try {
            if (cookies.get('jwt') === undefined) {
                return [];
            }
            axios.defaults.headers.common['Authorization'] = `Bearer ${cookies.get('jwt')}`;
            const response = await axios.get(`${BASE_URL}/user/total_expense`);
            const totalExpenses =  response.data.total_expense;
            if (totalExpenses == null){
                setAccountExpenseAmount("0");
                return;
            }
            setAccountExpenseAmount(totalExpenses);
        } catch (err) {
            console.log(err.response?.data?.message);
        }
    }
    
    const accountExpense = async () => {
        const user = getUserFromCookies();
        if (cookies.get('jwt') === undefined) {
                return [];
            }
        axios.defaults.headers.common['Authorization'] = `Bearer ${cookies.get('jwt')}`;
        let request;
        if (accountId == "All") {
            totalExpenses();
            return;
        } else {
            request = `${BASE_URL}/account/${accountId}/total_expense`;
        }
        const response = await axios.get(request);
        const total_expense =  response.data.total_expense;
        setAccountExpenseAmount(total_expense);
    }

    const getAllTransactions = async () => {
        try {
            
            const user = getUserFromCookies();
            if (cookies.get('jwt') === undefined) {
                return [];
            }
            const jwtToken = cookies.get('jwt');
            axios.defaults.headers.common['Authorization'] = `Bearer ${cookies.get('jwt')}`;
            let request;
            if (accountId == "All") {
                request = `${BASE_URL}/transactions.php?user_id=${user.id}`;
            } else {
                request = `${BASE_URL}/transactions.php?account_id=${accountId}}`
            }
            const transactionsResponse = await axios.get(request);
            const transactionsData = transactionsResponse.data;

            if (transactionsData.length === 0) {
                setTransactions([])
            }

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
            setHistoryError(err.response?.data?.message || "Error getting all transactions");
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
            if (cookies.get('jwt') === undefined) {
                return [];
            }
            axios.defaults.headers.common['Authorization'] = `Bearer ${cookies.get('jwt')}`;
            const response = await axios.post(`${BASE_URL}/categories.php`, {
                ...category,
                user_id});
            Swal.fire({
                position: "center",
                icon: "success",
                title:(language === 'Portuguese' ? "Categoria adicionada" : "Category successfully added"),
                showConfirmButton: false,
                timer: 1500
              });
        } catch (err) {
            Swal.fire({
                position: "center",
                icon: "error",
                title: err.response?.data?.message || "Something bad has happened",
                showConfirmButton: true
            }); 
        }
    }

    const getIncomesCategories = async () => {
        try {
            const user = getUserFromCookies();
            if (cookies.get('jwt') === undefined) {
                return []
            }
            axios.defaults.headers.common['Authorization'] = `Bearer ${cookies.get('jwt')}`;
            const response = await axios.get(`${BASE_URL}/categories.php?is_income=1&user_id=${user.id}`);
            if (response && response.data) {
                setIncomeCategories(response.data);
            } else {
                console.error("Response data is undefined or null");
            }
        } catch (err) {
            setError(err.response?.data?.message || "Error getting incomes categories");
        }
    };

    const getExpensesCategories = async () => {
        try {
            const user = getUserFromCookies();
            if (cookies.get('jwt') === undefined) {
                return []
            }
            axios.defaults.headers.common['Authorization'] = `Bearer ${cookies.get('jwt')}`;
            const response = await axios.get(`${BASE_URL}/categories.php?is_income=0&user_id=${user.id}`);

            if (response && response.data) {
                setExpenseCategories(response.data);
            } else {
                console.error("Response data is undefined or null");
            }
        } catch (err) {
            setError(err.response?.data?.message || "Error getting expenses categories");
        }
    };

    const getAllCategories = async () => {
        try {
            const user = getUserFromCookies();
            if (cookies.get('jwt') === undefined) {
                return []
            }
            axios.defaults.headers.common['Authorization'] = `Bearer ${cookies.get('jwt')}`;
            const response = await axios.get(`${BASE_URL}/categories.php?user_id=${user.id}`);
            if (response && response.data) {
                setAllCategories(response.data);
            } else {
                console.error("Response data is undefined or null");
            }
        } catch (err) {
            setError(err.response?.data?.message || "Error getting all categories");
        }
    };

    const registerUser = async (credentials) => {
        try {
            const response = await axios.post(`${BASE_URL}/register.php`, credentials);
            Swal.fire({
                position: "center",
                icon: "success",
                title:(language === 'Portuguese' ? "Registado com sucesso" : "Successfully registered"),
                showConfirmButton: false,
                timer: 1500
              });
            setAction('Login');
        } catch (err) {
            let errorResponse = "";
            if (err.response?.data?.message) {
                const message = err.response.data.message;
                console.log(message);
                if (Array.isArray(message)) {
                    for (let i = 0; i < message.length; ++i) {
                        errorResponse += message[i] + "\n";
                    }
                } else {
                    errorResponse = message;
                }
            } else {
                errorResponse = "Something bad has happened";
            }
            Swal.fire({
                position: "center",
                icon: "error",
                title: errorResponse,
                showConfirmButton: true
            });         
        }
    }

    const LoginUser = async (credentials, navigate) => {
        try {
            const response = await axios.post(`${BASE_URL}/login.php`, credentials);
        
            axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.jwt}`;
            const token = jwtDecode(response.data.jwt);
            cookies.set('jwt', response.data.jwt, {
                expires: new Date(token.exp * 1000),
            });
            const selectedAccountId = "All";
            setAccountId(selectedAccountId);
            localStorage.setItem('accountId', selectedAccountId);
            Swal.fire({
                position: "center",
                icon: "success",
                title:(language === 'Portuguese' ? "Entrou com sucesso" : "Successfully logged in"),
                showConfirmButton: false,
                timer: 1500
              });
            
            if (localStorage.getItem('environmentLanguage') === null) {
                const language = navigator.language.startsWith('pt') ? "Portuguese" : "English";
                setLanguage(language);
                localStorage.setItem('environmentLanguage', language);
            }
            navigate('/');
            //window.location.reload(false);
        } catch (err) {
            Swal.fire({
                position: "center",
                icon: "error",
                title: err.response?.data?.message || "Something bad has happened",
                showConfirmButton: true
            }); 
        }
    }

    const getUserFromCookies = () => {
        try {
            const cookie = cookies.get('jwt');
            const userData = jwtDecode(cookie).data;
            return userData;
        } catch (err) {
            console.log(err.message || "Error getting user from cookies");
        }
    };

    const getAccounts = async () => {
        try{
            const user = getUserFromCookies();
            if (cookies.get('jwt') === undefined) {
                return [];
            }
            const jwtToken = cookies.get('jwt');
            axios.defaults.headers.common['Authorization'] = `Bearer ${cookies.get('jwt')}`;
            const userAccounts = await axios.get(`${BASE_URL}/accounts.php?user_id=${user.id}`);
            setAccounts(userAccounts.data)
        } catch{
            console.log("nao ha contas pa ninguem seus nabos")
        }
    }
    
    const addAccount = async (credentials) => {
        const {user_id, currency_code} = credentials
        try{
            if (cookies.get('jwt') === undefined) {
                return [];
            }
            axios.defaults.headers.common['Authorization'] = `Bearer ${cookies.get('jwt')}`;
            const currency = JSON.stringify({'code': currency_code});
            const response = await axios.post(`${BASE_URL}/accounts.php`, {
                ...credentials,
                user_id,
                currency,
            });
            getAccounts()
            refreshAccountContent()
            Swal.fire({
                position: "center",
                icon: "success",
                title:(language === 'Portuguese' ? "Conta criada com sucesso!" : "Account created successfully"),
                showConfirmButton: false,
                timer: 1500
            });
        } catch (err){
            Swal.fire({
                position: "center",
                icon: "error",
                title: err.response?.data?.message || (language === 'Portuguese' ? "Algo de errado aconteceu" : "Something bad happenned"),
                showConfirmButton: true
            }); 
        }
    }

    const logout = () => {
        Swal.fire({
            title:(language === 'Portuguese' ? "Deseja sair ?" : "Do you want to sign out ?"),
            showDenyButton: true,   
            confirmButtonText: (language === 'Portuguese' ? 'Sair': 'Sign out'),
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
            if (cookies.get('jwt') === undefined) {
                return [];
            }
            axios.defaults.headers.common['Authorization'] = `Bearer ${cookies.get('jwt')}`;
            const response = await axios.get(`${BASE_URL}/frequencies.php`);

            if (response && response.data) {
                setFrequencies(response.data);
            } else {
                console.error("Response data is undefined or null");
            }
        } catch (err) {
            setError(err.response?.data?.message || "Error getting frequences");
        }
    };

    const addRegularPayment = async (payment) => {
        return new Promise(async (resolve, reject) => {
            try {
                if (cookies.get('jwt') === undefined) {
                    return [];
                }
                axios.defaults.headers.common['Authorization'] = `Bearer ${cookies.get('jwt')}`;
                payment.start_date = formatDate(payment.start_date)
                const response = await axios.post(`${BASE_URL}/regular_payments.php`, payment );
                getRegularPayments(); 
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title:(language === 'Portuguese' ? "Pagamento regular adicionado" : "Regular payment added successfully"),
                    showConfirmButton: false,
                    timer: 1500
                    });
                resolve(response)
            } catch (err) {
                Swal.fire({
                    position: "center",
                    icon: "error",
                    title: err.response?.data?.message ||(language === 'Portuguese' ? "Algo de errado aconteceu" : "Something bad has happened"),
                    showConfirmButton: true
                }); 
                reject(err)
            }
        })
    }

    const getRegularPayments = async () => {
        try {

            if (cookies.get('jwt') === undefined) {
                return [];
            }
            axios.defaults.headers.common['Authorization'] = `Bearer ${cookies.get('jwt')}`;
            const user = getUserFromCookies();
            let request;
            if (accountId == "All") {
                request = `${BASE_URL}/regular_payments.php?user_id=${user.id}`;
            } else {
                request = `${BASE_URL}/regular_payments.php?account_id=${accountId}`;
            }

            const response = await axios.get(request);
            const paymentsData = response.data;

            if (paymentsData.length === 0) {
                setRegularPayments([])
            }
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
            setPaymentError(err.response?.data?.message || "Error getting regular payments");
        }
    };

    const slicePayments = () => {
        const history = [...regularPayments];
        history.sort((a, b) => {
            return new Date(b.createdAt) - new Date(a.createdAt);
        });
        
        const startIndex = currentPaymentIndex * 3;
        let slicedPayments = [];
        if (startIndex < history.length) {
            slicedPayments = history.slice(startIndex, startIndex + 3);
        }
        setPaymentsSliced(slicedPayments);
    };
    
    const navigatePayments = (direction) => {
        const step = 1; 
        let newIndex;
    
        if (direction === 'next') {
            const maxIndex = Math.max(Math.floor((regularPayments.length - 1) / 3), 0);
            newIndex = Math.min(currentPaymentIndex + step, maxIndex);
        } else {
            newIndex = Math.max(currentPaymentIndex - step, 0);
        }
    
        setCurrentPaymentIndex(newIndex);
        slicePayments();
    };

    const deleteRegularPayments = async (id) => {
        if (cookies.get('jwt') === undefined) {
                return [];
        }
        axios.defaults.headers.common['Authorization'] = `Bearer ${cookies.get('jwt')}`;
        const res = await axios.delete(`${BASE_URL}/regular_payments`, {
        data: { id }
        })
        getRegularPayments()
    }

    const getCurrencies = async () => {
        if (cookies.get('jwt') === undefined) {
                return [];
            }
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
            if (cookies.get('jwt') === undefined) {
                return [];
            }
            axios.defaults.headers.common['Authorization'] = `Bearer ${cookies.get('jwt')}`;
            const currencyJSON = JSON.stringify({'code': newCurrencyCode});
            await axios.put(`${BASE_URL}/user/change_currency`, currencyJSON);
            Swal.fire({
                position: "center",
                icon: "success",
                title: (language === 'Portuguese' ? "Moeda alterada com sucesso" : "Currency changed successfully"),
                showConfirmButton: false,
                timer: 1500
                }); 
            getCurrency()
        } catch (err) {
            Swal.fire({
                position: "center",
                icon: "error",
                title: (language === 'Portuguese' ? "Tem de escolher uma moeda" : "You must select a currency"),
                showConfirmButton: true
            }); 
        }
    }
    
    const getCurrency = async () => {
        try{
            if (cookies.get('jwt') === undefined) {
                return [];
            }
            axios.defaults.headers.common['Authorization'] = `Bearer ${cookies.get('jwt')}`;
            const response = await axios.get(`${BASE_URL}/user/default_currency`);
            const currency = response.data.currency; 
            setCurrency(currency);
            getBalance();
        } catch{
            console.log("cheiras a coco")
        }
    }
    
    const getAccountCurrency = async () => {
        try{
            if (cookies.get('jwt') === undefined) {
                return [];
            }
            axios.defaults.headers.common['Authorization'] = `Bearer ${cookies.get('jwt')}`;
            let request;
            if (accountId == "All") {
                request = `${BASE_URL}/user/default_currency`;
            } else {
                request = `${BASE_URL}/account/${accountId}/currency`;
            }
            const response = await axios.get(request);
            const currency = response.data.currency; 
            setAccountCurrency(currency);
        } catch{
            console.log("cheiras a coco 3")
        }
    }

    const getBalance = async () => {
        try{
            const user = getUserFromCookies();
            if (cookies.get('jwt') === undefined) {
                return [];
            }
            axios.defaults.headers.common['Authorization'] = `Bearer ${cookies.get('jwt')}`;
            const response = await axios.get(`${BASE_URL}/user/balance`);
            const responseUser = response.data;
            const balance = responseUser.balance;
            if (balance == null){
                setBalance("0");
                return;
            }
            setBalance(balance);
        } catch{
            console.log("cheiras mal")
        }
    }

    const getAccountBalance = async () => {
        try{
            const user = getUserFromCookies();
            if (cookies.get('jwt') === undefined) {
                return [];
            }
            axios.defaults.headers.common['Authorization'] = `Bearer ${cookies.get('jwt')}`;
            let request;
            if (accountId == "All") {
                request = `${BASE_URL}/user/balance`;   
            } else {
                request = `${BASE_URL}/account/${accountId}/balance`;
            }
            const response = await axios.get(request);
            const responseUser = response.data;
            const balance = responseUser.balance;
            if (balance == null){
                setBalance("0");
                return;
            }
            setAccountBalance(balance);
        } catch{
            console.log("cheiras mal 2")
        }
    }

    const getProfilePicture = async () => {
        try{
            if (cookies.get('jwt') === undefined) {
                return [];
            }
            axios.defaults.headers.common['Authorization'] = `Bearer ${cookies.get('jwt')}`;
            const response = await axios.get(`${BASE_URL}/user/profile_picture`, {
                responseType: 'blob'
            });

            const imageUrl = URL.createObjectURL(response.data);
            const imgElement = document.createElement('img');
            imgElement.src = imageUrl;
            setProfilePicture(imageUrl);
        } catch{
            console.log("cheiras a coco 4")
        }
    }

    const uploadProfilePicture = async (file) => {
        try {
            if (cookies.get('jwt') === undefined) {
                return [];
            }
            axios.defaults.headers.common['Authorization'] = `Bearer ${cookies.get('jwt')}`;
            const formData = new FormData()
            formData.append("image", file)
            const response = await axios.post(`${BASE_URL}/user/profile_picture`, formData);
            getProfilePicture();
            Swal.fire({
                position: "center",
                icon: "success",
                title: (language === 'Portuguese' ? 'Foto de perfil atualizada' : "Profile picture successfully changed"),
                showConfirmButton: false,
                timer: 1500
              });
        } catch (err) {
            console.log(err.response?.data?.message || "cheiras a coco 5");
            Swal.fire({
                position: "center",
                icon: "error",
                title: err.response?.data?.message || (language === 'Portuguese' ?'Algo de errado aconteceu'  : "Something bad happened"),
                showConfirmButton: true
            }); 
        }
    }

    const changeUserInformation = async (newUserInformation) => {
        try {
            if (cookies.get('jwt') === undefined) {
                return [];
            }
            axios.defaults.headers.common['Authorization'] = `Bearer ${cookies.get('jwt')}`;
            const response = await axios.put(`${BASE_URL}/user/data`, newUserInformation);
            getUserInformation();
            Swal.fire({
                position: "center",
                icon: "success",
                title: (language === 'Portuguese' ? 'Os teus dados foram atualizados' : "Your information has been changed"),
                showConfirmButton: false,
                timer: 1500
                }); 
        } catch (err) {
            Swal.fire({
                position: "center",
                icon: "error",
                title: err.response?.data?.message || (language === 'Portuguese' ?  'Algo de errado aconteceu':  "Something bad happened"),
                showConfirmButton: true
            }); 
        }
    }

    const getUserInformation = async () => {
        try {
            if (cookies.get('jwt') === undefined) {
                return [];
            }
            axios.defaults.headers.common['Authorization'] = `Bearer ${cookies.get('jwt')}`;
            const response = await axios.get(`${BASE_URL}/user/data`);
            const username = response.data.username;
            setUsername(username);
            const email = response.data.email;
            setEmail(email);
        } catch (err) {
           console.log(err.response?.data?.message || "Something bad happened")
        }
    }

    const changeItemInformation = async (newItemInformation) => {
        try {
            newItemInformation.payment_date = formatDate(newItemInformation.payment_date);
            if (cookies.get('jwt') === undefined) {
                return [];
            }
            axios.defaults.headers.common['Authorization'] = `Bearer ${cookies.get('jwt')}`;
            const response = await axios.put(`${BASE_URL}/transactions.php`, newItemInformation);
            refreshAccountContent();
            Swal.fire({
                position: "center",
                icon: "success",
                title: (language === 'Portuguese' ? 'Dados da transação atualizada' : "Transaction information changed" ),
                showConfirmButton: false,
                timer: 1500
                }); 
        } catch (err) {
            Swal.fire({
                position: "center",
                icon: "error",
                title: err.response?.data?.message || (language === 'Portuguese' ? 'Algo de errado aconteceu': "Something bad happened" ),
                showConfirmButton: true
            }); 
        }
    }

    const changeRPItemInformation = async (newItemInformation) => {
        try {
            newItemInformation.next_payment_date = formatDate(newItemInformation.next_payment_date);
            if (cookies.get('jwt') === undefined) {
                return [];
            }
            axios.defaults.headers.common['Authorization'] = `Bearer ${cookies.get('jwt')}`;
            const response = await axios.put(`${BASE_URL}/regular_payments.php`, newItemInformation);
            refreshAccountContent();
            Swal.fire({
                position: "center",
                icon: "success",
                title: (language === 'Portuguese' ? 'Dados do pagamento regular atualizado' : "Regular payments information changed" ),
                showConfirmButton: false,
                timer: 1500
                }); 
        } catch (err) {
            Swal.fire({
                position: "center",
                icon: "error",
                title: err.response?.data?.message || (language === 'Portuguese' ? 'Algo de errado aconteceu': "Something bad happened" ),
                showConfirmButton: true
            }); 
        }
    }

    const getBarChartData = async (startDate, endDate) => {
        try{
            if (cookies.get('jwt') === undefined) {
                return [];
            }
            axios.defaults.headers.common['Authorization'] = `Bearer ${cookies.get('jwt')}`;
            startDate = formatDateForGET(startDate)
            endDate = formatDateForGET(endDate)
            let request;
            if (accountId == "All") {
                request = `${BASE_URL}/user/chart_data?start=${startDate}&end=${endDate}`;   
            } else {
                request = `${BASE_URL}/account/${accountId}/chart_data?start=${startDate}&end=${endDate}`;   
            }
            const response = await axios.get(request);
            const data = response.data;
            return data;
        } catch{
            console.log("cheiras mal 2")
        }
    }

    const refreshAccountContent = async () => {
        getIncomes();
        getExpenses();
        getAllTransactions();
        getRegularPayments();
        accountIncome();
        accountExpense();
        getAccountCurrency();
        getAccountBalance();
        getBalance();
    }

    return(
        <GlobalContext.Provider value={{
            accountIncome,
            accountExpense,
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
            uploadProfilePicture,
            getAllTransactions,
            registerUser,
            LoginUser,
            logout,
            addCategory,
            setError,
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
            setAccountId,
            setAccountName,
            refreshAccountContent,
            getAccountCurrency,
            setProfilePicture,
            getProfilePicture,
            setLanguage,
            changeUserInformation,
            setPaymentError,
            setExpenseError,
            getUserInformation,
            changeItemInformation,
            setAction,
            changeRPItemInformation,
            getAllCategories,
            setAllCategories,
            getBarChartData,
            allCategories,
            action,
            userUsername,
            userEmail,
            expenseError,
            language, 
            accountBalance,
            accountCurrency,
            accountName,
            accountIncomeAmount,
            accountExpenseAmount,
            accountId,
            currentPaymentIndex,
            paymentsSliced,
            currentExpenseIndex,
            expensesSliced,
            paymentError,
            currentIncomeIndex,
            incomesSliced,
            totalExpensesAmount,
            balance,
            accounts,
            currency,
            currencies,
            regularPayments,
            frequencies,
            error,
            historyError,
            transactions,
            incomes,
            expenses,
            Incomescategories,
            Expensescategories,
            incomesSliced,
            profilePicture, 
        }}>
            {children}
        </GlobalContext.Provider>
    )
}

export const useGlobalContext = () => {
    return useContext(GlobalContext)
}