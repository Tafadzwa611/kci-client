import React, {useState, useRef} from 'react';
import { NavLink, useParams } from 'react-router-dom';
import DeleteModal from './DeleteModal';
import { makeRequest } from '../../utils/utils';

const OtherIncome = (props) => {

    const [detailsDiv, sedivetailsDiv] = useState(false);
    const showDetailsDiv = () => {sedivetailsDiv(!detailsDiv);}
    
    const [openModal, setOpenmodal] = useState(false);
    const showOpenModal = () => setOpenmodal(!openModal);

    const deleteOtherIncome = async () => {
		const response = await makeRequest.delete(`/otherincomeapi/delete_otherincome/${props.other.id}/`, {timeout:8000})
        if (response.ok){
            props.setOtherIncomes(curr => curr.filter(other => other.id != props.other.id))
        }
	}

    return (
        <>
            <div style={{display:"flex", flexDirection:"row", width:"100%"}}>
                <div className="border__bottom" style={{display:"flex", justifyContent:"space-between", flexDirection:"row", padding:"1rem 1.5rem", width:"83.33%", cursor:"pointer"}} key={props.other.id} onClick={showDetailsDiv}>
                    <div style={{width:"16.66%", textAlign:"center"}}>{props.other.income_type}</div>
                    <div style={{width:"16.66%", textAlign:"center"}}>{props.other.otherincome_name}</div>
                    <div style={{width:"16.67%", textAlign:"center"}}>{props.other.income_date}</div>
                    <div style={{width:"16.67%", textAlign:"center"}}>{props.other.date_created}</div>
                    <div style={{width:"16.67%", textAlign:"center"}}>{props.other.currency} {props.other.income_amount}</div>
                </div>
                <div className="border__bottom" style={{display:"flex",justifyContent:"center", flexDirection:"row", padding:"1rem 1.5rem", width:"16.67%", textAlign:"center", marginRight:"1rem"}}>
                    <span className="delete" onClick={showOpenModal}>delete</span>
                </div>
            </div>
            {openModal && <DeleteModal closeModal={setOpenmodal} income={props.other.otherincome_name} deleteOtherIncome={deleteOtherIncome}/>}
            {detailsDiv && 
            <div>
                <div>
                    <div className="font-13" style={{padding:"1.5rem", display:"flex", justifyContent:"space-around", flexDirection:"row"}}>
                        <div>
                            <div>Other Income Name: {props.other.otherincome_name}</div>
                            <div>Other Income Type: {props.other.income_type}</div>
                            <div>Other Income Amount: {props.other.currency} {props.other.income_amount}</div>
                        </div>
                        <div>
                            <div>Reference: {props.other.reference}</div> 
                            <div>Date Created: {props.other.date_created}</div>
                            <div>Created By: {props.other.created_by}</div>
                        </div>
                        <div>
                            <div>Other Income Date: {props.other.income_date}</div>
                            <div>Description: {props.other.description}</div>
                        </div>
                    </div>
                </div>
            </div>
            }
        </>
    );
}

export default OtherIncome;