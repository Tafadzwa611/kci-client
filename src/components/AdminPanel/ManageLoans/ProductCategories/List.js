import React, {useState, useEffect} from 'react';
import { SuccessBtn } from '../../../../common';
import Table from './Table';
import AddCat from './AddCat';
import EditCat from './EditCat';

function List({data, extra}) {
  const {categoryId, setCategoryId} = extra;
  const [selectedCat, setSelectedCat] = useState(null);
  const [cats, setCats] = useState(data);
  const [view, setView] = useState('list');

  useEffect(() => {
    if (categoryId !== null) {
      const cat = cats.find(prd => prd.id == categoryId);
      setSelectedCat(cat);
    }
  }, []);

  const handleClick = (e) => {
    const cat = cats.find(cat => cat.id == e.target.id);
    setSelectedCat(cat);
  }

  if (view === 'list') {
    return (
      <>
        <SuccessBtn handler={() => setView('add')} value={'Add Category'}/>
        <Table
          setView={setView}
          cats={cats}
          selectedCat={selectedCat}
          handleClick={handleClick}
          setSelectedCat={setSelectedCat}
          setCats={setCats}
        />
      </>
    )
  }else if (view === 'edit') {
    return (
      <EditCat
        initialValues={selectedCat}
        setView={setView}
        setSelectedCat={setSelectedCat}
        setCats={setCats}
      />
    )
  }
  return <AddCat setView={setView} setCategoryId={setCategoryId} setCats={setCats} />
}

export default List;