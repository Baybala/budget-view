import React from 'react';
import _ from 'lodash';
import './common.css'
import { useRouteMatch } from 'react-router-dom';
import moment from 'moment';

const TableBody = ({ columns, items, message, numOfCol, onDelete }) => {
    
    const  { url } =useRouteMatch();

    const renderCell = (item, column) => {
        if(column.edit) return column.edit(item, url);
        if(column.delete) return column.delete(onDelete, item);
        if(column.index) return column.index()
        if(column.dataPath === "date") return moment(item.date).format('ll')
        
        return _.get(item, column.dataPath)
    }

    
    return (
            <tbody>
            {items.length === 0 ? <tr><td colSpan={numOfCol}>{message}</td></tr> :  
                items.map(item => (
                    <tr key ={item.id} className = "t-Row">
                        {columns.map(column => (
                            <td key={column.dataPath || column.key} className =  {column.clName} >
                                {renderCell(item, column)}
                            </td> 
                        ))}
                    </tr>
                ))}
            </tbody>
    );
}

 
export default TableBody;


 