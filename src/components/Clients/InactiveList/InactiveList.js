import React, { useState, useEffect, useRef } from 'react';
import { makeRequest } from '../../../utils/utils';
import PendingApprovalTable from '../PendingApprovalList/PendingApprovalTable';
import PendingApprovalFilter from '../PendingApprovalList/PendingApprovalFilter';
import PendingApprovalFooter from '../PendingApprovalList/PendingApprovalFooter';
import MiniLoader from '../../Loader/MiniLoader';

function InactiveList() {
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
  const [gender, setGender] = useState('');
  const [loadingMore, setLoadingMore] = useState(false);
  const [details, setDetails] = useState(false)
  const [selectedclientID, setSelectedClientID] = useState(null)
  
  const pageNum = useRef(1);

  useEffect(() => {
    getClients();
  }, []);

  const getClients = async () => {
    window.scrollTo(0, 0);
    const branches = await fetchBranches();
    setBranches(branches);
  }

  async function fetchClients() {
    try {
      const url = getUrl();
      const response = await makeRequest.get(url, {timeout: 8000});
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
    let url = `/clientsapi/inactive_clients/?page_num=${pageNum.current}`;
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
    return url
  }

  if (branches===null) {
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
        <PendingApprovalFilter
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
        />
        {clients &&
            <>
                <div style={{paddingTop: '2rem'}}></div>
                <PendingApprovalTable 
                    clients={clients} 
                    totalCount={totalCount} 
                    setDetails={setDetails} 
                    details={details} 
                    setSelectedClientID={setSelectedClientID} 
                    selectedclientID={selectedclientID}
                    selectedclient={clients.find(clnt => clnt.id == selectedclientID)}
                />
                <PendingApprovalFooter 
                    nextPageNumber={nextPageNumber} 
                    loadMoreClients={loadMore} 
                    loadingMore={loadingMore}
                />
            </>
        }
    </>
  )
}

export default InactiveList;