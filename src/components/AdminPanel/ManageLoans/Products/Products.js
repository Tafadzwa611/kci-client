import React, { useState, useEffect, useRef } from 'react';
import { makeRequest } from '../../../../utils/utils';
import MiniLoader from '../../../Loader/MiniLoader';


const Products = () => {

    const [products, setProducts] = useState([])
    const [nextPageNumber, setNextPageNumber] = useState(null);
    const [totalCount, setTotalCount] = useState(0);
    const [loadingMore, setLoadingMore] = useState(false);
    const [open, setOpen] = useState(false);
    const [searching, setSearching] = useState(false);
    const [details, setDetails] = useState(false)
    const [selectedPrdctID, setSelectedPrdctID] = useState(null)
    const [branches, setBranches] = useState(null);
    const [branchIds, setBranchIds] = useState(null);
    // const [selectedprd, setSelectedPrd] = useState(null);


    const pageNum = useRef(1);

    useEffect(() => {
        getProducts();
    }, []);

    useEffect(() => {
        getBranches();
    }, []);

    const getProducts = async () => {
        const data = await fetchProducts();
        console.log(data)
        setProducts(data.loan_products);
        setTotalCount(data.count);
    };

    async function fetchProducts() {
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

    const getBranches = async () => {
        const branches = await fetchBranches();
        setBranches(branches);
    };

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

        let url = `/loansapi/loan_products_list/?page_num=${pageNum.current}`;
        if (branchIds !== null) {
            branchIds.forEach(id => (url += `&branch_ids=${id}`));
        }
        return url
    }

    const loadMore = async (evt) => {
        evt.preventDefault();
        setLoadingMore(true);
        pageNum.current += 1;
        const data = await fetchProducts();
        setProducts(curr => [...curr,...data.loan_products]);
    }

    const handleClick = (e) => {
        setSelectedPrdctID(e.target.id)
        if (e.target.id != selectedPrdctID){
            setDetails(true)
        }else{
            setDetails(curr => !curr)
        }
    }

    const selectedprd = products.find(prd => prd.id == selectedPrdctID)


    console.log(products.find(prd => prd.id == selectedPrdctID))

    if ( branches === null || products === null ) {
        return <MiniLoader />
    }
    return (
        <>
            {/* <CreateCurrencyModal open={open} setOpen={setOpen} setCurrencies={setCurrencies} /> */}
            {/* <div style={{margin:"20px 0"}}>
                <button type='button' className='btn btn-success' onClick={(e) => setOpen(curr => !curr)}>Add Staff</button>
            </div> */}
            <div style={{padding:"0", border:"none"}} className={details ? 'table-container journal__table font-12' :'table-container full__width font-12'}>
                <div className={details ? "table-responsive journal__table-container" : "table-responsive full__table"} >
                    <div className="table__height">
                        <table className="table">
                            <tbody>
                                {details ?
                                    <tr className="journal-details header">
                                        <th>Name</th>
                                        <th>Loan_Product_#</th>
                                    </tr>:
                                    <tr className="journal-details header">
                                        <th>Name</th>
                                        <th>Loan_Product_#</th>
                                        <th>Interest_Rate</th>
                                        <th>Interest_Method</th>
                                        <th>Currency</th>
                                        <th>Date_Created</th>
                                        <th>Action</th>
                                    </tr>  
                                }
                                {products.map(product => {
                                    if (details) {
                                        if (selectedprd.id == product.id) {
                                            return (
                                                <tr key={product.id}>
                                                    <td>{product.name}</td>
                                                    <td><span onClick={handleClick} id={product.id} style={{color:"red", fontSize:"0.75rem", cursor:"pointer"}} className="link">{product.loan_product_id}</span></td>
                                                </tr>
                                            )
                                        }else{
                                            return (
                                                <tr key={product.id}>
                                                    <td>{product.name}</td>
                                                    <td><span onClick={handleClick} id={product.id} style={{fontSize:"0.75rem", cursor:"pointer"}} className="link">{product.loan_product_id}</span></td>
                                                </tr>
                                            )
                                        }
                                    }else { 
                                        return (
                                            <tr key={product.id}>
                                                <td>{product.name}</td>
                                                <td><span onClick={handleClick} id={product.id} style={{fontSize:"0.75rem", cursor:"pointer"}} className="link">{product.loan_product_id}</span></td>
                                                <td>{product.interest_rate}</td>
                                                <td>{product.interest_method}</td>
                                                <td>{product.currency}</td>
                                                <td>{product.date_created}</td>
                                                <td>
                                                    <div className="action-btns">
                                                        <span>Suspend</span>
                                                        <span>Edit</span>
                                                    </div>
                                                </td>
                                            </tr>
                                        )
                                    }
                                })}
                            </tbody>
                        </table>
                    </div>
                    {details && (
                        <div style={{position:"sticky", top:"0", width:"100%"}}>
                            <div style={{display:"flex", flexDirection:"column", padding:"1.5rem"}} className="j-details-container">

                                <div className="row" style={{marginBottom:"1.5rem", marginTop:"0"}}>
                                    <div className="col-12" style={{display:"flex", justifyContent:"flex-end"}}>
                                        <button><a onClick={e => setDetails(false)} className="btn btn-default" style={{borderRadius:"0"}}>Close</a></button>
                                    </div>
                                </div>
                                <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
                                    <div style={{width:"30%"}}>
                                        <ul>
                                            <li>Product Name: {selectedprd.name}</li>
                                            <li>Product ID: {selectedprd.loan_product_id}</li>
                                            <li>Product Type: {selectedprd.product_category}</li>
                                            <li>Product Currency: {selectedprd.currency}</li>
                                            <li>Principal Range: {selectedprd.minimum_principal_amount} - {selectedprd.maximum_principal_amount}</li>
                                        </ul>
                                    </div>
                                    <div style={{width:"30%", display:"flex", alignItems:"start", justifyContent:"center"}}>
                                        <ul>
                                            <li>Interest Rate: {selectedprd.interest_rate}</li>
                                            <li>Interest Interval: {selectedprd.interest_interval}</li>
                                            <li>Loan Duration Time Unit: {selectedprd.loan_duration_time_unit}</li>
                                            <li>Disbursements Methods: {selectedprd.disbursement_method}</li>
                                            <li>Product Duration Range: {selectedprd.minimum_loan_duration} - {selectedprd.maximum_loan_duration}</li>
                                        </ul>
                                    </div>
                                    <div style={{width:"30%", display:"flex", alignItems:"start", justifyContent:"end"}}>
                                        <ul>
                                            <li>Interest Method: {selectedprd.interest_method}</li>
                                            <li>Grace Period: {selectedprd.grace_period}</li>
                                            <li>Payment Allocation Method: {selectedprd.payment_allocation_method}</li>
                                            <li>Date Created: {selectedprd.date_created}</li>
                                            <li>Created By: {selectedprd.created_by}</li>
                                        </ul>
                                    </div>
                                </div>

                            </div>
                        </div>
                    )}
                </div>
            </div>
            {nextPageNumber === null ?
                <div className="all-data-loaded text-light" style={{padding:"1rem 0"}}>
                    <i className="uil uil-exclamation-triangle"></i> 
                    <span>All products have been loaded</span>
                </div> :
                <div className="load-more-container card-body view_expenses text-light">
                    <p className="load-more-container-left">
                        Showing {products.length} of {totalCount} products.
                    </p>
                    {loadingMore ? 
                        <button className="btn btn-info" style={{opacity:"0.7", cursor:"none"}}>Please wait...</button>:
                        <button className="btn btn-info" onClick={loadMore}>Load More</button>
                    }
                </div>
            }
        </>
    )
}

export default Products;