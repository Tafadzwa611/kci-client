import React from 'react';
import { Fetcher } from '../../../common';
import { Link } from 'react-router-dom';

function Currencies() {
  return (
    <Fetcher urls={['/usersapi/currencieslist/']}>
      {({data}) => (
        <>
          <button className='btn btn-success' style={{marginBottom:'20px'}}>
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
                              <span className='edit_button'>
                                <Link to={`/users/admin/editcurrency/${currency.id}`}>Edit</Link>
                              </span>
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