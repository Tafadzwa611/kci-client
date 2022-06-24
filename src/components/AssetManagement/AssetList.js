import React from 'react';
import Asset from './Asset';

const AssetList = () => {

    var assets = [
        {asset_type:'COMPUTER AND EQUIPMENT',  asset_name:'GTEL PHONE',date_added:'07/12/21', category:'Fixed Assets', cost:'ZWL 1000', description:'ASUS COMPUTER (DESKTOP)', id:'1'},
        {asset_type:'COMPUTER AND EQUIPMENT',  asset_name:'nokia handsets',date_added:'07/12/21', category:'Fixed Assets', cost:'ZWL 1000', description:'ASUS COMPUTER (DESKTOP)', id:'2'},
        {asset_type:'OFFICE FURNITURE AND EQUIPMENT',  asset_name:'PRINTER',date_added:'07/12/21', category:'Fixed Assets', cost:'ZWL 1000', description:'ASUS COMPUTER (DESKTOP)', id:'3'},
        {asset_type:'OFFICE FURNITURE AND EQUIPMENT',  asset_name:'COMPUTER',date_added:'07/12/21', category:'Fixed Assets', cost:'ZWL 1000', description:'ASUS COMPUTER (DESKTOP)', id:'4'},
        {asset_type:'COMPUTER AND EQUIPMENT',  asset_name:'COMPUTER',date_added:'07/12/21', category:'Fixed Assets', cost:'ZWL 1000', description:'ASUS COMPUTER (DESKTOP)', id:'5'},
        {asset_type:'COMPUTER AND EQUIPMENT',  asset_name:'COMPUTER',date_added:'07/12/21', category:'Fixed Assets', cost:'ZWL 1000', description:'ASUS COMPUTER (DESKTOP)', id:'6'},
        {asset_type:'OFFICE FURNITURE AND EQUIPMENT',  asset_name:'COMPUTER', date_added:'07/12/21',category:'Current Assets', cost:'ZWL 1000', description:'ASUS COMPUTER (DESKTOP)', id:'7'},
        {asset_type:'OFFICE FURNITURE AND EQUIPMENT',  asset_name:'COMPUTER', date_added:'07/12/21',category:'Current Assets', cost:'ZWL 1000', description:'ASUS COMPUTER (DESKTOP)', id:'8'},
        {asset_type:'OFFICE FURNITURE AND EQUIPMENT',  asset_name:'COMPUTER', date_added:'07/12/21',category:'Current Assets', cost:'ZWL 1000', description:'ASUS COMPUTER (DESKTOP)', id:'9'},
        {asset_type:'OFFICE FURNITURE AND EQUIPMENT',  asset_name:'COMPUTER', date_added:'07/12/21',category:'Current Assets', cost:'ZWL 1000', description:'ASUS COMPUTER (DESKTOP)', id:'10'},
        // {asset_type:'COMPUTER AND EQUIPMENT',  asset_name:'COMPUTER', date_added:'07/12/21',category:'Current Assets', cost:'ZWL 1000', description:'ASUS COMPUTER (DESKTOP)', id:'11'},
        // {asset_type:'COMPUTER AND EQUIPMENT',  asset_name:'COMPUTER', date_added:'07/12/21',category:'Current Assets', cost:'ZWL 1000', description:'ASUS COMPUTER (DESKTOP)', id:'12'},
        // {asset_type:'COMPUTER AND EQUIPMENT',  asset_name:'COMPUTER', date_added:'07/12/21',category:'Current Assets', cost:'ZWL 1000', description:'ASUS COMPUTER (DESKTOP)', id:'13'},
        // {asset_type:'COMPUTER AND EQUIPMENT',  asset_name:'COMPUTER', date_added:'07/12/21',category:'Current Assets', cost:'ZWL 1000', description:'ASUS COMPUTER (DESKTOP)', id:'14'},
        // {asset_type:'COMPUTER AND EQUIPMENT',  asset_name:'COMPUTER', date_added:'07/12/21',category:'Current Assets', cost:'ZWL 1000', description:'ASUS COMPUTER (DESKTOP)', id:'15'},
        // {asset_type:'COMPUTER AND EQUIPMENT',  asset_name:'COMPUTER', date_added:'07/12/21',category:'Current Assets', cost:'ZWL 1000', description:'ASUS COMPUTER (DESKTOP)', id:'16'}
    ];

    return (
        <div className='table-responsive font-12'>
            <table className='table table-centered table-hover'>
                <thead className="thead-light">
                    <tr>
                        <th style={{textAlign:"start"}}>Asset_Type</th>
                        <th style={{textAlign:"start"}}>Asset_Name</th>
                        <th style={{textAlign:"start"}}>Date_Created</th>
                        <th style={{textAlign:"start"}}>Category</th>
                        <th style={{textAlign:"start"}}>Cost</th>
                        <th style={{textAlign:"start"}}>Description</th>
                        <th style={{textAlign:"start"}}>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {assets.map(asset => (
                        <Asset 
                            key={asset.id} 
                            asset_type={asset.asset_type}
                            asset_name={asset.asset_name}
                            date_added={asset.date_added} 
                            category={asset.category}
                            cost={asset.cost}
                            description={asset.description} 
                        />
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default AssetList;