import React, {useEffect, useRef, useState} from 'react';
import { makeRequest } from '../../../../utils/utils';
import DateRange from './DateRange';

const MainAccounts = () => {
    const [mainaccounts, setMainAccounts] = useState([])
    const [branches, setBranches] = useState(null);
    const [branchIds, setBranchIds] = useState(null);
    const [nextPageNumber, setNextPageNumber] = useState(null);
    const [totalCount, setTotalCount] = useState(0);
    const [accType, setAccType] = useState('');
    // const [currency, setCurrency] = useState(null);
    // const [currencyId, setCurrencyId] = useState(null);
    const [searching, setSearching] = useState(false);
    const [loadingMore, setLoadingMore] = useState(false);

    const pageNum = useRef(1);

    useEffect(() => {
        getMainAccounts();
    }, []);

    useEffect(() => {
        getBranches();
    }, [])

    const getMainAccounts = async () => {
        window.scrollTo(0, 0);
        const data = await fetchMainAccounts();
        setMainAccounts(data.mainaccounts);
        setTotalCount(data.count);
    };

    const getBranches = async () => {
        window.scrollTo(0, 0);
        const branches = await fetchBranches();
        setBranches(branches);
    };

    async function fetchMainAccounts() {
        try {
            const url = getUrl();
            const response = await makeRequest.get(url, {timeout: 8000});
            if (response.ok) {
                const json_res = await response.json();
                setNextPageNumber(json_res.next_page_num);
                setLoadingMore(false);
                setSearching(false);
                return json_res;
            }else {
                const error = await response.json();
                console.log(error);
            }
        }catch(error) {
            console.log(error);
        }
    }
    
    // async function fetchCurrency() {
    //     try {
    //       const response = await makeRequest.get('/usersapi/currencieslist/', {timeout: 8000});
    //       if (response.ok) {
    //         const data = await response.json();
    //         if (currencyId===null) {
    //           const zwlId = data.filter(currency => currency.shortname === 'ZWL')[0].id;
    //           setCurrencyId(zwlId);
    //         }
    //         return setCurrency([...data.map(result => ({...result, label: result.shortname, value:result.id}))]);
    //       }else {
    //         const error = await response.json();
    //         console.log(error);
    //       }
    //     }catch(error) {
    //       console.log(error);
    //     }
    //   }
    
    // const getCurrency = async () => {
    //     await fetchCurrency();
    // };

    // const changeCurrency = (evt) => {
    //     setCurrencyId(evt.target.value);
    //     pageNum.current = 1;
    // }

    async function fetchBranches() {
        try {
          const response = await makeRequest.get('/usersapi/get-branches/', {timeout: 6000});
          if (response.ok) {
            const json_res = await response.json();
            return json_res.results;
          }else {
            const error = await response.json();
            console.log(error);
          }
        }catch(error) {
          console.log(error);
        }
      }
    

    function getUrl() {

        let url = `/acc-api/main-accounts-list/?page_num=${pageNum.current}`;
        if (branchIds !== null) {
            branchIds.forEach(id => (url += `&branch_ids=${id}`));
          }
        if (accType !== '') {
          url += `&acc_type=${accType}`;
        }
        return url
    }

    const loadMore = async (evt) => {
        evt.preventDefault();
        setLoadingMore(true);
        pageNum.current += 1;
        const data = await fetchMainAccounts();
        setMainAccounts(curr => [...curr,...data.mainaccounts]);
    }
    
    const onSubmit = async (evt) => {
        evt.preventDefault();
        setSearching(true);
        pageNum.current = 1;
        const data = await fetchMainAccounts();
        // console.log(data)
        setTotalCount(data.count);
        setMainAccounts(data.mainaccounts);
    }

    if (mainaccounts === null || branches === null) {
        return <div>Loading ...</div>
    }

    console.log(mainaccounts)

    return (
        <>
            <DateRange 
                accType={accType}
                setAccType={setAccType}
                onSubmit={onSubmit}
                // changeCurrency={changeCurrency}
                searching={searching}
                // setMainAccounts={setMainAccounts}
                branches={branches}
                setBranchIds={setBranchIds}
            />
            <div className="table-container font-12" style={{padding:"0", border:"none"}}>
                <div className="table-responsive" style={{maxHeight:"800px"}}>
                    <table className="table">
                        <thead>
                            <tr className="bg-gray-accs">
                                <th>GL Code</th>
                                <th>Account Name</th>
                                <th>Type</th>
                                <th>Branch</th>
                                <th>Date Created</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>5300</td>
                                <td>Provision for Loan losses</td>
                                <td>EXPENSE</td>
                                <td>Main Branch</td>
                                <td>12/12/21</td>
                            </tr>
                            <tr>
                                <td>5300</td>
                                <td>Provision for Loan losses</td>
                                <td>EXPENSE</td>
                                <td>Main Branch</td>
                                <td>12/12/21</td>
                            </tr>
                            <tr>
                                <td>5300</td>
                                <td>Provision for Loan losses</td>
                                <td>EXPENSE</td>
                                <td>Main Branch</td>
                                <td>12/12/21</td>
                            </tr>
                            <tr>
                                <td>5300</td>
                                <td>Provision for Loan losses</td>
                                <td>EXPENSE</td>
                                <td>Main Branch</td>
                                <td>12/12/21</td>
                            </tr>
                            <tr>
                                <td>5300</td>
                                <td>Provision for Loan losses</td>
                                <td>EXPENSE</td>
                                <td>Main Branch</td>
                                <td>12/12/21</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default MainAccounts;