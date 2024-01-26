import {categories, dashboard, expenses, list, transactions, trend, calender} from '../utils/Icons'

export const menuItems = [
    {
        id: 1,
        title: 'Dashboard',
        icon: list,
        link: '/dashboard'
    },
    {
        id: 2,
        title: "Chart",
        icon: dashboard,
        link: "/dashboard",
    },
    {
        id: 3,
        title: "Incomes",
        icon: trend,
        link: "/dashboard",
    },
    {
        id: 4,
        title: "Expenses",
        icon: expenses,
        link: "/dashboard",
    },
    {
        id: 5,
        title: "Categories",
        icon: categories,
        link: "/dashboard",
    },
    {
        id: 6,
        title: "Regular Payments",
        icon: calender,
        link: "/dashboard",
    },
]