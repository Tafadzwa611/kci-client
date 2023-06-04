import React, {useState} from 'react';
import PaymentsFilter from './PaymentsFilter';
import PaymentsList from './PaymentsList';
import { useSearchParams } from 'react-router-dom';

function Payments() {
    const [searchParams] = useSearchParams();
    const [params, setParams] = useState(null);
    const [paymentsData, setPayments] = useState({count: 0, next_page_num: 0, payments: []});


    return (
        <>
            <>
                <PaymentsFilter setPayments={setPayments} setParams={setParams}/>
                <div style={{paddingTop: '2rem'}}></div>
                <PaymentsList
                    paymentsData={paymentsData} 
                    params={params}
                    setPayments={setPayments}
                />
            </>
        </>
    )
}

export default Payments;