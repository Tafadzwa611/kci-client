import React, {useState, useEffect} from 'react';
import ValueEditor from './ValueEditor';
import CombinatorSelector from './CombinatorSelector';
import { QueryBuilder } from 'react-querybuilder';

function AdvancedFilter({fields, getAdvOpts, getOperators, onQueryChange, initQuery}) {
  const initQueryState = initQuery || {id: 'root', combinator: 'and', rules: []};
  const [query, setQuery] =  useState(initQueryState);

  useEffect(() => {
    console.log(query);
    const advOpts = getAdvOpts(query);
    onQueryChange(advOpts);
  }, [query]);

  return (
    <QueryBuilder
      fields={fields}
      query={query}
      getOperators={getOperators}
      onQueryChange={q => setQuery(q)}
      controlElements={{
        addGroupAction: () => null,
        combinatorSelector: CombinatorSelector,
        valueEditor: ValueEditor,
        addRuleAction: AddRuleAction,
        removeRuleAction: RemoveRuleAction,
        fieldSelector: FieldSelector,
        operatorSelector: OperatorSelector
      }}
    />
  )
}

export default AdvancedFilter;

function AddRuleAction(props) {
  const {handleOnClick} = props;

  return (
    <button type='submit' className='btn btn-info' onClick={e => handleOnClick(e)} >Add Rule</button>
  )
}

function FieldSelector(props) {
  const {options, value, handleOnChange} = props;

  return (
    <select onChange={(e) => handleOnChange(e.target.value)} value={value} className="custom-select-form row-form">
      {options.map(opt => <option key={opt.name} value={opt.name}>{opt.label}</option>)}
    </select>
  )
}

function OperatorSelector(props) {
  const {options, value, handleOnChange} = props;

  return (
    <select onChange={(e) => handleOnChange(e.target.value)} value={value} className="custom-select-form row-form">
      {options.map(opt => <option key={opt.name} value={opt.name}>{opt.label}</option>)}
    </select>
  )
}

function RemoveRuleAction(props) {
  const {handleOnClick} = props;

  return (
    <button type='submit' className='btn btn-danger' onClick={e => handleOnClick(e)} >X</button>
  )
}