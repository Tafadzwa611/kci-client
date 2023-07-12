import React from 'react';
import { Fetcher } from '../../../common';
import { Link } from 'react-router-dom';

function Currencies() {
  return (
    <Fetcher urls={['/usersapi/currencieslist/']}>
      {({data}) => (
        <>
          <button className='btn btn-success'>
            <Link to='/users/admin/addcurrency'>
              Add Currency
            </Link>
          </button>
          <div style={{padding:'0', border:'none'}} className='table-container full__width font-12'>
            <div className='full__table'>
              <div className='table-responsive'>
                <div className='table__height'>
                  <table className='table'>
                    <tbody>
                      <tr className='journal-details header' style={{position:'sticky', top: 0}}>
                        <th>Fullname</th>
                        <th>Shortname</th>
                        <th>Date Created</th>
                        <th>Action</th>
                      </tr>
                      {data[0].map(currency => {
                        return (
                          <tr key={currency.id}>
                            <td>{currency.fullname}</td>
                            <td>{currency.shortname}</td>
                            <td>{currency.currency_date}</td>
                            <td>
                              <button style={{ background:"#1bbf5f", color:"#fff", border:"none", borderRadius:".15rem", cursor:"pointer", padding:".2rem .25rem",fontSize: "0.75rem"}}>
                                <Link to={`/users/admin/editcurrency/${currency.id}`}>Edit</Link>
                              </button>
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </Fetcher>
  )
}

export default Currencies;