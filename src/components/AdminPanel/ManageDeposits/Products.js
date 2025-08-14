import React from 'react';
import Filter from './Filter';
import { Link } from 'react-router-dom';

function Products() {
    const [products, setProducts] = React.useState([]);

    return (
        <>
            <div style={{margin:'20px 0'}}>
                <button type='button' className='btn btn-success'>
                    <Link to='/users/admin/managedeposits/add_deposit_product'>Add Deposit Product</Link>
                </button>
            </div>
            <Filter setProducts={setProducts} />
            <div style={{paddingTop: '2rem'}}></div>
            <div className='table-responsive font-12'>
                <table className='table table-hover'>
                    <tbody>
                        <tr className='journal-details header'>
                            <th>Name</th>
                            <th>Interest_Term</th>
                            <th>Interest_Method</th>
                        </tr>  
                        {products.map((product) => (
                            <tr className='table-row' key={product.id}>
                                <td>{product.name}</td>
                                <td>{product.interest_term}</td>
                                <td>{product.interest_method}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default Products