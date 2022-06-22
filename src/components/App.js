import React, { lazy, Suspense, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { LoggedInUserProvider, LoggedInUserContext } from './Context';
import PublicRoutes from './PublicRoutes';
import ProtectedRoutes from './ProtectedRoutes';
import Cookies from 'js-cookie';

const Login = lazy(() => import('./Login'));
const Home = lazy(() => import('./Home'));
const Dashboard = lazy(() => import('./Dashboard'));
const Main = lazy(() => import('./Main'));

function App() {
  const [loggedInUser, setLoggedInUser] = React.useState(null);

  useEffect(() => {
    const user = Cookies.get('user');
    if (user) {
      setLoggedInUser(JSON.parse(user));
    }
  }, []);

  return (
    <Router>
      <Suspense fallback='loading'>
        <LoggedInUserProvider value={{loggedInUser, setLoggedInUser}}>
          <Routes>
            {/** Public Routes */}
            {/** Wrap all Route under PublicRoutes element */}
            <Route path='login' element={<PublicRoutes />}>
              <Route path='/login' element={<Login/>}/>
            </Route>

            {/** Protected Routes */}
            {/** Wrap all Route under ProtectedRoutes element */}
            <Route path='/' element={<ProtectedRoutes />}>
              <Route path='main' element={<Main />}>
                <Route path='/main' element={<Navigate replace to='home' />} />
                <Route path='home' element={<Home />} />
                <Route path='dashboard' element={<Dashboard />} />
              </Route>
            </Route>
          </Routes>
        </LoggedInUserProvider>
      </Suspense>
    </Router>
  );
}

export default App;
