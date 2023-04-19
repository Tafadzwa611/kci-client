import React, {useState} from 'react';
import Filter from './Filter';
import Table from './Table';
import IncomeDetails from './IncomeDetails';
import { useSearchParams } from 'react-router-dom';
import { Fetcher } from '../../../common';

function List() {
  const [searchParams] = useSearchParams();
  const [otherIncomeData, setOtherIncomeData] = useState({count: 0, next_page_num: 0, otherincomes: []});
  const [incomeDetails, setIncomeDetails] = useState(null);


  return (
    <>
      {searchParams.get('income_id') ?
        <IncomeDetailsView incomeId={searchParams.get('income_id')} incomeDetails={incomeDetails}/> :
        <>
          <Filter setOtherIncomeData={setOtherIncomeData}/>
          <div style={{paddingTop: '2rem'}}></div>
          <Table
            otherIncomeData={otherIncomeData} 
            setIncomeDetails={setIncomeDetails}
            setOtherIncomeData={setOtherIncomeData}
          />
        </>
      }
    </>
  )
}

const IncomeDetailsView = ({incomeId, incomeDetails}) => {
  if (incomeDetails) {
    return <IncomeDetails incomeDetails={incomeDetails}/>
  }

  return (
    <Fetcher urls={[`/otherincomeapi/get_otherincome/${incomeId}/`]}>
      {({data}) => <IncomeDetails incomeDetails={data[0]}/>}
    </Fetcher>
  )
}

export default List;