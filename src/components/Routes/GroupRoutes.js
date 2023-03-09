import React, { lazy } from 'react';
import { Route } from 'react-router-dom';

const ViewGroups = lazy(() => import('../Groups/ViewGroups/ViewGroups'));

const GroupRoutes = (<Route exact path='/groups/viewgroups' element={<ViewGroups/>}/>)

export default GroupRoutes;