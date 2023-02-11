import React from 'react';
import Form from '../../common/form';
import "./modal.css";
import Joi from 'joi';
import AppContext from '../HomeTab/appContext';
import { getExpence, saveExpence } from '../../server/transactions';
import { getExpenceCategories } from '../../server/categories';

class ExpenceModal extends Form {
    static contextType = AppContext;

    state = {
        data: {id: "", expenceCatrgoryId: "", expenceAmount: "", expenceName: "", forWhom: ""},
        categories: [],
        errors: {}
    }
    

    schema =  Joi.object({
        id: Joi.string(),
        expenceCatrgoryId: Joi.string().required().label("Category"),
        expenceAmount: Joi.number().min(0.01).required().label("Amount"),
        expenceName: Joi.string().required().label("Name of Expence"),
        forWhom: Joi.string().label("For Whom")
    })

    componentDidMount() {
        const categories = getExpenceCategories();  
        this.setState({categories});
        
        const { id } = this.props.match.params;
        if (!id) return this.state.data.id = "new";
        const data = {...this.state.data};
        let expence = getExpence(id);
        if(expence) expence = expence[0];
        else {
            this.props.history.replace("/not-found");
            return
        }
        data.id = id;
        data.expenceCatrgoryId = expence.expenceCategory.id;
        data.expenceAmount = expence.expenceAmount;
        data.expenceName = expence.expenceName;
        data.forWhom = expence.forWhom;
        this.setState({data});
    }

    doSubmit = () => {
        saveExpence(this.state.data);
        this.handleClose();
    }

    handleClose = () => {
        const {history, match} = this.props
        history.replace( match.params.id ? "/transactions/expences-table" : "/budget");
    }

    render() { 
        return  <form className="backdrop" onSubmit = {this.handleSubmit} onClick={this.handleClose}>
                    <div className = "expenceModal" onClick={e => e.stopPropagation()}>
                        <div className="modalHeader" style = {{"color":"red"}}>
                        {this.props.match.params.id ? "Edit Expence" : "Add Expence" }
                        </div>
                        <div className="modalBody">
                            {this.renderSelect("Category", "expenceCatrgoryId", this.state.categories)}
                            {this.renderInput("Amount", "expenceAmount", "Hom much did you spent?", "Number")}
                            {this.renderInput("Transaction Name", "expenceName", "What did you spent for?")}
                            {this.renderInput("Spent For", "forWhom", "Who spent?")}
                            <div className="mb-3">
                                <button className="btn btn-secondary mx-3" onClick = {this.handleClose}>Cancel</button>
                                <button className="btn btn-secondary my-3">Save</button>
                            </div> 
                        </div>
                    </div>
                </form>
    }
}
 
export default ExpenceModal;