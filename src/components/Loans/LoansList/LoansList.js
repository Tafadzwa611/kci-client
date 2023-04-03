import React from 'react';
import Filter from './Filter';
import LoansTable from './LoansTable';

function LoansList({products}) {
  return (
    <>
      <Filter products={products}/>
      <div style={{paddingTop: '2rem'}}></div>
      <LoansTable />
    </>
  )
}

export default LoansList;

// {errorMessage != null && <Error errorMessage={errorMessage}/>}
// const [loans, setLoans] = useState([]);
//   const {branches} = useBranches();
//   const [branchIds, setBranchIds] = useState(null);
//   const [nextPageNumber, setNextPageNumber] = useState(null);
//   const [totalCount, setTotalCount] = useState(0);
//   const [minLoanAddedOn, setMinLoanAddedOn] = useState('');
//   const [maxLoanAddedOn, setMaxLoanAddedOn] = useState('');
//   const [minPrincipalAmountDue, setMinPrincipalAmountDue] = useState('');
//   const [maxPrincipalAmountDue, setMaxPrincipalAmountDue] = useState('');
//   const [minAmountPaid, setMinAmountPaid] = useState('');
//   const [maxAmountPaid, setMaxAmountPaid] = useState('');
//   const [status, setStatus] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const {currencies} = useCurrencies();
//   const [currencyId, setCurrencyId] = useState('');
//   const [errorMessage, setErrorMessage] = useState(null);
//   const [loadingMore, setLoadingMore] = useState(false);
//   const [productId, setProductId] = useState('');
//   const [details, setDetails] = useState(false)
//   const [selectedLoanID, setSelectedLoanID] = useState(null)
//   const [client, setClient] = useState('');
//   const [selectedBranches, setSelectedBranches] = useState([]);
//   const pageNum = useRef(1);
//   const isFirstRun = useRef(true);