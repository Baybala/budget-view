import { getExpenceCategories, getIncomeCategories } from "./categories";
import moment from 'moment'

const transactions = {
    income: [
        {
            id: "202101030I1",
            incomeAmount: 2500,
            incomeCategory: { id: "5581238IN1", category: "Salary" },
            date: "2021.01.30"
        },
        {
            id: "202102010I2",
            incomeAmount: 100,
            incomeCategory: { id: "5581238IN3", category: "Transportation"},
            date: "2021.02.10"
        },
        {
            id: "202102030I3",
            incomeAmount: 2500,
            incomeCategory: { id: "5581238IN1", category: "Salary"},
            date: "2021.02.30"
        },
        {
            id: "202103015I4",
            incomeAmount: 1800,
            incomeCategory: { id: "5581238IN2", category: "Bonuces" },
            date: "2021.03.15"
        },
        {
            id: "202104030I5",
            incomeAmount: 3000,
            incomeCategory: { id: "5581238IN1", category: "Salary"},
            date: "2021.04.30"
        },
        {
            id: "202103015I6",
            incomeAmount: 1400,
            incomeCategory: { id: "5581238IN2", category: "Bonuces" },
            date: "2021.03.15"
        },
    ], 

    expence: [
        { 
            id: "202105002E1",
            expenceAmount: 70,
            expenceCategory: { id: "5581238EX3", category: "Personal stuff"},
            expenceName: "Trousers",
            forWhom: "Babash",
            date: "2021.05.02"

        },
        {
            id: "202106008E2",
            expenceAmount: 40,
            expenceCategory: { id: "5581238EX9", category: "Transport"},
            expenceName: "Petrol",
            forWhom: "Car",
            date: "2021.06.08"
        },
        {
            id: "202108010E3",
            expenceAmount: 15,
            expenceCategory: { id: "5581238EX3", category: "Personal stuff"},
            expenceName: "Socks",
            forWhom: "",
            date: "2021.08.10"
        },
        { 
            id: "202109010E4",
            expenceAmount: 100,
            expenceCategory: { id: "5581238EX4", category: "Holiday spendings"},
            expenceName: "Tour",
            forWhom: "Family",
            date: "2021.09.10"
        },
        {
            id: "202108020E5",
            expenceAmount: 60,
            expenceCategory: { id: "5581238EX7", category: "Sport"},
            expenceName: "Swimming pool",
            forWhom: "Me and Alina",
            date: "2021.08.20"
        },
        { 
            id: "202110023E6",
            expenceAmount: 20,
            expenceCategory: { id: "5581238EX6", category: "Market"},
            expenceName: "Sweets",
            forWhom: "Home",
            date: "2021.10.23"
        },
        {
            id: "202110024E7",
            expenceAmount: 15,
            expenceCategory: { id: "5581238EX5", category: "Food and Beverage"},
            expenceName: "Butter",
            forWhom: "Home",
            date: "2021.10.24"
        },
        {
            id: "202110030E8",
            expenceAmount: 3,
            expenceCategory: { id: "5581238EX5", category: "Food and Beverage"},
            expenceName: "Beer",
            forWhom: "Me",
            date: "2021.10.30"
        },
        {
            id: "202111001E9",
            expenceAmount: 3,
            expenceCategory: { id: "5581238EX5", category: "Food and Beverage"},
            expenceName: "Beer",
            forWhom: "Me",
            date: "2021.11.01"
        },
        {
            id: "202111005E10",
            expenceAmount: 7.5,
            expenceCategory: { id: "5581238EX6", category: "Market"},
            expenceName: "ICEcream",
            forWhom: "Home",
            date: "2021.11.05"
        },
        {
            id: "202111010E11",
            expenceAmount: 300,
            expenceCategory: { id: "5581238EX3", category: "Personal stuff"},
            expenceName: "Jacket",
            forWhom: "Babash",
            date: "2021.11.10"
        }
    ]
};

export function getIncomes () {
    return transactions.income;
}

export function getExpences () {
    return transactions.expence;
}

function getDate() {
    let today = new Date();
    return moment(today).format("YYYY.MM.DD")
}

function generateID (incOrExp) {
    let today = new Date();
    const index = transactions[incOrExp].length-1;
    const lastIncofExpId = transactions[incOrExp][index].id;
    const lastDigitOfID = parseInt(lastIncofExpId.substr(10));

    const id = `${moment(today).format('YYYYMM[0]DD')}E${lastDigitOfID+1}`;

    return id;
}


export function saveIncome (income) {
    let newID = generateID("income");
        
    const incomeCategory = getIncomeCategories().filter(c => c.id === income.incomeCategoryId)[0];
    const incomeAmount = parseInt(income.incomeAmount);
    const date = getDate();

    if(income.id !== "new") { 
        const existingIncome = transactions.income.filter(inc => inc.id === income.id)[0]
        const index = transactions.income.indexOf(existingIncome);
        transactions.income[index].incomeAmount = incomeAmount;
        transactions.income[index].incomeCategory = incomeCategory;
        transactions.income[index].date = date;
        return
    }

    
    transactions.income.push({id: newID, incomeAmount, incomeCategory, date});

}

export function saveExpence (expence) {
    let newID = generateID("expence");
    const expenceAmount = parseInt(expence.expenceAmount);
    const expenceCategory = getExpenceCategories().filter(c => c.id === expence.expenceCatrgoryId)[0];
    const expenceName = expence.expenceName;
    const forWhom = expence.forWhom;
    const date = getDate();

    if(expence.id !== "new") { 
        const existingExpence = transactions.expence.filter(exp => exp.id === expence.id)[0]
        const index = transactions.expence.indexOf(existingExpence);
        transactions.expence[index].expenceAmount = expenceAmount;
        transactions.expence[index].expenceCategory = expenceCategory;
        transactions.expence[index].expenceName = expenceName;
        transactions.expence[index].forWhom = forWhom;
        transactions.expence[index].date = date;
        return
    }

    transactions.expence.push({id: newID , expenceAmount, expenceCategory, expenceName, forWhom, date});
}

export function deleteExpence (expence) {
    const index = transactions.expence.indexOf(expence);
    if(index >= 0) transactions.expence.splice(index, 1)
}

export function deleteIncomes (income) {
    const index = transactions.income.indexOf(income);
    if(index >= 0) transactions.income.splice(index, 1)
}

export function getIncome(id) {
    const transaction = transactions.income.filter(inc => inc.id === id);
    if(transaction.length > 0) return transaction;
    return null;
}

export function getExpence(id) {
    const transaction = transactions.expence.filter(exp => exp.id === id);
    if(transaction.length > 0) return transaction;
    return null;
}
