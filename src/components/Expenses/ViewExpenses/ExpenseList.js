import React from 'react';
import DeleteModal from './DeleteModal';
import { makeRequest } from '../../../utils/utils';

const ExpenseList = ({
    expenses,
    setExpenses,
    details,
    setDetails,
    selectedexp,
    setSelectedExpID,
    selectedExpID,
}) => {

    const [openModal, setOpenmodal] = React.useState(false);
    const [deleteexpense, setDeleteExpense] = React.useState(null)

    const handleClick = (e) => {
        if (e.target.id == "delete"){
            setDeleteExpense(e.target.attributes.value.value)
            setOpenmodal(true)
        }else{
            setSelectedExpID(e.target.id)
            if (e.target.id != selectedExpID){
                setDetails(true)
            }else{
                setDetails(curr => !curr)
            }
        }
    }

    const deleteExpense = async () => {
		const response = await makeRequest.delete(`/expensesapi/delete_expense/${deleteexpense}/`, {timeout:8000})
        if (response.ok){
            setExpenses(curr => curr.filter(expense => expense.id != deleteexpense))
            setOpenmodal(false)
        }
	}

    return (
        <div style={details ? {display:"grid", gridTemplateColumns:"1fr 2fr", columnGap:"1rem"} : {display:"block"}}>
            <div style={{padding:"0", border:"none"}}>
                <div style={{width:"100%", overflowX:"auto"}}>
                    <div className="table__height">
                        <table className="table">
                            <thead>
                                {details ?
                                    <tr className="journal-details header" style={{position:"sticky", top:"0"}}>
                                        <th style={{textAlign:"start"}}>Expense_Type</th>
                                        <th style={{textAlign:"start"}}>Expense_Name</th>
                                    </tr>:
                                    <tr className="journal-details header" style={{position:"sticky", top:"0"}}>
                                        <th style={{textAlign:"start"}}>Expense_Type</th>
                                        <th style={{textAlign:"start"}}>Expense_Name</th>
                                        <th style={{textAlign:"start"}}>Expense_Date</th>
                                        <th style={{textAlign:"start"}}>Date_Created</th>
                                        <th style={{textAlign:"start"}}>Expense_Amount</th>
                                        <th style={{textAlign:"start"}}>Action</th>
                                    </tr>
                                }
                            </thead>
                            <tbody>
                                {expenses.map(expense => {
                                    if (details) {
                                        if (selectedexp.id == expense.id) {
                                            return (
                                                <tr key={expense.id}>
                                                    <td style={{verticalAlign:"middle"}}>{expense.expense_type}</td>
                                                    <td style={{verticalAlign:"middle"}}><span onClick={handleClick} id={expense.id} style={{color:"red", fontSize:"0.75rem", cursor:"pointer"}} className="link">{expense.expense_name}</span></td>
                                                </tr>
                                            )
                                        }else{
                                            return (
                                                <tr key={expense.id}>
                                                    <td style={{verticalAlign:"middle"}}>{expense.expense_type}</td>
                                                    <td style={{verticalAlign:"middle"}}><span onClick={handleClick} id={expense.id} style={{fontSize:"0.75rem", cursor:"pointer"}} className="link">{expense.expense_name}</span></td>
                                                </tr>
                                            )
                                        }
                                    }else { 
                                        return (
                                            <tr key={expense.id}>
                                                <td style={{verticalAlign:"middle"}}>{expense.expense_type}</td>
                                                <td style={{verticalAlign:"middle"}}><span onClick={handleClick} id={expense.id} style={{fontSize:"0.75rem", cursor:"pointer"}} className="link">{expense.expense_name}</span></td>
                                                <td style={{verticalAlign:"middle"}}>{expense.expense_date}</td>
                                                <td style={{verticalAlign:"middle"}}>{expense.date_created}</td>
                                                <td style={{verticalAlign:"middle"}}>{expense.currency} {expense.expense_amount}</td>
                                                <td style={{verticalAlign:"middle"}}><span className="delete" id="delete" value={expense.id} onClick={handleClick}>delete</span></td>
                                            </tr>
                                        )
                                    }
                                })}
                                
                            </tbody>
                        </table>
                        {openModal && <DeleteModal closeModal={setOpenmodal} deleteExpense={deleteExpense}/>}
                    </div>
                </div>
            </div>
            {details && (
                <div style={{position:"sticky", top:"0", width:"100%"}}>
                    <div className="j-details-container" style={{padding:"1.5rem"}}>

                        <div className="row" style={{marginBottom:"1.5rem", marginTop:"0"}}>
                            <div className="col-12" style={{display:"flex", justifyContent:"flex-end"}}>
                                <button><a onClick={e => setDetails(false)} className="btn btn-default" style={{borderRadius:"0"}}>Close</a></button>
                            </div>
                        </div>
                        <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
                            <div style={{width:"30%"}}>
                                <ul>
                                    <li>Expense Name: {selectedexp.expense_name}</li>
                                    <li>Expense Type: {selectedexp.expense_type}</li>
                                    <li>Expense Amount: {selectedexp.currency} {selectedexp.expense_amount}</li>
                                </ul>
                            </div>
                            <div style={{width:"30%", display:"flex", alignItems:"start", justifyContent:"center"}}>
                                <ul>
                                    <li>Reference: {selectedexp.reference}</li>
                                    <li>Date Created: {selectedexp.date_created}</li>
                                    <li>Created By: {selectedexp.created_by}</li>
                                </ul>
                            </div>
                            <div style={{width:"30%", display:"flex", alignItems:"start", justifyContent:"end"}}>
                                <ul>
                                    <li>Expense Date: {selectedexp.expense_date}</li>
                                    <li>Description: {selectedexp.description}</li>
                                </ul>
                            </div>
                        </div>

                    </div>
                </div>
            )}
        </div>
    );
}

export default ExpenseList;


// import React from 'react';
// import { useVirtual, Table } from "@af-utils/react-table";

// const columns = [
//   {key: "Expense_Type"},
//   {key: "Expense_Name"},
//   {key: "Expense_Date"},
//   {key: "Date_Created"},
//   {key: "Expense_Amount"},
// ];

// const ExpenseList = ({expenses, setSelectedExpID}) => {

//   const model = useVirtual({
//       itemCount: expenses.length
//   });

//   const getRowData = i => {
//     const expense = expenses[i];
//     console.log(expense)
//     return {
//         "Expense_Type": expense.expense_type,
//         "Expense_Name": expense.expense_name,
//         "Expense_Date": expense.expense_date,
//         "Date_Created": expense.date_created,
//         "Expense_Amount": expense.expense_amount,
//     }
//   }

//   return (
//     <div className="text-light view__payments" style={{paddingTop:"2rem"}}>
//       <Table
//         model={model}
//         className="h-full basic-table-container"
//         getRowData={getRowData}
//         columns={columns}
//       />
//     </div>
//   );
// };

// export default ExpenseList;

