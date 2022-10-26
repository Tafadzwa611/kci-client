import React from 'react';
// import OtherIncome from './OtherIncome';
import DeleteModal from './DeleteModal';
import { makeRequest } from '../../../utils/utils';

const OtherIncomeList = (
    {otherincomes, 
    setOtherIncomes,
    totalCount,
    details,
    setDetails,
    selectedinc,
    setSelectedIncID,
    selectedIncID,
    }) => {

    const [openModal, setOpenmodal] = React.useState(false);
    const [deleteincome, setDeleteIncome] = React.useState(null)

    const handleClick = (e) => {
        if (e.target.id == "delete"){
            setDeleteIncome(e.target.attributes.value.value)
            setOpenmodal(true)
        }else{
            setSelectedIncID(e.target.id)
            if (e.target.id != selectedIncID){
                setDetails(true)
            }else{
                setDetails(curr => !curr)
            }
        }
    }

    const deleteOtherIncome = async () => {
		const response = await makeRequest.delete(`/otherincomeapi/delete_otherincome/${deleteincome}/`, {timeout:8000})
        if (response.ok){
            setOtherIncomes(curr => curr.filter(other => other.id != deleteincome))
            setOpenmodal(false)
        }
	}

    return (
        <div style={details ? {display:"grid", gridTemplateColumns:"1fr 2fr", columnGap:"1rem", marginTop:"1.5rem"} : {display:"block", marginTop:"1.5rem"}}>
            <div style={{padding:"0", border:"none"}}>
                <div style={{width:"100%", overflowX:"auto"}}>
                    <div className="table__height">
                        <table className="table">
                            <thead>
                                {details ?
                                    <tr className="journal-details header" style={{position:"sticky", top:"0"}}>
                                        <th style={{width:"20%"}}>Other_Income_Type</th>
                                        <th style={{width:"20%"}}>Other_Income_Name</th>
                                    </tr>:
                                    <tr className="journal-details header" style={{position:"sticky", top:"0"}}>
                                        <th style={{width:"20%"}}>Other_Income_Type</th>
                                        <th style={{width:"20%"}}>Other_Income_Name</th>
                                        <th style={{width:"16.6%"}}>Other_Income_Date</th>
                                        <th style={{width:"16.6%"}}>Date_Created</th>
                                        <th style={{width:"16.6%"}}>Other_Income_Amount</th>
                                        <th style={{width:"10%"}}>Action</th>
                                    </tr>
                                }
                            </thead>
                            <tbody>
                                {otherincomes.map(other => {
                                    if (details) {
                                        if (selectedinc.id == other.id) {
                                            return (
                                                <tr key={other.id}>
                                                    <td style={{verticalAlign:"middle"}}>{other.income_type}</td>
                                                    <td style={{verticalAlign:"middle"}}><span onClick={handleClick} id={other.id} style={{color:"red", fontSize:"0.75rem", cursor:"pointer"}} className="link">{other.otherincome_name}</span></td>
                                                </tr>
                                            )
                                        }else{
                                            return (
                                                <tr key={other.id}>
                                                    <td style={{verticalAlign:"middle"}}>{other.income_type}</td>
                                                    <td style={{verticalAlign:"middle"}}><span onClick={handleClick} id={other.id} style={{fontSize:"0.75rem", cursor:"pointer"}} className="link">{other.otherincome_name}</span></td>
                                                </tr>
                                            )
                                        }
                                    }else { 
                                        return (
                                            <tr key={other.id}>
                                                <td style={{verticalAlign:"middle"}}>{other.income_type}</td>
                                                <td style={{verticalAlign:"middle"}}><span onClick={handleClick} id={other.id} style={{fontSize:"0.75rem", cursor:"pointer"}} className="link">{other.otherincome_name}</span></td>
                                                <td style={{verticalAlign:"middle"}}>{other.income_date}</td>
                                                <td style={{verticalAlign:"middle"}}>{other.date_created}</td>
                                                <td style={{verticalAlign:"middle"}}>{other.currency} {other.income_amount}</td>
                                                <td style={{verticalAlign:"middle"}}><span className="delete" id="delete" value={other.id} onClick={handleClick}>delete</span></td>
                                            </tr>
                                        )
                                    }
                                })}
                                
                            </tbody>
                        </table>
                        {openModal && <DeleteModal closeModal={setOpenmodal} deleteOtherIncome={deleteOtherIncome}/>}
                    </div>
                </div>
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
                                    <li>Other Income Name: {selectedinc.otherincome_name}</li>
                                    <li>Other Income Type: {selectedinc.income_type}</li>
                                    <li>Other Income Amount: {selectedinc.currency} {selectedinc.income_amount}</li>
                                </ul>
                            </div>
                            <div style={{width:"30%", display:"flex", alignItems:"start", justifyContent:"center"}}>
                                <ul>
                                    <li>Reference: {selectedinc.reference}</li>
                                    <li>Date Created: {selectedinc.date_created}</li>
                                    <li>Created By: {selectedinc.created_by}</li>
                                </ul>
                            </div>
                            <div style={{width:"30%", display:"flex", alignItems:"start", justifyContent:"end"}}>
                                <ul>
                                    <li>Other Income Date: {selectedinc.income_date}</li>
                                    <li>Description: {selectedinc.description}</li>
                                </ul>
                            </div>
                        </div>

                    </div>
                </div>
            )}
        </div>
    );
}

export default OtherIncomeList;