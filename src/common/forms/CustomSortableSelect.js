import React, {useEffect, useState} from 'react';
import {
  DndContext, 
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import {SortableItem} from './SortableItem';
import { useField } from 'formik';

function CustomSortableSelect({options, label, setFieldValue, ...props}) {
  const [items, setItems] = useState(options);
  const [field, meta] = useField(props);

  useEffect(() => {
    setFieldValue(field.name, items);
  }, [items]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  return (
    <div className='row custom-background'>
      <label className='form-label'>{label}</label>
      <div className='col-9'>
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={items} strategy={verticalListSortingStrategy}>
            {items.map(id => <SortableItem key={id} id={id} />)}
          </SortableContext>
        </DndContext>
        {meta.error && <div className='error'>{meta.error}</div>}
      </div>
    </div>
  );
  
  function handleDragEnd(event) {
    const {active, over} = event;
    
    if (active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.indexOf(active.id);
        const newIndex = items.indexOf(over.id);
        
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }
}

export default CustomSortableSelect;
