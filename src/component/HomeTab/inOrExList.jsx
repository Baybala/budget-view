import React from 'react';
import _ from 'lodash';

const IncomeOrExpenceList = ({category, setValue, totalInOrEx, gradientDirection, gradientColor, listType}) => {
        let total = 0;
        // order categories in descending order depending on the amount
        const data = _.orderBy(category.map(cat => {
            const value = setValue(cat.id, totalInOrEx, listType).value;
            total+=value;
                    return {id: cat.id, 
                            category: cat.category, 
                            value, 
                            transparancy: setValue(cat.id, totalInOrEx, listType).transparancy} 
                }), ["value"], ["desc"])

        // change the collor of the list items according to the gradient direction and opacity 
        const styling = function(cat){
                return {"background": `linear-gradient(to ${gradientDirection}, ${gradientColor}, ${cat.transparancy === 0 ? 0 : cat.transparancy <= 0.7 ? cat.transparancy +0.3 : 1}),
                                                          ${gradientColor}, ${cat.transparancy === 0 ? 0 : cat.transparancy}),
                                                          ${gradientColor}, ${cat.transparancy >= 0.7 ? cat.transparancy+0.1 : 0}))`
                        }
        }
    
        return ( 
                data.map(cat => {
                        return <div className = {listType === "incomes" ? "incomeListsRow" :  "expenceListsRow"}
                                        key = {cat.category}
                                        style = {styling(cat)}>
                                        {listType === "incomes" && <div style ={{"display":"inline-block", "width":"70%", "textAlign":"left" }}>{cat.category}</div>} 
                                        {listType === "incomes" && <div className = "incomeValue">{cat.value}<div>{Math.round(cat.value*100/total)}%</div></div>}
                                        {listType === "expences" && <div className = "expenceValue"><div>{Math.round(cat.value*100/total)}%</div>{cat.value}</div>}
                                        {listType === "expences" && <div style ={{"display":"inline-block", "width":"70%", "textAlign":"right" }}>{cat.category}</div>} 
                                        
                                </div>
                })
                
            );
            
}


 
export default IncomeOrExpenceList;