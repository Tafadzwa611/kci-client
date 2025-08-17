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
    const [modal, setModal] = React.useState(Modal.NONE);
    const params = useParams();

    React.useEffect(() => {
        async function fetch() {
            const CONFIG = {headers: {'X-CSRFToken': Cookies.get('csrftoken'), 'Accept': 'application/json', 'Content-Type': 'application/json'}};
            const response = await axios.get(`/deposits/${params.productId}/`, CONFIG);
            setProduct(response.data);
        }
        fetch();
    }, []);

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
                            <li>Product Name: {product.name}</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Detail;