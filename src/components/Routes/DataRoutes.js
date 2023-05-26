import React, { lazy } from 'react';
import { Route } from 'react-router-dom';

const ViewDataExport = lazy(() => import('../DataExport/ViewDataExport'));

const DataRoutes = (
  <>
    <Route exact path='/data/viewdata/*' element={<ViewDataExport/>}/>
  </>
)

export default DataRoutes;