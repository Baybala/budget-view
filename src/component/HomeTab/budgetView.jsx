import React, { Component} from 'react';
import { getExpenceCategories, getIncomeCategories } from '../../server/categories';
import { getExpences, getIncomes } from "../../server/transactions";
import IncomeModal from '../Modal/incomeModal';
import AppContext from './appContext';
import ExpenceModal from '../Modal/expenceModal';
import { Pie } from 'react-chartjs-2'
import Buttons from './buttons';
import { Redirect, Route, Switch } from 'react-router'
import Lists from './lists';


class BudgetView extends Component {
    state = { 
      incomes: [],
      expences: [],
      incomeCategories: [],
      expenceCategories: [],
      incomeColor : 'rgba(46, 240, 46', //the color bracket left unclosed because of to add opacity dynamically
      expenceColor : 'rgba(236, 51, 51', //the color bracket left unclosed because of to add opacity dynamically
      balanceColor : 'rgb(54, 162, 235)'
     }

     

    componentDidMount() {
       const incomes = getIncomes();
       const expences = getExpences();
       const incomeCategories = getIncomeCategories();
       const expenceCategories = getExpenceCategories();

       this.setState({incomes, expences, incomeCategories, expenceCategories})
    }

     // getting summ of the incomes or expences
    updataData = (data, amountType) => {
       return data.map(m => m[amountType]).reduce((acc, val) => acc+val);
    }

     // sets total os sums of the categories 
    set_In_Ex_Value = (id, totalIncome, in_exp_type) => {
      const cat = {incomes : ["incomeCategory", "incomeAmount"], expences : ["expenceCategory", "expenceAmount"]} // identify income or expence category and amount
      const data = this.state[in_exp_type].filter(i => i[cat[in_exp_type][0]].id === id); // get required category
      const value = data.length > 0 ? data.map(m => m[cat[in_exp_type][1]]).reduce((m, s) => m+s) : 0; // sums amount of category got above
      const transparancy = value/totalIncome;   //we can set gradient opacity by deviding total amount of the category to total amount of incomes
      return {value, transparancy}  //returns total amount per category
    }
     
    // gets data for the pie chart
    getPieData = (income, expence, incomeColor, expenceColor, balanceColor) => {
      return {
       datasets: [
         {
         data: [expence, income],
         backgroundColor: [
          expenceColor,
          incomeColor          
         ],
         type: 'doughnut',
         hoverOffset: 1
       }]
      }       
  }                      

  render() {
    const {incomes, expences, incomeCategories, expenceCategories, modalOpen, incomeColor, expenceColor, balanceColor} = this.state;
    const totalIncome = incomes.length > 0 ? this.updataData(incomes, "incomeAmount") : 0;
    const totalExpence = expences.length > 0 ? this.updataData(expences, "expenceAmount") : 0;
    
    

  return (
          <React.Fragment>
            <AppContext.Provider value = {{incomes,
                                          expences, 
                                          incomeCategories,
                                          expenceCategories,
                                          modalOpen,
                                          totalIncome, 
                                          totalExpence,
                                          set_In_Ex_Value: this.set_In_Ex_Value,
                                          onClick: this.handleClick,
                                          closeModal: this.closeModal,
                                          incomeColor,
                                          expenceColor
                                        }}>
              <div className = "budget-main">
                <div className = "main-shell">
                    <div className="balance">
                        <h1>Balance</h1>
                        <h2>{totalIncome - totalExpence}</h2>
                    </div>
                    <div className = "totals">
                        <div className = "totalIncomes">
                            <h3>Total Incomes</h3>
                            <h5>{totalIncome}</h5>
                        </div>
                        <div className = "pieChart">
                            <Pie
                                    data = {this.getPieData(totalIncome, totalExpence, incomeColor, expenceColor, balanceColor)}
                                    height = {140} 
                                    width = {140} 
                                    options = {{maintainAspectRatio: false}}
                            />
                        </div>
                        <div className = "totalExpences">
                            <h3>Total Expence</h3>
                            <h5>{totalExpence}</h5>
                        </div>
                    </div>
                    <Buttons />
                    <Lists />
                </div>
                <Switch >
                  <Route path = "/budget/newIncome" exact component = {IncomeModal}/>
                  <Route path = "/budget/newExpence" exact component = {ExpenceModal}/>
                  <Redirect to = "/budget"/>
                </Switch>
              </div>
           </AppContext.Provider>
           
          </React.Fragment>
          
           );
  }
}

 
export default BudgetView;