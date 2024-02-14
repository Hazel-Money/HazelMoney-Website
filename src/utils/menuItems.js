import { categories, dashboard, expenses, list, settings, trend, calender } from '../utils/Icons';

export const menuItems = [
    {
        id: 1,
        title: "Dashboard",
        title_pt: "Painel",
        icon: list,
        link: '/dashboard'
    },
    {
        id: 2,
        title: "Chart",
        title_pt: "Gráfico",
        icon: dashboard,
        link: "/dashboard",
    },
    {
        id: 3,
        title: "Incomes",
        title_pt: "Receitas",
        icon: trend,
        link: "/dashboard",
    },
    {
        id: 4,
        title: "Expenses",
        title_pt: "Despesas",
        icon: expenses,
        link: "/dashboard",
    },
    {
        id: 5,
        title: "Categories",
        title_pt: "Categorias",
        icon: categories,
        link: "/dashboard",
    },
    {
        id: 6,
        title: "Regular Payments",
        title_pt: "Pagamentos Regulares",
        icon: calender,
        link: "/dashboard",
    },
    {
        id: 7,
        title: "Settings",
        title_pt: "Configurações",
        icon: settings,
        link: "/dashboard",
    },
];
