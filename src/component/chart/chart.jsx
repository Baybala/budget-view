import React from 'react';
import { getExpences, getIncomes } from '../../server/transactions';
import { getExpenceCategories, getIncomeCategories } from '../../server/categories';
import './chart.css'
import Period from './Period';
import moment from "moment";
import ChartCategories from './ChartCategories';
import ChartView from './ChartView';
import _ from 'lodash';


export default class Chart extends ChartCategories {

  state = {
    data: {category: ""},
    errors: {},
    incomes: [],
    expences: [],
    incomeCategories: [],
    expenceCategories: [],
    periods: ["1W", "1M", "1Y"],
    selectedPeriod: "1Y"
  }

  // get data from the database
  componentDidMount() {
    const incomes = getIncomes();
    const expences = getExpences();
    const incomeCategories = getIncomeCategories();
    const expenceCategories = getExpenceCategories();
    this.setState({expences, incomes, incomeCategories, expenceCategories})
  }

  // Change between the week, mongth and year
  handleCkick = (period) => {
    const selectedPeriod = period;
    this.setState({selectedPeriod})
  }

  // filtering and getting data through below steps
  // depending on income or expence filter data by id and also given interval  
  // sorting sort and return filtered data
  getData = (incomeOrExpence) => {
    const interval = {"1W": 7, "1M" : 30, "1Y": 360} // set intervals
    const category = {"incomes" : "incomeCategory", "expences" : "expenceCategory"} // for the purpose of getting right category
    const {data, selectedPeriod} = this.state;
    const today = moment(new Date()).format("YYYY.MM.DD"); // get current date and format

    //filter data by id and to intervals
    const filteredData =  this.state[incomeOrExpence].filter(trs => trs[category[incomeOrExpence]].id === data.category 
      && moment(trs.date).isBetween(moment(today).subtract(interval[selectedPeriod], "day"), moment(today).add(1, "day")));

    //sort to asc order [{date: "0", incomeAmount: "0", expenceAmount: "0"}, ...
    return _.orderBy(filteredData, ["date"], ["asc"]);

  }

  render() {
    const {incomeCategories, expenceCategories, data, periods, selectedPeriod} = this.state;
    const incomeOrExpence = incomeCategories.filter(cat => cat.id === data.category).length !== 0 ? "incomes" : "expences" //to find out what category selected oncome or expence
   
    return (
      <div className="chartMain">
        {this.renderChartCategories(incomeCategories, expenceCategories)}
        <Period onClick = {this.handleCkick} periods = {periods} selectedPeriod = {selectedPeriod}/>
        <ChartView 
          inExVerification = {incomeOrExpence}
          category = {data.category}
          data = {this.getData(incomeOrExpence)}
        />
      </div>
    );
  }
}