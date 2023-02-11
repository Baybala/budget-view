import React from 'react';
import { Redirect, Route, Switch, useRouteMatch } from 'react-router';
import { getExpences, getIncomes } from '../../server/transactions';
import ExpencesTable from './expencesTable';
import IncomesTable from './incomesTable';
import NavTabs from './navTabs';
import NotFound from '../notFound';

const Transactions = () => {
    let { path } = useRouteMatch();
        return (
            <div className="container">
                <NavTabs />
                
                <Switch>
                    <Route path={`${path}/incomes-table`}>
                        <IncomesTable incomes = {getIncomes}/>
                    </Route>  
                    <Route path={`${path}/expences-table`}>
                        <ExpencesTable expences = {getExpences}/>
                    </Route>
                    <Route path="/not-found" component={NotFound} />  
                    <Route path = "/transactions" exact>
                        <div style={{"margin": "auto", "width":"250px", "color":"white"}}>PLEASE SELECT TABLE TO DISPLAY</div>
                    </Route>
                    <Redirect to = "/not-found"/>
                </Switch>
                
            </div> 
        )
}
 
export default Transactions;

 