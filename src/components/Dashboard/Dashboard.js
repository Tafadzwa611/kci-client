import React, {useEffect, useContext} from 'react';
import { makeRequestWrapper } from '../../utils';
import { LoggedInUserContext } from '../Context';

export default function Dashboard() {
  const {setLoggedInUser} = useContext(LoggedInUserContext);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const response = await makeRequestWrapper('/dashboardapi/dashboard-age/?currency_id=1', 'get', setLoggedInUser);
    if (response.ok) {
      const data = await response.json();
      console.log(data);
    }else {
      // const errors = await response.json();
      console.log(response);
    }
  }

  return (
    <div>Dashboard</div>
  )
}