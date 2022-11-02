import React, { useState, useEffect } from 'react';
import { QueryBuilder } from 'react-querybuilder';
import 'react-querybuilder/dist/query-builder.css';
import CombinatorSelector from './CombinatorSelector';
import fields from './Fields';
import getOperators from './getOperators';
import ValueEditor from './ValueEditor';
import AddRuleAction from './AddRuleAction';
import RemoveRuleAction from './RemoveRuleAction';
import {getAdvOpts} from './utils';
import {isQueryInvalid} from './validations';
import FieldSelector from './FieldSelector';
import OperatorSelector from './OperatorSelector';

function AdvancedSearch({setAdvOpts, onSubmit, branches}) {
  const [query, setQuery] =  useState({id: 'root', combinator: 'and', rules: []});
  const [allRulesValid, setAllRulesValid] =  useState(true);

  const branchField = {
    name: 'branch_id',
    label: 'Branch',
    datatype: 'select',
    values: branches.map(branch => ({name: branch.id, label: branch.name}))
  };

  useEffect(() => {
    const advOpts = getAdvOpts(query);
    const dates = advOpts.reg_date.concat(advOpts.date_of_birth);
    const inValid = isQueryInvalid(dates);
    setAllRulesValid(!inValid);
    setAdvOpts(advOpts);
  }, [query]);

  return (
    <>
      <QueryBuilder
        fields={[branchField, ...fields]}
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
      <form onSubmit={onSubmit}>
        {allRulesValid ? <button type='submit' className='btn btn-info'>Search</button> :
        <button type='submit' className='btn btn-info' style={{pointerEvents: 'none', opacity: '0.7'}} disabled={!allRulesValid}>Search</button>}
      </form>
    </>
  )
}

export default AdvancedSearch;