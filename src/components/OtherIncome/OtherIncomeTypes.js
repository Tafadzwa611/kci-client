import React, {useState, useEffect} from 'react';
import { NavLink } from 'react-router-dom';
import { makeRequest } from '../../utils/utils';
import BankNamesSkeleton from '../Skeletons/Charts/BankNamesSkeleton';
import CreateOtherIncomeTypeModal from './CreateOtherIncomeTypeModal';


const OtherIncomeTypes = () => {

    const [otherincomeTypes, setOtherIncomeTypes] = useState([])
    const [open, setOpen] = useState(false);

    useEffect(() => {
        getOtherIncomeTypes()
    }, []);

    const getOtherIncomeTypes = async () => {
        window.scrollTo(0, 0);
        document.title = 'Other Income Types';
        const data = await fetchOtherIncomeTypes();
        setOtherIncomeTypes(data);
    };

    async function fetchOtherIncomeTypes() {
        try {
            const response = await makeRequest.get(`/otherincomeapi/otherincometypeslist/`, {timeout: 8000});
            if (response.ok) {
                const otherincome_types = await response.json();
                return otherincome_types;
            }else {
                const error = await response.json();
                console.log(error);
            }
        }catch(error) {
            console.log(error);
        }
    }

    if (otherincomeTypes == null) {
        return <BankNamesSkeleton />;
    } 
    else {
        return (
            <div className="card font-12">
                <div className="card-body">

                    <h5 className="table-heading">Other Income Types</h5>
                    <CreateOtherIncomeTypeModal open={open} setOpen={setOpen} setOtherIncomeTypes={setOtherIncomeTypes} />
                    <div style={{margin:"20px 0"}}>
                        <button type='button' className='btn btn-success' onClick={(e) => setOpen(curr => !curr)}>Add Other Income Type</button>
                    </div>
                    <div className="table-responsive font-12">
                        <table className="table table-hover">
                            <tbody>
                                <tr className="bg-gray">
                                    <th>Name</th>
                                </tr>                      
                                {otherincomeTypes.map((otherincome_type) => (
                                    <tr className="table-row" key={otherincome_type.id}>
                                        <td>{otherincome_type.name}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                </div>
            </div>
        );
    }
}

export default OtherIncomeTypes;