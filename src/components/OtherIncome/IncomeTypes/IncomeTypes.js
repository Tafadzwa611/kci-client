import React, { useState } from 'react';
import { Fetcher } from '../../../common';
import List from './List';
import { useSearchParams } from 'react-router-dom';
import Filter from './Filter';

function IncomeTypes() {
  const [searchParams] = useSearchParams();
  const [incomeTypeData, setIncomeTypeData] = useState([]);

  return (
    <>
      <List incomeTypeData={incomeTypeData} setIncomeTypeData={setIncomeTypeData} />
    </>
  )
}

export default IncomeTypes;
