import React, {useState, useRef} from 'react';
import { NavLink, useParams } from 'react-router-dom';
import DeleteModal from './DeleteModal';
import { makeRequest } from '../../utils/utils';

const Expense = (props) => {

    const [detailsDiv, sedivetailsDiv] = useState(false);
    const showDetailsDiv = () => {sedivetailsDiv(!detailsDiv);}
    
    const [openModal, setOpenmodal] = useState(false);
    const showOpenModal = () => setOpenmodal(!openModal);

    const deleteExpense = async () => {
		const response = await makeRequest.delete(`/expensesapi/delete_expense/${props.expense.id}/`, {timeout:8000})
        if (response.ok){
            props.setExpenses(curr => curr.filter(expense => expense.id != props.expense.id))
        }
	}

    return (
        <>
            <div style={{display:"flex", flexDirection:"row", width:"100%"}}>
                <div className="border__bottom" style={{display:"flex", justifyContent:"space-between", flexDirection:"row", padding:"1rem 1.5rem", width:"83.33%", cursor:"pointer"}} key={props.expense.id} onClick={showDetailsDiv}>
                    <div style={{width:"16.66%", textAlign:"center"}}>{props.expense.expense_type}</div>
                    <div style={{width:"16.66%", textAlign:"center"}}>{props.expense.expense_name}</div>
                    <div style={{width:"16.67%", textAlign:"center"}}>{props.expense.expense_date}</div>
                    <div style={{width:"16.67%", textAlign:"center"}}>{props.expense.date_created}</div>
                    <div style={{width:"16.67%", textAlign:"center"}}>{props.expense.currency} {props.expense.expense_amount}</div>
                </div>
                <div className="border__bottom" style={{display:"flex",justifyContent:"center", flexDirection:"row", padding:"1rem 1.5rem", width:"16.67%", textAlign:"center", marginRight:"1rem"}}>
                    <span className="delete" onClick={showOpenModal}>delete</span>
                </div>
            </div>
            {openModal && <DeleteModal closeModal={setOpenmodal} expense={props.expense.expense_name} deleteExpense={deleteExpense}/>}
            {detailsDiv && 
            <div>
                <div>
                    <div className="font-13" style={{padding:"1.5rem", display:"flex", justifyContent:"space-around", flexDirection:"row"}}>
                        <div>
                            <div>Expense Name: {props.expense.expense_name}</div>
                            <div>Expense Type: {props.expense.expense_type}</div>
                            <div>Expense Amount: {props.expense.currency} {props.expense.expense_amount}</div>
                        </div>
                        <div>
                            <div>Reference: {props.expense.reference}</div> 
                            <div>Date Created: {props.expense.date_created}</div>
                            <div>Created By: {props.expense.created_by}</div>
                        </div>
                        <div>
                            <div>Expense Date: {props.expense.expense_date}</div>
                            <div>Description: {props.expense.description}</div>
                        </div>
                    </div>
                </div>
            </div>
            }
        </>
    );
}

export default Expense;