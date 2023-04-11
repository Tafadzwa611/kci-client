import React, {useState, useEffect} from 'react';
import { SuccessBtn } from '../../../common';
import Table from './Table';
import AddBranch from './AddBranch';

function List({data}) {
  const [branchId, setBranchId] = useState(null);
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [view, setView] = useState('list');
  const [showDetails, setShowDetails] = useState(null);
  const [branchData, setBranchData] = useState(data);

  const handleClick = (e) => {
    const branch = branchData.find(branch => branch.id == e.target.id);
    setSelectedBranch(branch);
    setShowDetails(true);
  }

  useEffect(() => {
    if (branchId !== null) {
      const branch = branchData.find(branch => branch.id == branchId);
      setSelectedBranch(branch);
    }
  }, []);

  if (view === 'list') {
    return (
      <>
        <SuccessBtn handler={() => setView('add')} value={'Add Branch'}/>
        <Table
          setView={setView}
          branchData={branchData}
          selectedBranch={selectedBranch}
          showDetails={showDetails}
          handleClick={handleClick}
          setShowDetails={setShowDetails}
        />
      </>
    )
  }
  return <AddBranch setView={setView} setBranchData={setBranchData}/>
}

export default List;