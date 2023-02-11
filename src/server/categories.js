export const incomeCategory = [
    { id: "5581238IN1", category: "Salary" },
    { id: "5581238IN2", category: "Bonuces" },
    { id: "5581238IN3", category: "Transportation"},
    { id: "5581238IN4", category: "Rent" },
    { id: "5581238IN5", category: "Other"}
];

export const expenceCategory =[
    { id: "5581238EX1", category: "For Home"},
    { id: "5581238EX2", category: "Electronica"},
    { id: "5581238EX3", category: "Personal stuff"},
    { id: "5581238EX4", category: "Holiday spendings"},
    { id: "5581238EX5", category: "Food and Beverage"},
    { id: "5581238EX6", category: "Market"},
    { id: "5581238EX7", category: "Sport"},
    { id: "5581238EX8", category: "Medicine"},
    { id: "5581238EX9", category: "Transport"},
    { id: "5581238EX10", category: "Buity"}
];

export function getIncomeCategories () {
    return incomeCategory.filter(iC => iC);
};

export function getExpenceCategories () {
    return expenceCategory.filter(iC => iC);
}