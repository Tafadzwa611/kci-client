import React, { useState, useEffect } from 'react';
import MainTable from './MainTable';
import MiniTable from './MiniTable';
import MiniIncomeDetails from './MiniIncomeDetails';
import { Fetcher } from '../../../common';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import Pager from './Pager';

function Table({otherIncomeData, setIncomeDetails, setOtherIncomeData, params}) {
  const [incomeId, setIncomeId] = useState(null);
  const [selectedIncomeId, setSelectedIncomeId] = useState(null);


  const handleClick = (e) => {
    setIncomeId(e.target.id);
    setSelectedIncomeId(e.target.id);
  }

  return (
    <>
      <TableHeader otherIncomeData={otherIncomeData} params={params} setOtherIncomeData={setOtherIncomeData}/>
      <div style={{padding:"0", border:"none"}} className={incomeId ? 'table-container journal__table font-12' :'table-container full__width font-12'}>
        <div className={incomeId ? "table-responsive journal__table-container-journals" : "table-responsive full__table"} >
          {incomeId ?
            <MiniTable 
              otherIncomeData={otherIncomeData} 
              handleClick={handleClick} 
              selectedIncomeId={selectedIncomeId}
            /> :
            <MainTable 
              otherIncomeData={otherIncomeData} 
              handleClick={handleClick}
            />
          }
          {incomeId &&
          <Fetcher urls={[`/otherincomeapi/get_otherincome/${incomeId}/`]} extra={{setIncomeDetails, setOtherIncomeData, setIncomeId}}>
            {({data, extra}) => <MiniIncomeDetails incomeDetails={data[0]} extra={extra} />}
          </Fetcher>
          }
        </div>
      </div>
    </>
  )
}

const TableHeader = ({otherIncomeData, params, setOtherIncomeData}) => {
  return (
    <div className='table-header'>
      <div style={{display:'flex', columnGap:'10px', alignItems:'center'}}>
        <Pager
          nextPageNumber={otherIncomeData.next_page_num}
          params={params}
          loadMoreExpenses={() => console.log('loadMoreOtherIncome')}
          loadingMore={false}
          prevPageNumber={otherIncomeData.prev_page_num}
          setOtherIncomeData={setOtherIncomeData}
        />
        <div style={{marginTop:'6px'}}>Showing {otherIncomeData.otherincomes.length} of {otherIncomeData.count} otherincomes.</div>
      </div>
      <div style={{display:'flex', columnGap:'10px', alignItems:'center'}}>
        <div style={{marginTop:'6px'}}>Page {otherIncomeData.number} of {otherIncomeData.num_of_pages}</div>
        <div>
          <ReactHTMLTableToExcel
              id='test-table-xls-button'
              className='btn btn-default'
              table='loans'
              filename='otherincomes'
              sheet='tablexls'
              buttonText='Download as XLS'
          />
        </div>
      </div>
    </div>
  )
}

export default Table;
















































