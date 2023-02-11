import React from 'react';
import "./common.css"

const Input = ({label, onChange, value, name, type, placeHolder, error}) => {
    return ( <div className="form-group mt-3" onClick={e => e.stopPropagation()}>
                <label htmlFor={name} className="form-label">{label}</label>
                <input 
                    type={type} 
                    className="form-control" 
                    id={name}
                    onChange = {onChange}
                    value = {value}
                    name = {name}
                    placeholder = {placeHolder}
                />
                {error && <div className="alert alert-danger">{error}</div>}
            </div> 
    );
}
 
//rgb(35, 184, 243);
export default Input;