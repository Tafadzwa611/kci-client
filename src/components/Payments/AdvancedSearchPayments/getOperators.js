import { defaultOperators } from 'react-querybuilder';

const getOperators = (field) => {
  switch (field) {
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
    case 'amount_paid':
    case 'principal_amount_paid':
    case 'interest_amount_paid':
    case 'fees':
    case 'penalty':
      return [
        { name: '=', label: 'is' },
        { name: '!=', label: 'is not' },
        { name: '<', label: 'less than' },
        { name: '>', label: 'greater than' },
        { name: '<=', label: 'less than or equal to' },
        { name: '>=', label: 'greater than or equal to' },
        { name: 'between', label: 'between' },
        { name: 'notBetween', label: 'not between' },
      ];
    case 'payment_method':
    case 'payment_type':
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