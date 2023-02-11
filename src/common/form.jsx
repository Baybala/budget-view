import React, { Component } from 'react';
import Input from './input'
import Select from './select';

class Form extends Component {

    state = {
        data: {},
        errors: {},
    }

    handleSubmit = (e) => {
        e.preventDefault();

        const errors = {};

        const {error}= this.schema.validate(this.state.data, {abortEarly: true});
        
        if(error){
            const key = error.details[0].path[0];
            const value = error.details[0].message;
            errors[key] = value;
            this.setState({errors})
            return
        }
       
        this.doSubmit();

    }

    handleChange = ({target: input}) => {
        const data = {...this.state.data};
        data[input.name] = input.value
        this.setState({data, currentPage: 1})
    }

    renderInput (label, name, placeholder = "", type = "text") {
        const {data, errors} = this.state;
        return (
            <Input 
                label = {label}
                value = {data[name]}
                name = {name}
                type = {type}
                placeHolder = {placeholder}
                error = {errors[name]}
                onChange = {this.handleChange}
            />
        )
    }

    renderSelect (label, name, options) {
        const {data, errors} = this.state;
        return (
                <Select 
                    label = {label} 
                    options = {options}
                    name = {name}
                    placeholder = "Select one of below"
                    value = {data[name]}
                    onChange = {this.handleChange}
                    error = {errors[name]}
                />                                
        )
    }

    renderDate () {

    }

}
 
export default Form;