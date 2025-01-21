import React from 'react';
import { CustomInput, ButtonDefault, ButtonSuccess } from '../../../../../common';
import { initialFeeValues } from './data';
import { uuidv4 } from '../../../../../utils';

function SchedulePenalties({schedule_penalty, index, setFieldValue, schedule_penalties}) {
    const remove = (evt) => {
        evt.preventDefault();
        setFieldValue('schedule_penalties', schedule_penalties.filter(sp => sp.id !== schedule_penalty.id));
    }

    return (
        <>
            <CustomInput label='Number Of Days After Maturity' name={`schedule_penalties[${index}].days`} type='number' required/>
            <div style={{marginTop:'10px'}}>
                <ButtonDefault value={'Remove Penalty'} handler={remove} />
            </div>
            <div className="divider divider-default" style={{padding: "1.25rem"}}>
            </div>
        </>
    )
}

function AddSchedule({setFieldValue, schedule_penalties}) {
    const add = (evt) => {
        evt.preventDefault();
        const schedulePenaltyID = uuidv4();
        setFieldValue('schedule_penalties', [...schedule_penalties, {...initialFeeValues, id: schedulePenaltyID}]);
    }

    return (
        <div style={{marginTop:'10px'}}>
            <ButtonSuccess value={'Add Fee'} handler={(evt) => add(evt)} />
        </div>
    )
}

export {SchedulePenalties, AddSchedule};