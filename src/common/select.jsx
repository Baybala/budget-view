import React from 'react';
import "./common.css"

const Select = ({label, options, name, error, ...rest}) => {
    return (<div className="form-group mt-3" onClick={e => e.stopPropagation()}>
                <label htmlFor={label} className="form-label">{label}</label> 
                <select name = {name} className="form-select" id ={name} {...rest}>
                    <option value = ""></option>
                    {options.map(cat => <option value={cat.id} key={cat.id}>{cat.category}</option>)}
                </select>
                {error && <div className="alert alert-danger">{error}</div>}
            </div>
    );
}
 
export default Select;