import React, { useState, useEffect, useRef } from 'react';
import { makeRequest } from '../../../utils/utils';
import GroupsTable from './GroupsTable';
import Filter from './Filter';
import Footer from './Footer';
import MiniLoader from '../../Loader/MiniLoader';
import AdvancedGroupSearch from '../AdvancedGroupSearch/AdvancedGroupSearch';

function GroupsList() {
  const [groups, setGroups] = useState(null);
  const [branches, setBranches] = useState(null);
  const [branchIds, setBranchIds] = useState(null);
  const [nextPageNumber, setNextPageNumber] = useState(null);
  const [totalCount, setTotalCount] = useState(0);
  const [searchStr, setSearchStr] = useState('');
  const [minRegDate, setMinRegDate] = useState('');
  const [maxRegDate, setMaxRegDate] = useState('');
  const [minGrpDate, setMinGrpDate] = useState('');
  const [maxGrpDate, setMaxGrpDate] = useState('');
  const [searchType, setSearchType] = useState('basic');
  const [loadingMore, setLoadingMore] = useState(false);
  const [advOpts, setAdvOpts] = useState({});
  const [details, setDetails] = useState(false)
  const [selecteGroupID, setSelectedGroupID] = useState(null)
  const [approved, setApproved] = useState('');
  
  const pageNum = useRef(1);

  useEffect(() => {
    getGroups();
  }, []);

  const getGroups = async () => {
    window.scrollTo(0, 0);
    const branches = await fetchBranches();
    setBranches(branches);
  }

  async function fetchGroups() {
    try {
      const url = getUrl();
      const response = searchType === 'basic' ? await makeRequest.get(url, {timeout: 8000}) : await makeRequest.post(url, {...advOpts, page_num: pageNum.current}, {timeout: 8000});
    //   const response = await makeRequest.get(url, {timeout: 8000});
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
      return '/clientsapi/advanced_groups_search/'
    }
  
    let url = `/clientsapi/groups/?page_num=${pageNum.current}`;
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
    if (minGrpDate !== '') {
      url += `&min_grp_date=${minGrpDate}`;
    }
    if (maxGrpDate !== '') {
      url += `&max_grp_date=${maxGrpDate}`;
    }
    if (approved !== '') {
      url += `&approved=${approved}`;
    }
    return url
  }

  if (branches===null) {
    return <MiniLoader />
  }

  const loadMore = async (evt) => {
    evt.preventDefault();
    pageNum.current += 1;
    const data = await fetchGroups();
    setGroups(curr => [...curr,...data.groups]);
  }

  const onSubmit = async (evt) => {
    evt.preventDefault();
    pageNum.current = 1;
    const data = await fetchGroups();
    setTotalCount(data.count);
    setGroups(data.groups);
  }

  return (
    <>
      <div className='row-payments-container' style={{width: '200px', margin: '10px 0'}}>
        <select className='custom-select-form row-form' onChange={(e) => setSearchType(e.target.value)} value={searchType}>
          <option value='basic'>Basic Search</option>
          <option value='advanced'>Advanced Search</option>
        </select>
      </div>
      {searchType === 'advanced' ? <AdvancedGroupSearch branches={branches} setAdvOpts={setAdvOpts} onSubmit={onSubmit} /> :
        <Filter
          minRegDate={minRegDate}
          setMinRegDate={setMinRegDate}
          maxRegDate={maxRegDate}
          minGrpDate={minGrpDate}
          setMinGrpDate={setMinGrpDate}
          maxGrpDate={maxGrpDate}
          setMaxGrpDate={setMaxGrpDate}
          setMaxRegDate={setMaxRegDate}
          searchStr={searchStr}
          setSearchStr={setSearchStr}
          branches={branches}
          setBranchIds={setBranchIds}
          onSubmit={onSubmit}
          details={details}
          approved={approved}
          setApproved={setApproved}
        />
        }
      {groups &&
        <>
          <div style={{paddingTop: '2rem'}}></div>
          <GroupsTable 
            groups={groups} 
            totalCount={totalCount} 
            setDetails={setDetails} 
            details={details} 
            setSelectedGroupID={setSelectedGroupID} 
            selecteGroupID={selecteGroupID}
            selectedgroup={groups.find(clnt => clnt.id == selecteGroupID)}
          />
          <Footer 
            nextPageNumber={nextPageNumber} 
            loadMoreGroups={loadMore} 
            loadingMore={loadingMore}
          />
        </>
      }
    </>
  )
}

export default GroupsList;