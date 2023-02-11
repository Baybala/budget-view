import React from 'react';
import { Route, Switch } from 'react-router';
import ExpenceModal from '../component/Modal/expenceModal';
import IncomeModal from '../component/Modal/incomeModal';
import TableBody from './tableBody';
import TableHeader from './tableHeader';

const Table = ({ columns, data, message, numOfCol, onClick, sort, onDelete }) => {
    
        return (
            <React.Fragment>
                <table className="table" style = {{"background-image": "linear-gradient(rgba(2, 41, 71), rgba(23, 28, 32))", "textAlign": "center", "color": "white"}}>
                    <TableHeader columns = {columns} onClick = {onClick} sort = {sort}/>
                    <TableBody columns = {columns} items = {data} message = {message} numOfCol = {numOfCol} onDelete = {onDelete}/>
                </table>
                <Switch>
                    <Route path = {`/transactions/expences-table/:id`} component = {ExpenceModal} />
                    <Route path = {`/transactions/incomes-table/:id`} component = {IncomeModal} />
                </Switch>
            </React.Fragment>
        )
}
 
export default Table;


 