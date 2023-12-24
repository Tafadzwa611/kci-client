import React, { lazy } from 'react';
import { Route } from 'react-router-dom';

const LocalExport = lazy(() => import('../LocalExport/LocalExport'));

const LocalExportRoutes = (
  <Route exact path='/localexport/*' element={<LocalExport/>}/>
)

export default LocalExportRoutes;