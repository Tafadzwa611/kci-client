import React from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';

function ReceiptBookDetails() {
  const params = useParams();
  const [rb, setRb] = React.useState(null);

  React.useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(`/loansapi/receipt_book/${params.rbId}`);
      setRb(response.data);
    }
    fetch();
  }, []);

  if (!rb) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <div className='search_background' style={{padding:'20px'}}>
        <div>
          <div style={{display:'flex', justifyContent:'space-between'}}>
            <>
              <button className='btn btn-olive'>
                <Link to={`/users/admin/manageexps/update-receipt-book/${rb.id}`}>
                  Edit
                </Link>
              </button>
              <button className='btn btn-olive'>
                <Link to={`/users/admin/manageexps/delete-receipt-book/${rb.id}`}>
                  Delete
                </Link>
              </button>
            </>
          </div>
        </div>
        <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', marginTop:'1.5rem'}}>
          <div>
            <ul style={{display:'flex', flexDirection:'column', rowGap:'10px'}}>
              <li>Name: {rb.name}</li>
              <li>Date Created: {rb.date_created}</li>
              <li>Prefix: {rb.prefix}</li>
              <li>Start Number: {rb.start_number}</li>
              <li>End Number: {rb.end_number}</li>
              <li>Next Number: {rb.next_number}</li>
              <li>Is Active: {rb.is_active ? 'Yes' : 'No'}</li>
              <li>Receipt Book Type: {{1: 'Receipt Book', 2: 'Voucher Book'}[rb.receipt_book_type]}</li>
              <li>Mode: {{1: 'Auto', 2: 'Manual'}[rb.mode]}</li>
              <li>
                Applications: {rb.allowed_apps.map(app => ({1: 'Loans', 2: 'Payments', 3: 'Expenses'}[app])).join(', ')}
              </li>
              <li>Created By: {rb.created_by.name}</li>
              <li>Currency: {rb.currency.name}</li>
              <li>Branch: {rb.branch.name}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ReceiptBookDetails;