import React, {useEffect} from 'react';
import { Routes, Route } from 'react-router-dom';
import Export from './Export';

const LocalExport = () => {
  useEffect(() => {
    document.title = 'Export';
  }, []);

  return (
    <Routes>
      <Route path='/' element={<Export/>}/>
    </Routes>
  )
}

export default LocalExport;