import React, {useState, useEffect} from 'react';
import { makeRequest } from '../../utils/utils';
import LoansReleased from './LoansReleased/LoansReleased';
import LoanCollections from './LoanCollections/LoanCollections';
import AllLoans from './AllLoans/AllLoans';
import AllClients from './AllClients/AllClients';
import Status from './Status/Status';
import ActiveClients from './ActiveClients/ActiveClients';
import LoanBook from './LoanBook/LoanBook';
import Loader from '../Loader/loader';

export default function Dashboard() {

    const [div1, setDiv1] = useState(false);
    const showDiv1 = () => setDiv1(!div1)
    const [div2, setDiv2] = useState(false);
    const showDiv2 = () => setDiv2(!div2)
    const [div3, setDiv3] = useState(false);
    const showDiv3 = () => setDiv3(!div3)
    const [div4, setDiv4] = useState(false);
    const showDiv4 = () => setDiv4(!div4)

    const [branches, setBranches] = useState(null);
    const [currencies, setCurrencies] = useState(null);

    useEffect(() => {
        document.title = 'Dashboard';
    })

    useEffect(() => {
        getBranchCurrencyData();
    }, []);

    const getBranchCurrencyData = async () => {
        await fetchBranches();
        await fetchCurrencies();
    }

    async function fetchBranches() {
        try {
            const response = await makeRequest.get('/usersapi/get-branches/', {timeout: 8000});
            if (response.ok) {
                const data = await response.json();
                return setBranches([...data.results.map(result => ({...result, label: result.name, value:result.id}))]);
            }else {
                const error = await response.json();
                console.log(error);
            }
        }catch(error) {
            console.log(error);
        }
    }

    async function fetchCurrencies() {
        try {
            const response = await makeRequest.get('/usersapi/list_currencies/', {timeout: 8000});
            if (response.ok) {
                const data = await response.json();
                return setCurrencies([...data.map(result => ({...result, label: result.shortname, value:result.id}))]);
            }else {
                const error = await response.json();
                console.log(error);
            }
        }catch(error) {
            console.log(error);
        }
    }

    if (branches === null || currencies === null) {
        return (
            <div style={{display:"flex", justifyContent:"center", alignItems:"center", minHeight:"100vh"}}>
                <Loader />
            </div>
        )
    }
  
  return (
        <div className="font-13">
            
            <div style={{padding:"24px", paddingBottom:"0"}}>
                <h3>Dashboard</h3>
            </div>

            <LoanBook branches={branches} currencies={currencies} div3={div3} showDiv3={showDiv3}/>

            <ActiveClients branches={branches} currencies={currencies} div4={div4} showDiv4={showDiv4} /> 

            <LoansReleased branches={branches} currencies={currencies}/>

            <LoanCollections branches={branches} currencies={currencies}/>

            <div className="card">
                <div className="card-body">

                    <div className="book-value-section">

                        {/* <AllLoans branches={branches} currencies={currencies} div1={div1} showDiv1={showDiv1} /> */}
                        <AllClients branches={branches} div2={div2} showDiv2={showDiv2} />

                    </div>

                </div>
            </div>

            <Status branches={branches} currencies={currencies}/>
        </div>
    )
}