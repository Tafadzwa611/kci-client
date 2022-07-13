import React, {useState} from 'react';

const SwitchAccounting = ({isAccountinOn, onToggle}) => {

    return (
        <div>
            <label className="switch">
                <input type="checkbox" checked={isAccountinOn} onChange={onToggle}/>
                <span className="slider rounded" />
            </label>
        </div>
    )
}

export default SwitchAccounting;