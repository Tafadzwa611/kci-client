import React from 'react';
import { 
    CustomSelect,
    CustomInput,
    ButtonDefault,
    ButtonSuccess 
} from '../../../../../common';
import { initialPenaltyValues } from './data';
import { uuidv4 } from '../../../../../utils';

function SchedulePenalty({schedule_penalty, index, setFieldValue, schedule_penalties}) {
    const remove = (evt) => {
        evt.preventDefault();
        setFieldValue('schedule_penalties', schedule_penalties.filter(sp => sp.id !== schedule_penalty.id));
    }

    return (
        <>
            <CustomSelect label='Charge Type' name={`schedule_penalties[${index}].charge_type`}>
                <option value=''>------</option>
                <option value='Penalty'>Penalty</option>
                <option value='Interest'>Interest</option>
            </CustomSelect>
            <CustomInput label='Number Of Days After Maturity' name={`schedule_penalties[${index}].days`} type='number' required/>
            <CustomInput label='Charge Rate' name={`schedule_penalties[${index}].penalty_rate`} type='number' min='0.00001' step='0.00001' required/>
            <div style={{marginTop:'10px'}}>
                <ButtonDefault value={'Remove Penalty'} handler={remove} />
            </div>
            <div className="divider divider-default" style={{padding: "1.25rem"}}>
            </div>
        </>
    )
}

function AddSchedulePenalty({setFieldValue, schedule_penalties}) {
    const add = (evt) => {
        evt.preventDefault();
        const schedulePenaltyID = uuidv4();
        setFieldValue('schedule_penalties', [...schedule_penalties, {...initialPenaltyValues, id: schedulePenaltyID}]);
    }

    return (
        <div style={{marginTop:'10px'}}>
            <ButtonSuccess value='Add Penalty' handler={(evt) => add(evt)} />
        </div>
    )
}

export {SchedulePenalty, AddSchedulePenalty};