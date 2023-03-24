import React, {useState} from 'react';
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

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  return (
    <div className='row custom-background'>
      <label className='form-label'>{label}{props.required && <span style={{color: 'red'}}>&#42;</span>}</label>
      <div className='col-9'>
        <div className='sortable-select-container'>
          <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={items} strategy={verticalListSortingStrategy}>
              {items.map(id => <SortableItem key={id} id={id} />)}
            </SortableContext>
          </DndContext>
          {meta.error && <div className='error'>{meta.error}</div>}
        </div>
      </div>
    </div>
  );

  function handleDragEnd(event) {
    const {active, over} = event;
    if (active.id !== over.id) {
      const oldIndex = items.indexOf(active.id);
      const newIndex = items.indexOf(over.id);
      const newItems = arrayMove(items, oldIndex, newIndex);
      setFieldValue(field.name, newItems);
      setItems(newItems);
    }
  }
}

export default CustomSortableSelect;
