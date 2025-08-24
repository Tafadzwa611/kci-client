import React from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useParams } from 'react-router-dom';
import DetailsTab from './DetailsTab';
import FeesTab from './FeesTab';
import AccountingRules from './AccountingRules';
import Activate from './Activate';

const DEPOSIT_FIELDS = [
    'id',
    'account_number',
    'client_id',
    'client__fullname',
    'deposit_product_id',
    'deposit_product__name',
    'balance',
    'currency_id',
    'interest_term',
    'interest_method',
    'interest_posting_frequency',
    'fixed_interest_rate',
    'balance_tiers_interest_rates',
    'fees',
    'account_date',
    'status',
    'fund_account_id',
    'savings_control_id',
    'fee_income_id',
    'overdraft_control_id',
    'interest_income_id',
    'interest_expense_id',
    'negative_interest_receivable_id',
    'negative_interest_income_id',
    'taxes_payable_id',
    'created_by_id',
    'date_created',
    'last_updated',
    'branch_id',
    'accounting',
    'created_by_name',
];

const STATUS_CLASSES = Object.freeze({
    ACTIVE: 'badge badge-success',
    INACTIVE: 'badge badge-danger'
});

const STATUS = Object.freeze({
    ACTIVE: 'ACTIVE',
    INACTIVE: 'INACTIVE'
});

const TABS = Object.freeze({
    DETAIL: "DETAIL",
    TXNS: "TXNS",
    FEES: "FEES",
    ACCOUNTING: "ACCOUNTING"
});

const MODAL_NAMES = Object.freeze({
    ACTIVATE: "ACTIVATE"
});

function Details() {
    const params = useParams();
    const [deposit, setDeposit] = React.useState(null);
    const [error, setError] = React.useState(null);
    const [tab, setTab] = React.useState(TABS.DETAIL);
    const [modal, setModal] = React.useState(null);

    React.useEffect(() => {
        async function fetch() {
            const CONFIG = {headers: {'X-CSRFToken': Cookies.get('csrftoken'), 'Accept': 'application/json', 'Content-Type': 'application/json'}};
            try {
                const baseUrl = `/deposits/${params.depositId}/`;
                const query = DEPOSIT_FIELDS.map(f => `fields=${encodeURIComponent(f)}`).join('&');
                const fullUrl = `${baseUrl}?${query}`;
                const response = await axios.get(fullUrl, CONFIG);
                setDeposit(response.data.results[0]);
            } catch (error) {
                if (error.response) {
                    setError(error.response.data.detail);
                    return;
                }
                console.error('An error occurred while fetching the product:', error);
            }
        }
        fetch();
    }, []);

    if (error) {
        return <div className='alert alert-danger'>{error}</div>;
    }

    if (!deposit) {
        return <div>Loading...</div>;
    }

    return (
        <div id='loan-details'>
            <ModalRenderer deposit={deposit} setDeposit={setDeposit} modal={modal} setModal={setModal}/>
            <div style={{position:'sticky', top:'0', width:'100%'}}>
                <div style={{display:'flex', flexDirection:'column', padding:'1.5rem'}} className='j-details-container'>
                    <div style={{marginBottom:'1rem'}}>
                        <div style={{display:'flex', justifyContent:'space-between'}}>
                            <div style={{display:'flex', alignItems:'center'}}>
                                <span style={{marginRight:'5px'}}><b>{deposit.client__fullname}&apos;s</b> Deposit Account Details</span> /
                                <span style={{margin: "0 5px"}}><b>{deposit.account_number}</b></span> /          
                                <div style={{marginLeft:'5px'}}>
                                    <button className={STATUS_CLASSES[deposit.status]}>
                                        {deposit.status}
                                    </button>
                                </div>
                            </div>
                            <div style={{display:'flex', columnGap:'3px'}}>
                                {STATUS.INACTIVE === deposit.status && (
                                    <div className='client-state-btns' style={{display:'flex', columnGap:'3px', justifyContent:'flex-end'}}>
                                        <button className='btn btn-olive' onClick={() => setModal(MODAL_NAMES.ACTIVATE)}>Activate</button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className='bloc-tabs' style={{marginBottom:'2rem'}}>
                        <button className={`tabs-client ${tab === TABS.DETAIL ? 'active-tabs' : ''}`} onClick={() => setTab(TABS.DETAIL)}>Details</button>
                        <button className={`tabs-client ${tab === TABS.TXNS ? 'active-tabs' : ''}`} onClick={() => setTab(TABS.TXNS)}>Transactions</button>
                        <button className={`tabs-client ${tab === TABS.FEES ? 'active-tabs' : ''}`} onClick={() => setTab(TABS.FEES)}>Fees</button>
                        <button className={`tabs-client ${tab === TABS.ACCOUNTING ? 'active-tabs' : ''}`} onClick={() => setTab(TABS.ACCOUNTING)}>Accounting</button>
                    </div>
                    {{
                        [TABS.DETAIL]: <DetailsTab deposit={deposit} />,
                        [TABS.TXNS]: <div>Transaction content goes here</div>,
                        [TABS.FEES]: <FeesTab deposit={deposit}/>,
                        [TABS.ACCOUNTING]: <AccountingRules deposit={deposit}/>
                    }[tab]}
                </div>
            </div>
        </div>
    )
}

const ModalRenderer = ({deposit, setDeposit, modal, setModal}) => {
    return (
        <div>
            {{
                [MODAL_NAMES.ACTIVATE]: <Activate deposit={deposit} setDeposit={setDeposit} setModal={setModal}/>,
            }[modal]}
        </div>
    )
}

export default Details;