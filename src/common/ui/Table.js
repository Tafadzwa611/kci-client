import React from 'react';

const Table = ({rows, headers}) => {
  return (
    <div style={{display:'block'}}>
      <div style={{padding:'0', border:'none'}}>
        <div style={{width:'100%', overflowX:'auto'}}>
          <div className='table__height'>
            <table className='table'>
              <thead>
                <tr className='journal-details header' style={{position:'sticky', top:'0'}}>
                  {headers.map(header => <th key={header} style={{textAlign:'start'}}>{header}</th>)}
                </tr>
              </thead>
              <tbody>
                {rows}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Table;