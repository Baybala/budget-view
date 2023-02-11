import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faSortUp, faSortDown} from "@fortawesome/free-solid-svg-icons"

const sortOrder = (sort, column) => {
    if(column.dataPath !== sort.path) return sort.sortOrder
    return sort.sortOrder === "asc" ? "desc" : "asc";
}

const getFilterIcon = (column, sort) => {
    
    if(column.dataPath === sort.path) {
        return <FontAwesomeIcon icon = {sort.sortOrder === "asc" ? faSortUp : faSortDown} style = {{"marginLeft":"8px"}}/>
    }
        
}

const TableHeader = ({columns, onClick, sort }) => {
    return ( 
                <thead>
                    <tr>
                        {columns.map(column => 
                            <th key = {column.dataPath || column.key} 
                                style={{"cursor":"pointer"}} 
                                onClick = {() => onClick(column.dataPath, sortOrder(sort, column))
                            }>
                                {column.filter && column.filter()}
                                {column.lable}
                                {getFilterIcon(column, sort)}
                            </th>
                        )}
                    </tr>
                </thead>
     );
}
 
export default TableHeader;
 