import {dashboard, expenses, transactions, trend,limit, create,remind,pay} from '../utils/Icons'

export const menuItems = [
    {
        id: 1,
        title: 'Dashboard',
        icon: dashboard,
        link: '/dashboard'
    },
    {
        id: 2,
        title: "View Transactions",
        icon: transactions,
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
        title:"Add Limit",
        icon:limit,
        link:"/dashboard",

    },
    {
        id: 6,
        title:"Create Budget",
        icon:create,
        link:"/dashboard",

    },
    {
        id: 7,
        title:"Payment Reminder",
        icon:remind,
        link:"/dashboard",

    },
    {
        id:8,
        title:"Payment",
        icon:pay,
        link:"/dashboard",
    }
    
]