import React from 'react';
import { NavLink, useRouteMatch } from 'react-router-dom';

const NavTabs = () => {
    let { url } = useRouteMatch();

    return (
            <ul className="nav nav-tabs" style = {{"marginTop": "10px"}}>
                <li className="nav-item">
                    <NavLink className="nav-link" to={`${url}/incomes-table`}>Incomes</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className="nav-link" to={`${url}/expences-table`}>Expences</NavLink>
                </li>
            </ul>
        );
}

 
export default NavTabs;