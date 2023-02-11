import React from 'react';
import AppContext from '../HomeTab/appContext';
import Form from '../../common/form';
import "./modal.css";
import Joi from 'joi';
import { getIncome, saveIncome } from '../../server/transactions';
import { getIncomeCategories } from '../../server/categories';


class IncomeModal extends Form {

    static contextType = AppContext

    state = {
        data: {id: "", incomeAmount: "", incomeCategoryId: ""},
        categories: [], 
        errors: {}
    }

    schema =  Joi.object({
        id: Joi.string(),
        incomeCategoryId: Joi.string().required().label("Category"),
        incomeAmount: Joi.number().min(0.01).required().label("Amount")
    })

    componentDidMount() {
        const categories = getIncomeCategories();  
        this.setState({categories});
        
        const { id } = this.props.match.params;
        if (!id) return this.state.data.id = "new";
        const data = {...this.state.data};
        let income = getIncome(id);
        if(income) income = income[0];
        else {
            this.props.history.replace("/not-found");
            return
        }
        data.id = id;
        data.incomeAmount = income.incomeAmount;
        data.incomeCategoryId = income.incomeCategory.id;
        this.setState({data});
    }
    

    handleClose = () => {
        const {history, match} = this.props
        history.replace( match.params.id ? "/transactions/incomes-table" : "/budget");
    }

    doSubmit = () => {
        saveIncome(this.state.data);
        this.handleClose();
    }

    render() {
        return (
                    <form className="backdrop" onSubmit = {this.handleSubmit} onClick={this.handleClose}>
                    <div className = "incomeModal" onClick={e => e.stopPropagation()}>
                        <div className="modalHeader" style = {{"color":"green"}}>
                            {this.props.match.params.id ? "Edit Income" : "Add Income" }
                        </div>
                        <div className="modalBody">
                            {this.renderSelect("Category", "incomeCategoryId", this.state.categories)}
                            {this.renderInput("Amount", "incomeAmount", "How much did you earn?", "Number")}
                            <div className="mb-3">
                                <button className="btn btn-secondary mx-3" onClick = {this.handleClose}>Cancel</button>
                                <button className="btn btn-secondary my-3">Save</button>
                            </div> 
                        </div>
                    </div>
                    </form>
                    
                )
    }
    
}
 
export default IncomeModal;