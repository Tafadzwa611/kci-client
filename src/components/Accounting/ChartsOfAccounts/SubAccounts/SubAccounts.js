import React, {useEffect, useRef, useState} from 'react';
import { makeRequest } from '../../../../utils/utils';
import Table from './Table';
import DateRange from './DateRange';
import MiniLoader from '../../../Loader/MiniLoader';

const SubAccounts = () => {
    const [subaccounts, setSubAccounts] = useState([])
    const [branches, setBranches] = useState(null);
    const [branchIds, setBranchIds] = useState(null);
    const [mainacc, setMainAcc] = useState('');
    const [currencyId, setCurrencyId] = useState(null);
    const [acctype, setAccType] = useState(null);
    const [currency, setCurrency] = useState(null);
    const [accStatement, setAccStatement] = useState(false)
    const [selectedSubAccID, setSelectedSubAccID] = useState(null)
    const [params, setParams] = useState(null);
    
    return (
        <>
            <DateRange 
                setSubAccounts={setSubAccounts}
                setParams={setParams}
            />
            <Table 
                subaccounts={subaccounts}
                accStatement={accStatement}
                setAccStatement={setAccStatement}
                selectedSubAccID={selectedSubAccID}
                setSelectedSubAccID={setSelectedSubAccID}
            />
        </>
    )
}

export default SubAccounts;