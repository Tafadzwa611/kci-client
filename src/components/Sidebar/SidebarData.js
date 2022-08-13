import React from 'react';

export const SidebarData = [
    {
        title: 'Clients',
        icon:<i className="uil uil-user"></i>,
        iconClosed:<i className="uil uil-angle-down arrow"></i>,
        iconOpened:<i className="uil uil-angle-up arrow"></i>,
        subNav: [
            {
                title: 'View Clients',
                path: '/app/clients/viewclients',                
            },
        ]
    },
    {
        title: 'Loans',       
        icon:<i className="uil uil-sort"></i>,
        iconClosed:<i className="uil uil-angle-down arrow"></i>,
        iconOpened:<i className="uil uil-angle-up arrow"></i>,
        subNav: [
            {
                title: 'View Loans',
                path: '/app/loans/viewloans',                
            },
            {
                title: 'Create Loan',
                path: '/app/loans/addloan',                
            },
            {
                title: 'Due Loans',
                path: '/app/loans/viewdueloans',                
            },
            {
                title: 'Defaults and Arrears',
                path: '/app/loans/viewdefaultsandarrears',                
            },
            {
                title: 'Refunds',
                path: '/app/loans/viewrefunds',                
            },
            {
                title: 'Loan Calculator',
                path: '/app/loans/#',                
            },
            {
                title: 'Guarantors',
                path: '/app/loans/viewguarantors',                
            },
        ]
    },
    {
        title: 'Payments',
        icon:<i className="uil uil-scroll-h"></i>,
        iconClosed:<i className="uil uil-angle-down arrow"></i>,
        iconOpened:<i className="uil uil-angle-up arrow"></i>,
        subNav: [
            {
                title: 'View Payments',
                path: '/app/payments/viewpayments',                
            },
            {
                title: 'Add Payments',
                path: '/app/payments/addpayments',                
            },
            {
                title: 'Upload File',
                path: '/app/payments/uploadpaymentsfile',                
            },
            {
                title: 'Payments Chart',
                path: '/app/payments/paymentschart',                
            },
        ]
    },
    {
        title: 'Other Income',
        icon:<i className="uil uil-folder-plus"></i>,
        iconClosed:<i className="uil uil-angle-down arrow"></i>,
        iconOpened:<i className="uil uil-angle-up arrow"></i>,
        subNav: [
            {
                title: 'View Other Income',
                path: '/app/otherincome/viewotherincome',                
            },
        ]
    },
    {
        title: 'Expenses',
        icon:<i className="uil uil-folder-minus"></i>,
        iconClosed:<i className="uil uil-angle-down arrow"></i>,
        iconOpened:<i className="uil uil-angle-up arrow"></i>,
        subNav: [
            {
                title: 'View Expenses',
                path: '/app/expenses/viewexpenses',                
            },
        ]
    },
    {
        title: 'Asset Management',
        icon:<i className="uil uil-bag"></i>,
        iconClosed:<i className="uil uil-angle-down arrow"></i>,
        iconOpened:<i className="uil uil-angle-up arrow"></i>,
        subNav: [
            {
                title: 'View Assets',
                path: '/app/assets/viewassets',                
            },
            {
                title: 'Add Asset',
                path: '/app/assets/addasset',                
            },
            {
                title: 'View Asset Types',
                path: '/app/assets/assettypes',                
            },
        ]
    },
    {
        title: 'Reports',       
        icon:<i className="uil uil-books"></i>,
        iconClosed:<i className="uil uil-angle-down arrow"></i>,
        iconOpened:<i className="uil uil-angle-up arrow"></i>,
        subNav: [
            {
                title: 'Clients Report',
                path: '/app/reports/clientsreport',                
            },
            {
                title: 'Loans Report',
                path: '/app/reports/loansreport',                
            },
            {
                title: 'Monthly Report',
                path: '/app/reports/monthlyreport',                
            },
            {
                title: 'Top Borrowers',
                path: '/app/reports/topborrowers',                
            },
            {
                title: 'Disbursement Report',
                path: '/app/reports/disbursementreport',                
            },
            {
                title: 'Loan Product Report',
                path: '/app/reports/loanproductreport',                
            },
            {
                title: 'Fees Report',
                path: '/app/reports/feesreport',                
            },
            {
                title: 'Loan Officer Report',
                path: '/app/reports/loanofficerreport',                
            },
            {
                title: 'Daily Report',
                path: '/app/reports/dailyreport',                
            },
            {
                title: 'Aging Report',
                path: '/app/reports/agingreport',                
            },
            {
                title: 'Portfolio At Risk',
                path: '/app/reports/portfolioatriskreport',                
            },
        ]
    },
    {
        title: 'Accounting',       
        icon:<i className="uil uil-receipt"></i>,
        iconClosed:<i className="uil uil-angle-down arrow"></i>,
        iconOpened:<i className="uil uil-angle-up arrow"></i>,
        subNav: [
            {
                title: 'View Accounting',
                path: '/app/accounting/viewaccounting',                
            },
            // {
            //     title: 'Cashflow',
            //     path: '/app/accounting/cashflow',                
            // },
            // {
            //     title: 'Profit and Loss',
            //     path: '/app/accounting/profitandloss',                
            // },
            // {
            //     title: 'Trial Balance',
            //     path: '/app/accounting/trialbalance',                
            // },
            // {
            //     title: 'Balance Sheet',
            //     path: '/app/accounting/balancesheet',                
            // },
            // {
            //     title: 'Cashflow Projections',
            //     path: '/app/accounting/cashflowprojections',                
            // },
            // {
            //     title: 'Charts of Accounts',
            //     path: '/app/accounting/chartsofaccounts',                
            // },
            // {
            //     title: 'Add Main Account',
            //     path: '/app/accounting/addmainaccount',                
            // },
            // {
            //     title: 'Journals',
            //     path: '/app/accounting/journals',                
            // },
            // {
            //     title: 'Add Journal',
            //     path: '/app/accounting/addjournal',                
            // },
        ]
    },
]