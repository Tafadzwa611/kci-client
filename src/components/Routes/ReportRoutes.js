import React, { lazy } from 'react';
import { Route } from 'react-router-dom';

const ViewReports = lazy(() => import('../Reports/ViewReports/ViewReports'));

const ReportRoutes = (
  <>
    <Route exact path='/reports/viewreports/*' element={<ViewReports/>}/>
  </>
)

export default ReportRoutes;