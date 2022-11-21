import React, { lazy } from 'react';
import { Route } from 'react-router-dom';

const AssetTypes = lazy(() => import('../AssetManagement/AssetTypes'));
const AddAssetType = lazy(() => import('../AssetManagement/AddAssetType'));
const AddAsset = lazy(() => import('../AssetManagement/AddAsset'));
const AddNewAsset = lazy(() => import('../AssetManagement/AddNewAsset'));
const AddOldAsset = lazy(() => import('../AssetManagement/AddOldAsset'));
const ViewAssets = lazy(() => import('../AssetManagement/ViewAssets'));
const AssetDetails = lazy(() => import('../AssetManagement/AssetDetails'));

const AssetRoutes = (
  <>
    <Route exact path='/assets/assettypes' element={<AssetTypes/>}/>
    <Route exact path='/assets/viewassets' element={<ViewAssets/>}/>
    <Route exact path='/assets/addnewasset' element={<AddNewAsset/>}/>
    <Route exact path='/assets/addoldasset' element={<AddOldAsset/>}/>
    <Route exact path='/assets/addassettype' element={<AddAssetType/>}/>
    <Route exact path='/assets/assetdetails' element={<AssetDetails/>}/>
    <Route exact path='/asset/addasset' element={<AddAsset/>}/>
  </>
)

export default AssetRoutes;