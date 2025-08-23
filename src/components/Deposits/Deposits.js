import React from 'react';
import {
    Routes,
    Route,
    Link,
    Outlet,
    useLocation
} from 'react-router-dom';
import List from './List/List';
import Details from './Details';

function Deposits() {
    React.useEffect(() => {
        document.title = 'View Deposits';
    }, []);

    return (
        <Routes>
            <Route path='/' element={<Layout />}>
                <Route index element={<List />} />
                <Route path=':depositId' element={<Details />} />
            </Route>
        </Routes>
    )
}

function Layout() {
    const location = useLocation();

    return (
        <>
            <div className='card'>
                <div className='card-body'>
                    <h5 className='table-heading' style={{marginBottom:'20px'}}>Deposits</h5>
                    <>
                        <div className='bloc-tabs'>
                            <Link to='/deposits' id='list' className={location.pathname === '/deposits' ? 'tabs-client_a active-tabs' : 'tabs-client_a'}>
                                View Deposits
                            </Link>
                        </div>
                        <div className='tab-content font-12' style={{marginTop:'3rem'}}>
                            <Outlet />
                        </div>
                    </>
                </div>
            </div>
        </>
    )
}

export default Deposits;