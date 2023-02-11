import React from 'react';
import { Link } from 'react-router-dom';
import '../budgetApp.css'

//generates income and expence buttons to open dialog box
const Buttons = () => {
    return (<div className = "buttons">
                <Link to="/budget/newIncome" className = "incomeLink"><button className = "incomeButton">Add Income</button></Link>
                <Link to="/budget/newExpence" className = "expenceLink"><button className = "expenceButton">Add Expence</button></Link>
            </div>                
     );
}
 
export default Buttons;