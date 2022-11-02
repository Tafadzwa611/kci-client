import React, { useState, useEffect, useRef } from 'react';
import { makeRequest } from '../../../utils/utils';
import ClientsTable from './ClientsTable';
import Filter from './Filter';
import Footer from './Footer';
import MiniLoader from '../../Loader/MiniLoader';
import AdvancedSearch from './AdvancedSearch/AdvancedSearch';

function ClientsList() {
  const [clients, setClients] = useState(null);
  const [branches, setBranches] = useState(null);
  const [branchIds, setBranchIds] = useState(null);
  const [nextPageNumber, setNextPageNumber] = useState(null);
  const [totalCount, setTotalCount] = useState(0);
  const [searchStr, setSearchStr] = useState('');
  const [minRegDate, setMinRegDate] = useState('');
  const [maxRegDate, setMaxRegDate] = useState('');
  const [minDob, setMinDob] = useState('');
  const [maxDob, setMaxDob] = useState('');
  const [typeOfClient, setTypeOfClient] = useState('');
  const [searchType, setSearchType] = useState('basic');
  const [gender, setGender] = useState('');
  const [loadingMore, setLoadingMore] = useState(false);
  const [advOpts, setAdvOpts] = useState({});
  const [details, setDetails] = useState(false)
  const [selectedclientID, setSelectedClientID] = useState(null)
  const [approved, setApproved] = useState('');
  
  const pageNum = useRef(1);

  useEffect(() => {
    getClients();
  }, []);

  const getClients = async () => {
    window.scrollTo(0, 0);
    const data = await fetchClients();
    const branches = await fetchBranches();
    setClients(data.clients);
    setBranches(branches);
    setTotalCount(data.count);
  }

  async function fetchClients() {
    try {
      const url = getUrl();
      const response = searchType === 'basic' ? await makeRequest.get(url, {timeout: 8000}) : await makeRequest.post(url, {...advOpts, page_num: pageNum.current}, {timeout: 8000});
      if (response.ok) {
        const json_res = await response.json();
        setNextPageNumber(json_res.next_page_num);
        return json_res;
      }else {
        const error = await response.json();
        console.log(error);
      }
    }catch(error) {
      console.log(error);
    }
  }

  async function fetchBranches() {
    try {
      const response = await makeRequest.get('/usersapi/get-branches/', {timeout: 8000});
      if (response.ok) {
        const json_res = await response.json();
        return json_res.results;
      }else {
        const error = await response.json();
        console.log(error);
      }
    }catch(error) {
      console.log(error);
    }
  }

  function getUrl() {
    if (searchType === 'advanced') {
      return '/clientsapi/advanced_search/'
    }
  
    let url = `/clientsapi/clients/?page_num=${pageNum.current}`;
    if (branchIds !== null) {
      branchIds.forEach(id => (url += `&branch_ids=${id}`));
    }
    if (searchStr !== '') {
      url += `&search_str=${searchStr}`;
    }
    if (minRegDate !== '') {
      url += `&min_reg_date=${minRegDate}`;
    }
    if (maxRegDate !== '') {
      url += `&max_reg_date=${maxRegDate}`;
    }
    if (minDob !== '') {
      url += `&min_dob=${minDob}`;
    }
    if (maxDob !== '') {
      url += `&max_dob=${maxDob}`;
    }
    if (typeOfClient !== '') {
      url += `&type_of_client=${typeOfClient}`;
    }
    if (gender !== '') {
      url += `&gender=${gender}`;
    }
    if (approved !== '') {
      url += `&approved=${approved}`;
    }
    return url
  }

  if (clients===null || branches===null) {
    return <MiniLoader />
  }

  const loadMore = async (evt) => {
    evt.preventDefault();
    pageNum.current += 1;
    const data = await fetchClients();
    setClients(curr => [...curr,...data.clients]);
  }

  const onSubmit = async (evt) => {
    evt.preventDefault();
    pageNum.current = 1;
    const data = await fetchClients();
    setTotalCount(data.count);
    setClients(data.clients);
  }

  return (
    <>
<<<<<<< HEAD
      <div className='row-payments-container' style={{width: '10%', margin: '10px 0'}}>
        <select className='custom-select-form row-form' onChange={(e) => setSearchType(e.target.value)} value={searchType}>
          <option value='basic'>Basic Search</option>
          <option value='advanced'>Advanced Search</option>
        </select>
      </div>
      {searchType === 'advanced' ? <AdvancedSearch branches={branches} setAdvOpts={setAdvOpts} onSubmit={onSubmit} /> :
      <Filter
        minRegDate={minRegDate}
        setMinRegDate={setMinRegDate}
        maxRegDate={maxRegDate}
        minDob={minDob}
        setMinDob={setMinDob}
        maxDob={maxDob}
        setMaxDob={setMaxDob}
        setMaxRegDate={setMaxRegDate}
        searchStr={searchStr}
        setSearchStr={setSearchStr}
        branches={branches}
        setBranchIds={setBranchIds}
        typeOfClient={typeOfClient}
        setTypeOfClient={setTypeOfClient}
        gender={gender}
        setGender={setGender}
        onSubmit={onSubmit}
        details={details}
      />}
      <div style={{paddingTop: '1.5rem'}}></div>
      <ClientsTable 
        clients={clients} 
        totalCount={totalCount} 
        setDetails={setDetails} 
        details={details} 
        setSelectedClientID={setSelectedClientID} 
        selectedclientID={selectedclientID}
        selectedclient={clients.find(clnt => clnt.id == selectedclientID)}
      />
      <Footer 
        nextPageNumber={nextPageNumber} 
        loadMoreClients={loadMore} 
        loadingMore={loadingMore}
      />
=======
        <Filter
            minRegDate={minRegDate}
            setMinRegDate={setMinRegDate}
            maxRegDate={maxRegDate}
            minDob={minDob}
            setMinDob={setMinDob}
            maxDob={maxDob}
            setMaxDob={setMaxDob}
            setMaxRegDate={setMaxRegDate}
            searchStr={searchStr}
            setSearchStr={setSearchStr}
            branches={branches}
            setBranchIds={setBranchIds}
            typeOfClient={typeOfClient}
            setTypeOfClient={setTypeOfClient}
            gender={gender}
            setGender={setGender}
            onSubmit={onSubmit}
            details={details}
            approved={approved}
            setApproved={setApproved}
        />
        <div style={{paddingTop: '2rem'}}></div>
        <ClientsTable 
          clients={clients} 
          totalCount={totalCount} 
          setDetails={setDetails} 
          details={details} 
          setSelectedClientID={setSelectedClientID} 
          selectedclientID={selectedclientID}
          selectedclient={clients.find(clnt => clnt.id == selectedclientID)}
        />
        <Footer 
          nextPageNumber={nextPageNumber} 
          loadMoreClients={loadMore} 
          loadingMore={loadingMore}
        />
>>>>>>> 5f08ae71106b2e5f00cd5f2b1cf5d44ad3d95656
    </>
  )
}

export default ClientsList;