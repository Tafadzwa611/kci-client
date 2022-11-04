import { defaultOperators } from 'react-querybuilder';

const getOperators = (field) => {
  switch (field) {
    case 'expense_date':
    case 'date_created':
      return [
        { name: '=', label: 'is' },
        { name: '!=', label: 'is not' },
        { name: '<', label: 'is before' },
        { name: '>', label: 'is after' },
        { name: '<=', label: 'is on or before' },
        { name: '>=', label: 'is on or after' },
        { name: 'between', label: 'between' },
        { name: 'notBetween', label: 'not between' },
      ];
    case 'branch_id':
      return [
        {name: '=', label: 'is'},
        {name: '!=', label: 'is not'}
      ]
    case 'expense_name':
    case 'reference':
    case 'expense_amount':
    case 'description':
      return [
        {name: '=', label: 'is'},
        {name: '!=', label: 'is not'},
        {name: 'contains', label: 'contains'},
        {name: 'doesNotContain', label: 'does not contain'},
        {name: 'beginsWith', label: 'begins with'},
        {name: 'doesNotBeginWith', label: 'does not begin with'},
        {name: 'endsWith', label: 'ends with'},
        {name: 'doesNotEndWith', label: 'does not end with'},
      ]
    default:
      return defaultOperators;
  }
};

export default getOperators;