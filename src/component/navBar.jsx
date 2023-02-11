import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class NavBar extends Component {
    render() { 
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <NavLink className="navbar-brand" to="/budget">Budget App</NavLink>
                        <button className="navbar-toggler" type="button">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/budget">Home</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/transactions">Transactions</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/chart">Chart</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/login">Login</NavLink>
                            </li>
                        <li className="nav-item">
                                <NavLink className="nav-link" to="/register">Register</NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
}

 
export default NavBar;