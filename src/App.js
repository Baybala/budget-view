import { Route, Switch, Redirect } from 'react-router-dom'
import './App.css'
import Chart from './component/chart/chart'
import BudgetView from './component/HomeTab/budgetView'
import Login from './component/Login/login'
import NavBar from './component/navBar'
import NotFound from './component/notFound'
import Register from './component/Register/register'
import Transactions from './component/TransactionsTab/transactions'

function App() {
  return (
    <div className="app">
      <NavBar className="navBar" />
      <div>
        <Switch>
          <Route path="/budget" component={BudgetView} />
          <Route path="/transactions" component={Transactions} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/chart" component={Chart} />
          <Route path="/not-found" component={NotFound} />
          <Redirect from="/" exact to="/budget" />
          <Redirect to="/not-found" />
        </Switch>
      </div>
    </div>
  )
}

export default App
