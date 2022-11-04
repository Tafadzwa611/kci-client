import React, { useState, useEffect } from 'react';
import { QueryBuilder } from 'react-querybuilder';
import CombinatorSelector from '../../../Clients/ClientsList/AdvancedSearch/CombinatorSelector';
import fields from './Fields';
import getOperators from './getOperators';
import ValueEditor from '../../../Clients/ClientsList/AdvancedSearch/ValueEditor';
import AddRuleAction from '../../../Clients/ClientsList/AdvancedSearch/AddRuleAction';
import RemoveRuleAction from '../../../Clients/ClientsList/AdvancedSearch/RemoveRuleAction';
import {getAdvOpts} from './utils';
import {isQueryInvalid} from '../../../Clients/ClientsList/AdvancedSearch/validations';
import FieldSelector from '../../../Clients/ClientsList/AdvancedSearch/FieldSelector';
import OperatorSelector from '../../../Clients/ClientsList/AdvancedSearch/OperatorSelector';

function AdvancedSearchOtherIncome({setAdvOpts, onSubmit, branches, details}) {
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
    const dates = advOpts.date_created.concat(advOpts.income_date);
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
      {details ?
        <form onSubmit={onSubmit}>
          <button type='submit' className='btn btn-olive' style={{pointerEvents: 'none', opacity: '0.7'}} disabled='disabled'>Search</button>
        </form>:
        <form onSubmit={onSubmit}>
          {allRulesValid ? <button type='submit' className='btn btn-olive'>Search</button> :
          <button type='submit' className='btn btn-olive' style={{pointerEvents: 'none', opacity: '0.7'}} disabled={!allRulesValid}>Search</button>}
        </form>
      }
    </>
  )
}

export default AdvancedSearchOtherIncome;