import React, {useEffect, useRef, useState} from 'react';
import { makeRequest } from '../../../../utils/utils';
import MiniLoader from '../../../Loader/MiniLoader';
import CreateMainAccountModal from './CreateMainAccountModal';
import DateRange from './DateRange';
import Table from './Table';

const MainAccounts = () => {
    const [mainaccounts, setMainAccounts] = useState({count: 0, next_page_num: 0, mainaccounts: []})
    const [branches, setBranches] = useState(null);
    const [branchIds, setBranchIds] = useState(null);
    const [nextPageNumber, setNextPageNumber] = useState(null);
    const [totalCount, setTotalCount] = useState(0);
    const [accType, setAccType] = useState('');
    const [searching, setSearching] = useState(false);
    const [loadingMore, setLoadingMore] = useState(false);
    const [selectedMainAccID, setSelectedMainAccID] = useState(null)
    const [accDetails, setAccDetails] = useState(false)
    const [open, setOpen] = useState(false);
    const [params, setParams] = useState(null);

    return (
        <>
            <div style={{marginBottom:"1.5rem"}}>
                <button type='button' className='btn btn-success' onClick={(e) => setOpen(curr => !curr)} 
                    >Add Main Account
                </button>
            </div>
            <CreateMainAccountModal open={open} setOpen={setOpen} setMainAccounts={setMainAccounts} />
            <DateRange 
                setMainAccounts={setMainAccounts}
                setParams={setParams}
            />
            <div style={{paddingTop: '2rem'}}></div>
            <Table 
                mainaccounts={mainaccounts}
                setSelectedMainAccID={setSelectedMainAccID}
                selectedMainAccID={selectedMainAccID}
                accDetails={accDetails}
                setAccDetails={setAccDetails}
                params={params}
                setMainAccounts={setMainAccounts}
            />
        </>
    )
}

export default MainAccounts;