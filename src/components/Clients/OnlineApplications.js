import React from 'react';
import Application from './Application';

const OnlineApplication = () => {

    var applications = [
        {full_name:'Tafadzwa Kuno', ec_number:'0987898H', amount:'100', phone_number:'0776837662', address:'3887 Chesvingo Drive', date_added:'07/12/21', gender:'Male' , status:'Approved', id:'1'},
        {full_name:'Tatenda Gudyanga', ec_number:'0987898H', amount:'100', phone_number:'0776837662', address:'3887 Chesvingo Drive', date_added:'07/12/21', gender:'Male' , status:'Approved', id:'2'},
        {full_name:'Victor Kuno', ec_number:'0987898H', amount:'100', phone_number:'0776837662', address:'3887 Chesvingo Drive', date_added:'07/12/21', gender:'Male' , status:'Approved', id:'3'},
        {full_name:'Tavonga Gudyanga', ec_number:'0987898H', amount:'100', phone_number:'0776837662', address:'3887 Chesvingo Drive', date_added:'07/12/21', gender:'Male' , status:'Rejected', id:'4'},
        {full_name:'Lawful Gudyanga', ec_number:'0987898H', amount:'100', phone_number:'0776837662', address:'3887 Chesvingo Drive', date_added:'07/12/21', gender:'Male' , status:'Rejected', id:'5'},
        {full_name:'James Chisada', ec_number:'0987898H', amount:'100', phone_number:'0776837662', address:'3887 Chesvingo Drive', date_added:'07/12/21', gender:'Male' , status:'Rejected', id:'6'},
        {full_name:'Tawanda mangwarira', ec_number:'0987898H', amount:'100', phone_number:'0776837662', address:'3887 Chesvingo Drive', date_added:'07/12/21', gender:'Male' , status:'Approved', id:'7'},
        {full_name:'Nyasha Hope', ec_number:'0987898H', amount:'100', phone_number:'0776837662', address:'3887 Chesvingo Drive', date_added:'07/12/21', gender:'Male' , status:'Approved', id:'8'},
        {full_name:'Joseph Mazambara', ec_number:'0987898H', amount:'100', phone_number:'0776837662', address:'3887 Chesvingo Drive', date_added:'07/12/21', gender:'Male' , status:'Approved', id:'9'},
        {full_name:'Divine Chikukutu', ec_number:'0987898H', amount:'100', phone_number:'0776837662', address:'3887 Chesvingo Drive', date_added:'07/12/21', gender:'Male' , status:'Approved', id:'10'},
        // {full_name:'Tadiwa Majoko', ec_number:'0987898H', amount:'100', phone_number:'0776837662', address:'3887 Chesvingo Drive', date_added:'07/12/21', gender:'Male' , status:'Approved', id:'11'},
        // {full_name:'Nomsa Chipise', ec_number:'0987898H', amount:'100', phone_number:'0776837662', address:'3887 Chesvingo Drive', date_added:'07/12/21', gender:'Male' , status:'Approved', id:'12'},
        // {full_name:'Tatenda Kuno', ec_number:'0987898H', amount:'100', phone_number:'0776837662', address:'3887 Chesvingo Drive', date_added:'07/12/21', gender:'Male' , status:'Approved', id:'13'},
        // {full_name:'Grace Mabunu', ec_number:'0987898H', amount:'100', phone_number:'0776837662', address:'3887 Chesvingo Drive', date_added:'07/12/21', gender:'Male' , status:'Approved', id:'14'},
        // {full_name:'Steve Harvey', ec_number:'0987898H', amount:'100', phone_number:'0776837662', address:'3887 Chesvingo Drive', date_added:'07/12/21', gender:'Male' , status:'Approved', id:'15'},
        // {full_name:'Michael Ballack', ec_number:'0987898H', amount:'100', phone_number:'0776837662', address:'3887 Chesvingo Drive', date_added:'07/12/21', gender:'Male' , status:'Approved', id:'16'}
    ];

    return (
        <div className='table-responsive font-12'>
            <table className='table table-centered table-hover'>
                <thead className="thead-light">
                    <tr>
                        <th style={{textAlign:"start"}}>Full Name</th>
                        <th style={{textAlign:"start"}}>EC Number</th>
                        <th style={{textAlign:"start"}}>Amount</th>
                        <th style={{textAlign:"start"}}>Contact</th>
                        <th style={{textAlign:"start"}}>Work Address</th>
                        <th style={{textAlign:"start"}}>Date Added</th>
                        <th style={{textAlign:"start"}}>Gender</th>
                        <th style={{textAlign:"start"}}>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {applications.map(application => (
                        <Application 
                            key={application.id} 
                            full_name={application.full_name}
                            ec_number={application.ec_number} 
                            amount={application.amount}
                            phone_number={application.phone_number}
                            address={application.address}
                            date_added={application.date_added} 
                            gender={application.gender}
                            status={application.status}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default OnlineApplication;