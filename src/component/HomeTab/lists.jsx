import React from 'react';
import AppContext from './appContext';
import IncomeOrExpenceList from './inOrExList';


//generates income and expence list
const Lists = () => {
    return (<AppContext.Consumer>
                {consumer  =>   <div className = "listsAndPie">
                                    <div className = "incomeList">
                                        {console.log(consumer.incomeColor)}
                                        <IncomeOrExpenceList 
                                            category = {consumer.incomeCategories} 
                                            setValue = {consumer.set_In_Ex_Value} 
                                            totalInOrEx = {consumer.totalIncome}
                                            gradientDirection = {"left"}
                                            gradientColor = {consumer.incomeColor}
                                            listType = {"incomes"}
                                        />
                                    </div>
                                    <div className = "expenceList">
                                        <IncomeOrExpenceList 
                                            category = {consumer.expenceCategories} 
                                            setValue = {consumer.set_In_Ex_Value} 
                                            totalInOrEx = {consumer.totalExpence}
                                            gradientDirection = {"right"}
                                            gradientColor = {consumer.expenceColor}
                                            listType = {"expences"}
                                        />
                                    </div>
                                </div>
                }
             </AppContext.Consumer>
     );
}
 
export default Lists;