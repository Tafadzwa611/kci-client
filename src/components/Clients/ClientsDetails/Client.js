import React, {useState, useEffect} from 'react';
import { makeRequest } from '../../../utils/utils';
import IndividualClientDetails from './IndividualClientDetails/IndividualClientDetals';
import CompanyClientDetails from './CompanyClientDetails/CompanyClientDetails';

function Client({selectedclientID, setDetails}) {
  const [client, setClient] = useState(null);
  const [addresses, setAddresses] = useState([]);
  const [nokList, setNokList] = useState([]);
  const [files, setFiles] = useState([]);
  const [branches, setBranches] = useState([]);
  const [business, setBusiness] = useState([]);
  const [directors, setDirectors] = useState([]);

  useEffect(() => {
    getClient(selectedclientID);
    getBranches();
  }, [selectedclientID]);

  const getClient = async () => {
    await fetchClient();
  }

  const getBranches = async () => {
    await fetchBranches();
  }


  async function fetchClient() {
    try {
      const response = await makeRequest.get(`/clientsapi/get_client/${selectedclientID}/`, {timeout: 8000});
      if (response.ok) {
        const json_res = await response.json();
        setAddresses(json_res.address_list);
        setFiles(json_res.file_list);
        setNokList(json_res.next_of_kin_list);
        if (json_res.client.type_of_client==='Company') {
          setBusiness(json_res.business);
          setDirectors(json_res.business.businessdirector_set);
        }
        return setClient(json_res.client);
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
      const response = await makeRequest.get('/clientsapi/transfer_branches/', {timeout: 8000});
      if (response.ok) {
        const json_res = await response.json();
        return setBranches(json_res);
      }else {
        const error = await response.json();
        console.log(error);
      }
    }catch(error) {
      console.log(error);
    }
  }

  if (client === null) {
    return <div>Loading</div>
  }

  return (
    client.type_of_client === 'Individual' ?
    <IndividualClientDetails
      client={client}
      setClient={setClient}
      addresses={addresses}
      setAddresses={setAddresses}
      nokList={nokList}
      setNokList={setNokList}
      files={files}
      setFiles={setFiles}
      branches={branches}
      clientId={selectedclientID}
      setDetails={setDetails}
    /> :
    <CompanyClientDetails
      client={client}
      directors={directors}
      setDirectors={setDirectors}
      branches={branches}
      business={business}
      setClient={setClient}
      setBusiness={setBusiness}
      files={files}
      setFiles={setFiles}
      clientId={selectedclientID}
      setDetails={setDetails}
    />
  )
}

export default Client;