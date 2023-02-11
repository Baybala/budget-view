import React from 'react';
import Form from "../../common/form"

class ChartCategories extends Form {

// the function render income and expence categories for selecting
renderChartCategories (incomeCategories, expenceCategories) {
    return ( <div className = "categories">
                    <div className = "incomes">{this.renderSelect("Income Categories", "category", incomeCategories)}</div>
                    <div className = "expences">{this.renderSelect("Expence Categories", "category", expenceCategories)}</div>
                </div> )
    }    
}
 
export default ChartCategories;

