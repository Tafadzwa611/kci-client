import { defaultOperators } from 'react-querybuilder';

const getOperators = (field) => {
  switch (field) {
    case 'date_of_birth':
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
    case 'gender':
    case 'noks__gender':
    case 'branch_id':
    case 'status':
    case 'addresses__ownership':
      return [
        {name: '=', label: 'is'},
        {name: '!=', label: 'is not'}
      ]
    case 'fullname':
    case 'noks__first_name':
    case 'noks__last_name':
    case 'noks__phone_number':
    case 'noks__address':
    case 'noks__city':
    case 'noks__country':
    case 'first_name':
    case 'last_name':
    case 'email':
    case 'phone_number':
    case 'phone_number_secondary':
    case 'whatsapp_number':
    case 'home_phone':
    case 'addresses__address':
    case 'client_id':
    case 'client_type__name':
    case 'addresses__city':
    case 'addresses__country':
    case 'bank_name':
    case 'bank_branch':
    case 'account_number':
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