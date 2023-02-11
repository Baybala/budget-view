import React from 'react';
import "./common.css"

const ConfirmModal = ({onClick, itemForDelete}) => {

    
    return ( <div className="dialogBacdrop" onClick = {() => onClick(itemForDelete, false)}>
                <div className="dialog" onClick = {e => e.stopPropagation()}>
                    <div className="dialog_header">Delete</div>
                    <div className ="dialog_body">
                        <p>You are about to delete this transaction. Please Confirm your action</p>
                    </div>
                    <div className = "dialog_buttons">
                        <button className="btn btn-primary" onClick = {() => onClick(itemForDelete, false)}>Cancel</button>
                        <button className="btn btn-danger" onClick = {() => onClick(itemForDelete, true)}>Delete</button>
                    </div>
                </div> 
             </div>
            );
}
 
export default ConfirmModal;