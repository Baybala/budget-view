import React from 'react';
import Form from '../../common/form'
import Table from "../../common/table"
import Pagination from '../../common/pagination'
import { getIncomeCategories } from '../../server/categories';
import { DateRangePicker } from 'rsuite';
import { deleteIncomes, getIncomes } from '../../server/transactions';
import _ from 'lodash';
import "../../common/common.css"
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faEdit, faTrashAlt} from "@fortawesome/free-solid-svg-icons"
import { Link } from 'react-router-dom';
import ConfirmModal from '../../common/delConfirm';
import moment from 'moment';
const {afterToday} = DateRangePicker;

class IncomesTable extends Form  {
    state = {
        data: {category: "", date: "", amount: ""},
        errors: {},
        incomes: [],
        categories: [],
        dateValue: [],
        labels: ["Category", "Date", "Amount"],
        sort: {path: "incomeCategory.category", sortOrder: "asc" },
        pageSize: 10,
        currentPage: 1,
        isDelDialogActive: false,
        rowIndex: 1
    }


    componentDidMount() {
        const incomes = getIncomes();
        const categories = getIncomeCategories();
        this.setState({ incomes, categories })
    }

    // sets table column layout 
    columnStructure = [
        { lable: "", 
            key: "RowIndex", 
          index: () => {return this.state.rowIndex++} 
        },   
        {dataPath: "incomeCategory.category", 
            lable: this.state.labels[0], 
           filter: () => { return this.renderSelect("", Object.keys(this.state.data)[0], this.state.categories)}
        }, 
        {dataPath: "date", 
            lable: this.state.labels[1], 
           filter: () => <div onClick={e => e.stopPropagation()}><DateRangePicker disabledDate={afterToday()} onChange = {this.handleDateChange} value = {this.state.dateValue}/></div>
        },
        {dataPath: "incomeAmount", 
            lable: this.state.labels[2], 
           filter: () => this.renderInput("", Object.keys(this.state.data)[2], 'Filter by spent amount', "Number")
        },
        {   
           clName: "edit_del_buttons",
           delete: (onDelete, item) => <div className = "del_button" onClick = {() => onDelete(item)}><FontAwesomeIcon icon ={faTrashAlt}/></div>,
              key: "edit"
        },
        {   
           clName: "edit_del_buttons",
             edit: (item, url) => <div className = "edit_button"><Link to={`${url}/${item.id}`} className="edit"><FontAwesomeIcon icon ={faEdit}/></Link></div>,
              key: "delete"
        }
    ]

    //sets date range as selected and update the state
    handleDateChange = (e) => {
        this.setState({dateValue: e})
    }

    //filter data 
    getFilteredData = () => {
        const {data, incomes, dateValue} = this.state;
        let filteredIncomes = incomes;
        if(data.category){  // filter by category if true
            filteredIncomes = filteredIncomes.filter(ca => ca.incomeCategory.id === data.category )
        }
        if(data.amount){ //filter by amount if true
            filteredIncomes = filteredIncomes.filter(am => am.incomeAmount == data.amount)
        }
        if(dateValue.length > 0){ //filter by date range if true
            const range = dateValue.map( v =>  moment(v).format('YYYY.MM.DD'))
            filteredIncomes = filteredIncomes.filter(exp => {
                const validate = moment(exp.date).format('YYYY.MM.DD');
                if(moment(validate).isBetween(moment(range[0]).subtract(1, "day"), moment(range[1]).add(1, "day"))){
                    return exp
                }
                return null;
            })
        }

        return {filteredIncomes}
    }

    //returns ordered list of the data in asc or desc manner
    getSortedData = (incomes, sort) => {
        return _.orderBy(incomes, [sort.path], [sort.sortOrder])
    }

    // sets sort of the data in asc or desc order and update state
    handleSort = (path, sortOrder) => {
        const rowIndex = this.state.currentPage === 1 ? 1 : 10 * this.state.currentPage-9
        const sort = {...this.state.sort};
        sort.path = path;
        sort.sortOrder = sortOrder;
        this.setState({sort, rowIndex})
    }

    //gets date to the selected page
    getPageIncomes = (incomes, currentPage) => {
        const { pageSize } = this.state
        const index1 = pageSize*currentPage-pageSize
        const index2 = pageSize*currentPage;  
        return incomes.slice(index1, index2)  
    }

    // sets new page and update state
    handlePageClick = (pageNumber) => {
        const rowIndex = pageNumber === 1 ? 1 : 10 * pageNumber-9
        this.setState({currentPage: pageNumber, rowIndex})
    }

    // update the state and help to activate the delete dialog
    deleteItem =(income) => {
        const deleteIncome = income;
        const isDelDialogActive = true;
        this.setState({deleteIncome, isDelDialogActive})
    }

    // handle delete the income if it is set confirmed
    handleDelete = (income, confirmed) => {
          confirmed &&  deleteIncomes(income)
                        const isDelDialogActive = false;
                        const incomes = getIncomes();
                        let currentPage = this.state.currentPage;
                        if(Math.ceil(incomes.length/this.state.pageSize) !== currentPage) currentPage = 1;
                        this.setState({currentPage, isDelDialogActive})
    }

    // depending the pega number it updates rowIndex 
    rowIndeksing = (currentPage) => {
        const rowIndex = currentPage === 1 ? 1 : 10 * currentPage-9;
        this.state.rowIndex = rowIndex;
    }
   
    render () {
        const { labels, sort, pageSize, incomes, currentPage } = this.state;
        this.rowIndeksing(currentPage);
        const messageIfTabEmpty = "No transaction has been found as per your request"
        const numOfCol = labels.length+1;
        const totalIncomes = incomes.length;
        
        const {filteredIncomes} = this.getFilteredData();
        const sortIncomes = this.getSortedData(filteredIncomes, sort);
        const numOfPages = _.range(1, Math.ceil(sortIncomes.length/pageSize)+1);
        
        const pagedIncomes = this.getPageIncomes(sortIncomes, currentPage);

    return ( <div style={{"position":"relative"}}>
                  <div style={{"position":"absolute", "right": "0"}}>There are in total {totalIncomes} income transactions in Database</div>
                  <Table 
                        columns = {this.columnStructure} 
                        data = {pagedIncomes}
                        message = {messageIfTabEmpty} 
                        numOfCol ={numOfCol}
                        onClick = {this.handleSort}
                        sort = {sort}
                        onDelete = {this.deleteItem}
                    />
                    {sortIncomes.length > pageSize && <Pagination onClick = {this.handlePageClick} 
                                                                   currentPage = {currentPage} 
                                                                   number_pages = {numOfPages}/>}
                    {this.state.isDelDialogActive && <ConfirmModal onClick = {this.handleDelete} 
                                                                   itemForDelete = {this.state.deleteIncome}/>}
              </div> 
     );
    }
}

export default IncomesTable;
