import React, {useState} from 'react';
import PaymentsFilter from './PaymentsFilter';
import PaymentsList from './PaymentsList';
import { useSearchParams } from 'react-router-dom';

function Payments() {
    const [searchParams] = useSearchParams();
    const [paymentsData, setPayments] = useState({count: 0, next_page_num: 0, payments: []});


    return (
        <>
            <>
                <PaymentsFilter setPayments={setPayments}/>
                <div style={{paddingTop: '2rem'}}></div>
                <PaymentsList
                    key={paymentsData.payments.length}
                    payments={paymentsData.payments} 
                />
            </>
        </>
    )
}

export default Payments;