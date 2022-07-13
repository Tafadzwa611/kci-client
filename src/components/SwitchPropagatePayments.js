import React from 'react';

const SwitchPropagatePayments = ({onToggle, propagatePayments}) => {

    return (
        <div>
            <label className="switch">
                <input type="checkbox" onChange={onToggle} checked={propagatePayments}/>
                <span className="slider rounded" />
            </label>
        </div>
    )
}

export default SwitchPropagatePayments;