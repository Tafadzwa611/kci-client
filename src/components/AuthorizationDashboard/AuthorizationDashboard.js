import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function AuthorizationDashboard() {
    React.useEffect(() => {
        document.title = 'Authorization Dashboard';
    }, []);

    return (
        <>
            <div className='font-13'>
                <div style={{padding:'24px', paddingBottom:'0'}}>
                    <h5 className='table-heading'>Authorization Dashboard</h5>
                </div>
                <div className='card'>
                    <PaymentApprovals/>
                </div>
            </div>
        </>
    )
}

function PaymentApprovals() {
    const [count, setCount] = React.useState(null);

    React.useEffect(() => {
        const fetch = async () => {
            const response = await axios.get('/loansapi/payment_requests_count/');
            setCount(response.data);
        }
        fetch();
    }, []);

    if (!count) {
        return (
            <div>
                <div className="mini-spinner"></div>
            </div>
        )
    }

    return (
        <div className='card-body'>
            <div className='book-value-info-box loan__book'>
                <p>Pending Payment Approvals: {count.count}</p>
                <Link to='/payments/viewpayments/requests'>
                    Go to payment requests
                </Link>
            </div>
        </div>
    )
}

export default AuthorizationDashboard;