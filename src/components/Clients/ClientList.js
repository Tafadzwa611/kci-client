import React from 'react';
import Client from './Client';

const ClientList = () => {

    var clients = [
        {full_name:'Tafadzwa Kuno',  client_number:'Main-20224111221-34b12', type_of_client:'Individual', phone_number:'0776837662', gender:'Male', registration_date:'07/12/21', date_of_birth:'09 March 1976 (46 years)', branch:'Main Branch', id:'1'},
        {full_name:'Tatenda Gudyanga',  client_number:'Main-20224111221-34b12', type_of_client:'Individual', phone_number:'0776837662', gender:'Male', registration_date:'07/12/21', date_of_birth:'09 March 1976 (46 years)', branch:'Main Branch', id:'2'},
        {full_name:'Victor Kuno',  client_number:'Main-20224111221-34b12', type_of_client:'Individual', phone_number:'0776837662', gender:'Male', registration_date:'07/12/21', date_of_birth:'09 March 1976 (46 years)', branch:'Main Branch', id:'3'},
        {full_name:'Tavonga Gudyanga',  client_number:'Main-20224111221-34b12', type_of_client:'Individual', phone_number:'0776837662', gender:'Female', registration_date:'07/12/21', date_of_birth:'09 March 1976 (46 years)', branch:'Main Branch', id:'4'},
        {full_name:'Lawful Gudyanga',  client_number:'Main-20224111221-34b12', type_of_client:'Individual', phone_number:'0776837662', gender:'Male', registration_date:'07/12/21', date_of_birth:'09 March 1976 (46 years)', branch:'Main Branch', id:'5'},
        {full_name:'James Chisada',  client_number:'Main-20224111221-34b12', type_of_client:'Individual', phone_number:'0776837662', gender:'Male', registration_date:'07/12/21', date_of_birth:'09 March 1976 (46 years)', branch:'Main Branch', id:'6'},
        {full_name:'Tawanda mangwarira',  client_number:'Main-20224111221-34b12', type_of_client:'Individual', phone_number:'0776837662', gender:'Male', registration_date:'07/12/21', date_of_birth:'09 March 1976 (46 years)', branch:'Main Branch', id:'7'},
        {full_name:'Nyasha Hope',  client_number:'Main-20224111221-34b12', type_of_client:'Individual', phone_number:'0776837662', gender:'Male', registration_date:'07/12/21', date_of_birth:'09 March 1976 (46 years)', branch:'Main Branch', id:'8'},
        {full_name:'Joseph Mazambara',  client_number:'Main-20224111221-34b12', type_of_client:'Individual', phone_number:'0776837662', gender:'Male', registration_date:'07/12/21', date_of_birth:'09 March 1976 (46 years)', branch:'Main Branch', id:'9'},
        {full_name:'Divine Chikukutu',  client_number:'Main-20224111221-34b12', type_of_client:'Individual', phone_number:'0776837662', gender:'Male', registration_date:'07/12/21', date_of_birth:'09 March 1976 (46 years)', branch:'Main Branch', id:'10'},
    ];

    return (
        <div className='table-responsive font-12'>
            <table className='table table-centered table-hover'>
                <thead className="thead-light">
                    <tr>
                        <th style={{textAlign:"start"}}>Client_Number</th>
                        <th style={{textAlign:"start"}}>Full_Name</th>
                        <th style={{textAlign:"start"}}>Type_Of_client</th>
                        <th style={{textAlign:"start"}}>Contact</th>
                        <th style={{textAlign:"start"}}>Gender</th>
                        <th style={{textAlign:"start"}}>Registration_Date</th>
                        <th style={{textAlign:"start"}}>Date_Of_Birth</th>
                        <th style={{textAlign:"start"}}>Branch</th>
                    </tr>
                </thead>
                <tbody>
                    {clients.map(client => (
                        <Client 
                            key={client.id} 
                            client_number={client.client_number}
                            full_name={client.full_name}
                            type_of_client={client.type_of_client} 
                            phone_number={client.phone_number}
                            gender={client.gender}
                            registration_date={client.registration_date} 
                            date_of_birth={client.date_of_birth}
                            branch={client.branch}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ClientList;