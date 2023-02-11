import React from 'react';
import Form from '../../common/form'
import { getExpenceCategories } from '../../server/categories';
import { deleteExpence,  getExpences } from '../../server/transactions';
import 'rsuite/dist/rsuite.css'
import _ from 'lodash';
import { DateRangePicker } from 'rsuite';
import Table from '../../common/table';
import Pagination from '../../common/pagination';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faEdit, faTrashAlt} from "@fortawesome/free-solid-svg-icons"
import { Link } from 'react-router-dom';
import ConfirmModal from '../../common/delConfirm';
import moment from 'moment';
const {afterToday} = DateRangePicker;



class ExpencesTable extends Form {
    
    state = {
        data: {NameOfExpence: "", category: "", forWhom: "", amount: ""},
        errors: {},
        expences: [],
        categories: [],
        dateValue: [],
        labels: ["Name of Expence", "Category", "For Whom", "Date", "Amount"],
        sort: {path: "expenceName", sortOrder: "asc" },
        pageSize: 10,
        currentPage: 1,
        isDelDialogActive: false,
        rowIndex: 1
    }

    componentDidMount() {
        const expences = getExpences();
        const categories = getExpenceCategories();
        this.setState({expences, categories})
    }

    // sets table column layout
    columnStructure = [
        {lable: "", key: "RowIndex", 
         index: () => {return this.state.rowIndex++}
        }, 
        {dataPath: "expenceName", 
            lable: this.state.labels[0], 
          filter: () => this.renderInput("", Object.keys(this.state.data)[0], 'Filter expences by name')
        },  
        {dataPath: "expenceCategory.category", 
            lable: this.state.labels[1], 
           filter: () => { return this.renderSelect("", Object.keys(this.state.data)[1], this.state.categories)}
        }, 
        {dataPath: "forWhom", 
            lable: this.state.labels[2],
           filter: () => this.renderInput("", "forWhom", 'Filter expences by owner')
        }, 
        {dataPath: "date", 
            lable: this.state.labels[3],
           filter: () => <div onClick={e => e.stopPropagation()}><DateRangePicker disabledDate={afterToday()} onChange = {this.handleDateChange} value = {this.state.dateValue}/></div>
        },
        {dataPath: "expenceAmount", 
            lable: this.state.labels[4],
           filter: () => this.renderInput("", Object.keys(this.state.data)[3], 'Filter by spent amount', "Number")
        },
        {   
            clName: "edit_del_buttons",
            edit: (item, url) => <div className = "edit_button"><Link to={`${url}/${item.id}`} className="edit"><FontAwesomeIcon icon ={faEdit}/></Link></div>,
            key: "edit"
        },
        {   
            clName: "edit_del_buttons",
            delete: (onDelete, item) => <div className = "del_button" onClick = {() => onDelete(item)}><FontAwesomeIcon icon ={faTrashAlt}/></div>,
            key: "delete"
        }
    ];

    //sets date range as selected and update the state
    handleDateChange = (e) => {
        this.setState({dateValue: e})
    }

    //filter data 
    getFilteredData = () => {
        const {data, expences, dateValue} = this.state;
        let filteredExpences = expences;
        if(data.NameOfExpence){ // filter by expences if true
            filteredExpences = expences.filter(ex => ex.expenceName.toLowerCase().startsWith(data.NameOfExpence.toLowerCase()))
        }
        if(data.category){  // filter by category if true
            filteredExpences = filteredExpences.filter(ca => ca.expenceCategory.id === data.category )
        }
        if(data.forWhom){
            filteredExpences = filteredExpences.filter(ex => ex.forWhom.toLowerCase().startsWith(data.forWhom.toLowerCase()))
        }
        if(data.amount){
            filteredExpences = filteredExpences.filter(am => am.expenceAmount == data.amount)
        }
        if(dateValue.length > 0){
            const range = dateValue.map( v =>  moment(v).format('YYYY.MM.DD'))
            filteredExpences = filteredExpences.filter(exp => {
                const validate = moment(exp.date).format('YYYY.MM.DD');
                if(moment(validate).isBetween(moment(range[0]).subtract(1, "day"), moment(range[1]).add(1, "day"))){
                    return exp
                }
                return null;
            })
        }

        return filteredExpences
    }

    //returns ordered list of the data in asc or desc manner
    getSortedData = (expences, sort) => {
        let exp = expences;
        return _.orderBy(exp, [sort.path], [sort.sortOrder])
    }

    // sets sort of the data in asc or desc order and update state
    handleSort = (path, sortOrder) => {
        const sort = {...this.state.sort};
        sort.path = path;
        sort.sortOrder = sortOrder;
        this.setState({sort})
    }

    //gets date to the selected page
    getPageExpences = (expences, currentPage) => {
        const { pageSize } = this.state
        const index1 = pageSize*currentPage-pageSize
        const index2 = pageSize*currentPage;  
        return expences.slice(index1, index2)  
    }

    // sets new page and update state
    handlePageClick = (pageNumber) => {
        this.setState({currentPage: pageNumber})
    }

    // update the state and help to activate the delete dialog
    deleteItem =(expence) => {
        const deleteExpence = expence;
        const isDelDialogActive = true;
        this.setState({deleteExpence, isDelDialogActive})
    }

    // handle delete the income if it is set confirmed
    handleDelete = (income, confirmed) => {
          confirmed &&  deleteExpence(income)
                        const isDelDialogActive = false;
                        const expence = getExpences();
                        let currentPage = this.state.currentPage;
                        if(Math.ceil(expence.length/this.state.pageSize) !== currentPage) currentPage = 1;
                        this.setState({currentPage, isDelDialogActive})
    }

    // depending the pega number it updates rowIndex 
    rowIndeksing = (currentPage) => {
        const rowIndex = currentPage === 1 ? 1 : 10 * currentPage-9;
        this.state.rowIndex = rowIndex;
    }
   
    render () {
        const { labels, sort, pageSize, expences, currentPage } = this.state;
        this.rowIndeksing(currentPage);
        const messageIfTabEmpty = "No transaction has been found as per your request"
        const numOfCol = labels.length+1;
        const totalEpences = expences.length;
        
        const filteredExpences = this.getFilteredData();
        const sortExpences = this.getSortedData(filteredExpences, sort);
        
        const numOfPages = _.range(1, Math.ceil(sortExpences.length/pageSize)+1);
        const pagedExpences = this.getPageExpences(sortExpences, currentPage);
    
    return ( <div style={{"position":"relative"}}>
                    <div style={{"position":"absolute", "right": "0"}}>There are in total {totalEpences} expences in Database</div>
                    <Table 
                        columns = {this.columnStructure} 
                        data = {pagedExpences} 
                        message = {messageIfTabEmpty} 
                        numOfCol ={numOfCol}
                        onClick = {this.handleSort}
                        sort = {sort}
                        onDelete = {this.deleteItem}
                    />
                    {sortExpences.length > pageSize && <Pagination onClick = {this.handlePageClick} 
                                                                   currentPage = {currentPage} 
                                                                   number_pages = {numOfPages}/>}
                    {this.state.isDelDialogActive && <ConfirmModal onClick = {this.handleDelete} 
                                                                   itemForDelete = {this.state.deleteExpence}/>}
             </div> 
            );
    }
}
 
export default ExpencesTable;