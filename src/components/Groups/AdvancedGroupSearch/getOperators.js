import { defaultOperators } from 'react-querybuilder';

const getOperators = (field) => {
  switch (field) {
    case 'group_date':
    case 'registration_date':
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
    case 'status':
      return [
        {name: '=', label: 'is'},
        {name: '!=', label: 'is not'}
      ]
    case 'group_name':
    case 'address':
    case 'group_phone_number':
    case 'group_account_number':
    case 'group_id':
    case 'group_type__name':
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