import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function AuthorizationDashboard() {
  React.useEffect(() => {
    document.title = 'Authorization Dashboard';
  }, []);

  return (
    <div>
      <style>{`
        .authz-wrap {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .authz-head {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .authz-title {
          margin: 0;
          font-size: 1.35rem;
          line-height: 1.2;
          font-weight: 700;
          color: var(--app-text);
        }

        .authz-subtitle {
          margin: 0;
          font-size: 0.92rem;
          color: var(--app-muted);
        }

        .authz-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          gap: 16px;
          width: 100%;
        }

        .authz-card {
          display: flex;
          flex-direction: column;
          gap: 18px;
          min-height: 220px;
          padding: 20px;
          border-radius: 20px;
          border: 1px solid var(--app-border);
          background: var(--app-surface);
          box-shadow: var(--app-shadow);
        }

        .authz-card-loading {
          align-items: center;
          justify-content: center;
        }

        .authz-card-head {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 12px;
        }

        .authz-card-title {
          margin: 0;
          font-size: 0.98rem;
          line-height: 1.35;
          font-weight: 700;
          color: var(--app-text);
        }

        .authz-chip {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: 28px;
          padding: 0.2rem 0.65rem;
          border-radius: 999px;
          border: 1px solid var(--app-border);
          background: var(--app-surface-2);
          color: var(--app-muted);
          font-size: 0.74rem;
          font-weight: 700;
          white-space: nowrap;
        }

        .authz-count-wrap {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .authz-count {
          margin: 0;
          font-size: clamp(2rem, 3vw, 2.6rem);
          line-height: 1;
          font-weight: 800;
          letter-spacing: -0.03em;
          color: var(--app-text);
        }

        .authz-count-note {
          margin: 0;
          font-size: 0.88rem;
          color: var(--app-muted);
        }

        .authz-footer {
          margin-top: auto;
          display: flex;
          align-items: center;
        }

        .authz-link {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: 42px;
          padding: 0.72rem 1rem;
          border-radius: 12px;
          border: 1px solid var(--app-border);
          background: var(--app-surface-2);
          color: var(--app-text);
          font-weight: 600;
          text-decoration: none;
          transition: border-color 0.2s ease, transform 0.2s ease, background 0.2s ease;
        }

        .authz-link:hover {
          text-decoration: none;
          color: var(--app-text);
          border-color: var(--app-accent);
          transform: translateY(-1px);
        }

        .authz-link:focus-visible {
          outline: 2px solid var(--app-accent);
          outline-offset: 2px;
        }

        @media (max-width: 900px) {
          .authz-grid {
            grid-template-columns: 1fr;
          }

          .authz-card {
            min-height: unset;
            padding: 18px;
            border-radius: 18px;
          }

          .authz-link {
            width: 100%;
          }
        }
      `}</style>

        <div className='card ui-card'>
            <div className='card-body ui-card-body'>
                <div className='ui-page-head'>
                    <h5 className='table-heading ui-page-title'>Authorization Dashboard</h5>
                </div>

                <div className='authz-wrap'>
                    <div className='authz-grid'>
                        <PaymentApprovals />
                        <TransferApprovals />
                        <ExpenseApprovals />
                    </div>
                </div>

            </div>
        </div>
    </div>
  );
}

function PaymentApprovals() {
  const [count, setCount] = React.useState(null);

  React.useEffect(() => {
    const fetch = async () => {
      const response = await axios.get('/loansapi/payment_requests_count/');
      setCount(response.data);
    };
    fetch();
  }, []);

  if (!count) {
    return (
      <div className='authz-card authz-card-loading'>
        <div className='mini-spinner'></div>
      </div>
    );
  }

  return (
    <div className='authz-card'>
      <div className='authz-card-head'>
        <h6 className='authz-card-title'>Payment Approvals</h6>
        <span className='authz-chip'>Queue</span>
      </div>

      <div className='authz-count-wrap'>
        <p className='authz-count'>{count.count}</p>
        <p className='authz-count-note'>Pending requests</p>
      </div>

      <div className='authz-footer'>
        <Link className='authz-link' to='/payments/viewpayments/requests'>
          Go to payment requests
        </Link>
      </div>
    </div>
  );
}

function TransferApprovals() {
  const [count, setCount] = React.useState(null);

  React.useEffect(() => {
    const fetch = async () => {
      const response = await axios.get('/acc-api/transfer_requests_count/');
      setCount(response.data);
    };
    fetch();
  }, []);

  if (!count) {
    return (
      <div className='authz-card authz-card-loading'>
        <div className='mini-spinner'></div>
      </div>
    );
  }

  return (
    <div className='authz-card'>
      <div className='authz-card-head'>
        <h6 className='authz-card-title'>Transfer Approvals</h6>
        <span className='authz-chip'>Queue</span>
      </div>

      <div className='authz-count-wrap'>
        <p className='authz-count'>{count.count}</p>
        <p className='authz-count-note'>Pending requests</p>
      </div>

      <div className='authz-footer'>
        <Link className='authz-link' to='/transfers/viewtransfers/transferrequests'>
          Go to transfer requests
        </Link>
      </div>
    </div>
  );
}

function ExpenseApprovals() {
  const [count, setCount] = React.useState(null);

  React.useEffect(() => {
    const fetch = async () => {
      const response = await axios.get('/expensesapi/expense_requests_count/');
      setCount(response.data);
    };
    fetch();
  }, []);

  if (!count) {
    return (
      <div className='authz-card authz-card-loading'>
        <div className='mini-spinner'></div>
      </div>
    );
  }

  return (
    <div className='authz-card'>
      <div className='authz-card-head'>
        <h6 className='authz-card-title'>Expense Approvals</h6>
        <span className='authz-chip'>Queue</span>
      </div>

      <div className='authz-count-wrap'>
        <p className='authz-count'>{count.count}</p>
        <p className='authz-count-note'>Pending requests</p>
      </div>

      <div className='authz-footer'>
        <Link className='authz-link' to='/expenses/viewexpenses/expenserequests'>
          Go to expense requests
        </Link>
      </div>
    </div>
  );
}

export default AuthorizationDashboard;