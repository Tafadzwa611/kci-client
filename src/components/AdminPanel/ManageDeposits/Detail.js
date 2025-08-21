import React from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import ToggleActivation from './ToggleActivation';

const Tabs = Object.freeze({
    DETAILS: "DETAILS",
    FEES: "FEES",
    ACCOUNTING: "ACCOUNTING"
});

export const Modal = Object.freeze({
  NONE: "NONE",
  ACTIVE: "ACTIVE",
});

function Detail() {
    const [tab, setTab] = React.useState(Tabs.DETAILS);
    const [product, setProduct] = React.useState(null);
    const [error, setError] = React.useState(null);
    const [modal, setModal] = React.useState(Modal.NONE);
    const params = useParams();

    React.useEffect(() => {
        async function fetch() {
            const CONFIG = {headers: {'X-CSRFToken': Cookies.get('csrftoken'), 'Accept': 'application/json', 'Content-Type': 'application/json'}};
            try {
                await axios.get(`/deposits/${params.productId}/`, CONFIG);
                setProduct(response.data);
            } catch (error) {
                if (error.response) {
                    setError(error.response.data.detail);
                    return;
                }
                console.error("An error occurred while fetching the product:", error);
            }
            const response = await axios.get(`/deposits/${params.productId}/`, CONFIG);
            console.log(response.status);
            console.log(response.data);
        }
        fetch();
    }, []);

    if (error) {
        return <div className="alert alert-danger">{error}</div>;
    }

    if (!product) {
        return <div>Loading...</div>
    }

    return (
        <>
            {modal === Modal.ACTIVE && (
                <ToggleActivation product={product} setProduct={setProduct} setOpen={setModal}/>
            )}
            <div style={{position:"sticky", top:"0", width:"100%"}}>
                <div style={{display:"flex", flexDirection:"column", padding:"1.5rem"}} className="j-details-container">
                    <div className="row" style={{marginBottom:"1.5rem", marginTop:"0"}}>
                        <div className="col-12" style={{display:"flex", justifyContent:"space-between"}}>
                            <div style={{display:"flex", columnGap: "5px"}}>
                                <button className="btn btn-olive" type="button">
                                    <Link to={`/users/admin/deposits/update/${params.productId}`}>Edit</Link>
                                </button>
                                {product.active ? (
                                    <button className="btn btn-olive" onClick={() => setModal(Modal.ACTIVE)}>Deactivate</button>
                                ) : (
                                    <button className="btn btn-olive" onClick={() => setModal(Modal.ACTIVE)}>Activate</button>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className='bloc-tabs'>
                        <button className={tab === Tabs.DETAILS ? 'tabs-client active-tabs' : 'tabs-client'} onClick={() => setTab(Tabs.DETAILS)}>Product Information</button>
                        <button className={tab === Tabs.FEES ? 'tabs-client active-tabs' : 'tabs-client'} onClick={() => setTab(Tabs.FEES)}>Fees</button>
                        <button className={tab === Tabs.ACCOUNTING ? 'tabs-client active-tabs' : 'tabs-client'} onClick={() => setTab(Tabs.ACCOUNTING)}>Accounting Rules</button>
                    </div>
                    {{
                        [Tabs.DETAILS]: <Information product={product}/>,
                        [Tabs.FEES]: <Fees product={product}/>,
                        [Tabs.ACCOUNTING]: <AccountingRules product={product}/>,
                    }[tab]}
                </div>
            </div>
        </>
    )
}

const Information = ({ product }) => {
    return (
        <div style={{display:"flex", columnGap:"1%"}}>
            <div style={{width:"74%"}}>
                <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between", marginBottom: '2rem'}}>
                    <div style={{width:"33%"}}>
                        <ul style={{paddingRight:"1rem"}}>
                            <li style={{marginBottom: '1rem'}}><b>Product Information</b></li>
                            <li>Product Name: {product.name}</li>
                            {product.active ? (
                                <li>Status: <span className="badge badge-success">Active</span></li>
                            ): (
                                <li>Status: <span className="badge badge-danger">Inactive</span></li>
                            )}
                            <li>Interest Term: {product.interest_term}</li>
                            <li>Interest Method: {product.interest_method}</li>
                            <li>Interest Posting Frequency: {product.interest_posting_frequency}</li>
                            <li>Fixed Interest Rate: {product.fixed_interest_rate}</li>
                            <li>Created By: {product.created_by.username}</li>
                            <li>Date Created: {product.date_created}</li>
                            <li>Last Updated: {product.last_updated}</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

const Fees = ({product}) => {
    return (
        <div className="miniLoanDetails-container" style={{padding:'1.5rem'}}>
            <table className="table">
                <tbody>
                    <tr className="journal-details header client__details">
                        <th>Name</th>
                        <th>Fee_Calculation</th>
                        <th>Fee_Type</th>
                        <th>Value</th>
                    </tr>
                    {product.fees.map((fee, idx) => {
                        return (
                            <tr key={idx}>
                                <td>{fee.name}</td>
                                <td>{fee.fee_calculation}</td>
                                <td>{fee.fee_type}</td>
                                <td>{fee.amount}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

function formatKey(key) {
    return key
    .split("_")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

const AccountingRules = ({product}) => {
    const rows = Object.entries(product.accounts);
    return (
        <div className="miniLoanDetails-container" style={{padding:'1.5rem'}}>
            <table className="table">
                <tbody>
                    <tr className="journal-details header client__details">
                        <th>Account_Type</th>
                        <th>Account_Code</th>
                        <th>Account_Name</th>
                    </tr>
                    {rows.map(([key, { name, code }]) => {
                        return (
                            <tr key={key}>
                                <td>{formatKey(key)}</td>
                                <td>{code}</td>
                                <td>{name}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default Detail;