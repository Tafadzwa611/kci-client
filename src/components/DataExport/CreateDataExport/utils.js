import { defaultOperators } from 'react-querybuilder';

const mapRules = rule => {
  const exceptFields = [
    'branch_id',
    'loan__branch_id',
    'currency_id',
    'loan__currency_id',
    'date_of_birth',
    'registration_date',
    'group_date',
    'loan_added_on',
    'approval_date',
    'application_date',
    'group_date',
    'value_date',
    'group__branch_id',
    'group__group_date',
    'group__registration_date',
    'register_date',
    'date_created',
    'auto_now_date_added',
    'date_paid',
  ];

  switch (rule.operator) {
    case '=':
      return exceptFields.includes(rule.field) ? {[rule.field] : rule.value} : {[`${rule.field}__iexact`]: rule.value}
    case '!=':
      return exceptFields.includes(rule.field) ? {[`not_${rule.field}`] : rule.value} : {[`not_${rule.field}__iexact`]: rule.value}
    case '<':
      return {[`${rule.field}__lt`]: rule.value}
    case '>':
      return {[`${rule.field}__gt`]: rule.value}
    case '<=':
      return {[`${rule.field}__lte`]: rule.value}
    case '>=':
      return {[`${rule.field}__gte`]: rule.value}
    case 'between':
      return {[`${rule.field}__range`]: rule.value.split(',')}
    case 'notBetween':
      return {[`not_${rule.field}__range`]: rule.value.split(',')}
    case 'contains':
      return {[`${rule.field}__icontains`]: rule.value}
    case 'doesNotContain':
      return {[`not_${rule.field}__icontains`]: rule.value}
    case 'beginsWith':
      return {[`${rule.field}__istartswith`]: rule.value}
    case 'doesNotBeginWith':
      return {[`not_${rule.field}__istartswith`]: rule.value}
    case 'endsWith':
      return {[`${rule.field}__iendswith`]: rule.value}
    case 'doesNotEndWith':
      return {[`not_${rule.field}__iendswith`]: rule.value}
  }
}

const processBackEndSearch = search => {
  const rules = [];
  const getOperator = (search_key, rule_key) => {
    return {
      [search_key]: '=',
      [`${search_key}__iexact`]: '=',
      [`not_${search_key}`]: '!=',
      [`not_${search_key}__iexact`]: '!=',
      [`${search_key}__lt`]: '<',
      [`${search_key}__gt`]: '>',
      [`${search_key}__lte`]: '<=',
      [`${search_key}__gte`]: '>=',
      [`${search_key}__range`]: 'between',
      [`not_${search_key}__range`]: 'notBetween',
      [`${search_key}__icontains`]: 'contains',
      [`not_${search_key}__icontains`]: 'doesNotContain',
      [`${search_key}__istartswith`]: 'beginsWith',
      [`not_${search_key}__istartswith`]: 'doesNotBeginWith',
      [`${search_key}__iendswith`]: 'endsWith',
      [`not_${search_key}__iendswith`]: 'doesNotEndWith',
    }[rule_key]
  }

  const combinator = search.combinator.toLowerCase();

  for (const search_key in search) {
    if (search_key === 'combinator') continue; // Skip combinator key
    search[search_key].forEach(rule => {
      for (const rule_key in rule) {
        const operator = getOperator(search_key, rule_key);
        let value = rule[rule_key];
        if (Array.isArray(value)) {
          value = value.join(',');
        }
        rules.push({
          "field": search_key,
          "operator": operator,
          "value": value
        })
      }
    });
  }
  return {id: "root", combinator: combinator, rules: [{field: 'date_of_birth', operator: 'between', value: '09/06/2025,30/06/2025', id: 'r-0.38471380341972106'}]}
}

const getOperators = (field) => {
  switch (field) {
    case 'date_of_birth':
    case 'registration_date':
    case 'group_date':
    case 'loan_added_on':
    case 'approval_date':
    case 'application_date':
    case 'value_date':
    case 'group__group_date':
    case 'group__registration_date':
    case 'register_date':
    case 'date_created':
    case 'date_paid':
    case 'auto_now_date_added':
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
    case 'loan__currency_id':
    case 'currency_id':
    case 'loan__branch_id':
    case 'status':
    case 'addresses__ownership':
    case 'txn_type':
    case 'entry_type':
    case 'ownership':
    case 'group__status':
    case 'group__branch_id':
    case 'balance_status':
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
    case 'group_name':
    case 'address':
    case 'group_id':
    case 'group_phone_number':
    case 'group_type__name':
    case 'loan_id':
    case 'group__group_name':
    case 'client__name':
    case 'relationship':
    case 'city':
    case 'country':
    case 'role__name':
    case 'collateral_type__name':
    case 'product_name':
    case 'transaction_id':
    case 'client_name':
    case 'receipt_number':
    case 'notes':
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
    case 'period':
    case 'principal':
    case 'interest':
    case 'fees':
    case 'penalty':
    case 'installment':
    case 'principal_due':
    case 'interest_due':
    case 'fees_due':
    case 'penalty_due':
    case 'principal_on_settlement':
    case 'interest_on_settlement':
    case 'penalty_on_settlement':
    case 'fees_on_settlement':
    case 'amount':
    case 'balance':
    case 'value':
    case 'amount_debited':
    case 'amount_paid':
    case 'principal_amount_paid':
    case 'interest_amount_paid':
    case 'money_to_be_refunded':
      return [
        { name: '=', label: 'is' },
        { name: '!=', label: 'is not' },
        { name: '<', label: 'is before' },
        { name: '>', label: 'is after' },
        { name: '<=', label: 'is on or before' },
        { name: '>=', label: 'is on or after' },
      ];
    default:
      return defaultOperators;
  }
};


const getGroupAdvOpts = query => {
  return {
    combinator: {and: 'AND', or: 'OR'}[query.combinator],
    group_date: query.rules.filter(rule => rule.field === 'group_date').map(mapRules),
    registration_date: query.rules.filter(rule => rule.field === 'registration_date').map(mapRules),
    status: query.rules.filter(rule => rule.field === 'status').map(mapRules),
    group_name: query.rules.filter(rule => rule.field === 'group_name').map(mapRules),
    address: query.rules.filter(rule => rule.field === 'address').map(mapRules),
    group_id: query.rules.filter(rule => rule.field === 'group_id').map(mapRules),
    group_phone_number: query.rules.filter(rule => rule.field === 'group_phone_number').map(mapRules),
    group_type__name: query.rules.filter(rule => rule.field === 'group_type__name').map(mapRules),
    branch_id: query.rules.filter(rule => rule.field === 'branch_id').map(mapRules),
  }
}

const getLoanAdvOpts = query => {
  return {
    combinator: {and: 'AND', or: 'OR'}[query.combinator],
    client__name: query.rules.filter(rule => rule.field === 'client__name').map(mapRules),
    group__group_name: query.rules.filter(rule => rule.field === 'group__group_name').map(mapRules),
    loan_id: query.rules.filter(rule => rule.field === 'loan_id').map(mapRules),
    loan_added_on: query.rules.filter(rule => rule.field === 'loan_added_on').map(mapRules),
    approval_date: query.rules.filter(rule => rule.field === 'approval_date').map(mapRules),
    application_date: query.rules.filter(rule => rule.field === 'application_date').map(mapRules),
  }
}

const getClientAdvOpts = query => {
  return {
    combinator: {and: 'AND', or: 'OR'}[query.combinator],
    date_of_birth: query.rules.filter(rule => rule.field === 'date_of_birth').map(mapRules),
    status: query.rules.filter(rule => rule.field === 'status').map(mapRules),
    full_name: query.rules.filter(rule => rule.field === 'fullname').map(mapRules),
    first_name: query.rules.filter(rule => rule.field === 'first_name').map(mapRules),
    last_name: query.rules.filter(rule => rule.field === 'last_name').map(mapRules),
    gender: query.rules.filter(rule => rule.field === 'gender').map(mapRules),
    client_id: query.rules.filter(rule => rule.field === 'client_id').map(mapRules),
    client_type: query.rules.filter(rule => rule.field === 'client_type__name').map(mapRules),
    reg_date: query.rules.filter(rule => rule.field === 'registration_date').map(mapRules),
    branch_id: query.rules.filter(rule => rule.field === 'branch_id').map(mapRules),
    email: query.rules.filter(rule => rule.field === 'email').map(mapRules),
    phone_number: query.rules.filter(rule => rule.field === 'phone_number').map(mapRules),
    phone_number_secondary: query.rules.filter(rule => rule.field === 'phone_number_secondary').map(mapRules),
    whatsapp_number: query.rules.filter(rule => rule.field === 'whatsapp_number').map(mapRules),
    home_phone: query.rules.filter(rule => rule.field === 'home_phone').map(mapRules),
    address: query.rules.filter(rule => rule.field === 'addresses__address').map(mapRules),
    ownership: query.rules.filter(rule => rule.field === 'addresses__ownership').map(mapRules),
    city: query.rules.filter(rule => rule.field === 'addresses__city').map(mapRules),
    country: query.rules.filter(rule => rule.field === 'addresses__country').map(mapRules),
    nok_first_name: query.rules.filter(rule => rule.field === 'noks__first_name').map(mapRules),
    nok_last_name: query.rules.filter(rule => rule.field === 'noks__last_name').map(mapRules),
    nok_phone_number: query.rules.filter(rule => rule.field === 'noks__phone_number').map(mapRules),
    nok_address: query.rules.filter(rule => rule.field === 'noks__address').map(mapRules),
    nok_city: query.rules.filter(rule => rule.field === 'noks__city').map(mapRules),
    nok_country: query.rules.filter(rule => rule.field === 'noks__country').map(mapRules),
    nok_gender: query.rules.filter(rule => rule.field === 'noks__gender').map(mapRules),
  }
}

const getInstallmentAdvOpts = query => {
  return {
    combinator: {and: 'AND', or: 'OR'}[query.combinator],
    period: query.rules.filter(rule => rule.field === 'period').map(mapRules),
    payment_date: query.rules.filter(rule => rule.field === 'payment_date').map(mapRules),
    principal: query.rules.filter(rule => rule.field === 'principal').map(mapRules),
    interest: query.rules.filter(rule => rule.field === 'interest').map(mapRules),
    fees: query.rules.filter(rule => rule.field === 'fees').map(mapRules),
    penalty: query.rules.filter(rule => rule.field === 'penalty').map(mapRules),
    installment: query.rules.filter(rule => rule.field === 'installment').map(mapRules),
    principal_due: query.rules.filter(rule => rule.field === 'principal_due').map(mapRules),
    interest_due: query.rules.filter(rule => rule.field === 'interest_due').map(mapRules),
    fees_due: query.rules.filter(rule => rule.field === 'fees_due').map(mapRules),
    penalty_due: query.rules.filter(rule => rule.field === 'penalty_due').map(mapRules),
    principal_on_settlement: query.rules.filter(rule => rule.field === 'principal_on_settlement').map(mapRules),
    interest_on_settlement: query.rules.filter(rule => rule.field === 'interest_on_settlement').map(mapRules),
    penalty_on_settlement: query.rules.filter(rule => rule.field === 'penalty_on_settlement').map(mapRules),
    fees_on_settlement: query.rules.filter(rule => rule.field === 'fees_on_settlement').map(mapRules),
    status: query.rules.filter(rule => rule.field === 'status').map(mapRules),
    loan__branch_id: query.rules.filter(rule => rule.field === 'loan__branch_id').map(mapRules),
    loan__currency_id: query.rules.filter(rule => rule.field === 'loan__currency_id').map(mapRules),
  }
}

const getTxnAdvOpts = query => {
  return {
    combinator: {and: 'AND', or: 'OR'}[query.combinator],
    loan__branch_id: query.rules.filter(rule => rule.field === 'loan__branch_id').map(mapRules),
    loan__currency_id: query.rules.filter(rule => rule.field === 'loan__currency_id').map(mapRules),
    value_date: query.rules.filter(rule => rule.field === 'value_date').map(mapRules),
    txn_type: query.rules.filter(rule => rule.field === 'txn_type').map(mapRules),
    entry_type: query.rules.filter(rule => rule.field === 'entry_type').map(mapRules),
    amount: query.rules.filter(rule => rule.field === 'amount').map(mapRules),
    balance: query.rules.filter(rule => rule.field === 'balance').map(mapRules),
  }
}

const getNokAdvOpts = query => {
  return {
    combinator: {and: 'AND', or: 'OR'}[query.combinator],
    client__branch_id: query.rules.filter(rule => rule.field === 'client__branch_id').map(mapRules),
    client__name: query.rules.filter(rule => rule.field === 'client__name').map(mapRules),
    first_name: query.rules.filter(rule => rule.field === 'first_name').map(mapRules),
    last_name: query.rules.filter(rule => rule.field === 'last_name').map(mapRules),
    relationship: query.rules.filter(rule => rule.field === 'relationship').map(mapRules),
    phone_number: query.rules.filter(rule => rule.field === 'phone_number').map(mapRules),
    address: query.rules.filter(rule => rule.field === 'address').map(mapRules),
    city: query.rules.filter(rule => rule.field === 'city').map(mapRules),
    country: query.rules.filter(rule => rule.field === 'country').map(mapRules),
    ownership: query.rules.filter(rule => rule.field === 'ownership').map(mapRules),
    gender: query.rules.filter(rule => rule.field === 'gender').map(mapRules),
  }
}

const getAddressAdvOpts = query => {
  return {
    combinator: {and: 'AND', or: 'OR'}[query.combinator],
    client__branch_id: query.rules.filter(rule => rule.field === 'client__branch_id').map(mapRules),
    client__name: query.rules.filter(rule => rule.field === 'client__name').map(mapRules),
    address: query.rules.filter(rule => rule.field === 'address').map(mapRules),
    city: query.rules.filter(rule => rule.field === 'city').map(mapRules),
    country: query.rules.filter(rule => rule.field === 'country').map(mapRules),
    ownership: query.rules.filter(rule => rule.field === 'ownership').map(mapRules),
  }
}

const getMemberAdvOpts = query => {
  return {
    combinator: {and: 'AND', or: 'OR'}[query.combinator],
    group__branch_id: query.rules.filter(rule => rule.field === 'group__branch_id').map(mapRules),
    group__group_name: query.rules.filter(rule => rule.field === 'group__group_name').map(mapRules),
    group__group_date: query.rules.filter(rule => rule.field === 'group__group_date').map(mapRules),
    group__registration_date: query.rules.filter(rule => rule.field === 'group__registration_date').map(mapRules),
    role__name: query.rules.filter(rule => rule.field === 'role__name').map(mapRules),
    group__status: query.rules.filter(rule => rule.field === 'group__status').map(mapRules),
  }
}

const getCollateralAdvOpts = query => {
  return {
    combinator: {and: 'AND', or: 'OR'}[query.combinator],
    loan__branch_id: query.rules.filter(rule => rule.field === 'loan__branch_id').map(mapRules),
    currency_id: query.rules.filter(rule => rule.field === 'currency_id').map(mapRules),
    collateral_type__name: query.rules.filter(rule => rule.field === 'collateral_type__name').map(mapRules),
    product_name: query.rules.filter(rule => rule.field === 'product_name').map(mapRules),
    value: query.rules.filter(rule => rule.field === 'value').map(mapRules),
    register_date: query.rules.filter(rule => rule.field === 'register_date').map(mapRules),
  }
}

const getJournalAdvOpts = query => {
  return {
    combinator: {and: 'AND', or: 'OR'}[query.combinator],
    branch_debited_id: query.rules.filter(rule => rule.field === 'branch_debited_id').map(mapRules),
    branch_credited_id: query.rules.filter(rule => rule.field === 'branch_credited_id').map(mapRules),
    currency_id: query.rules.filter(rule => rule.field === 'currency_id').map(mapRules),
    branch_id: query.rules.filter(rule => rule.field === 'branch_id').map(mapRules),
    amount_debited: query.rules.filter(rule => rule.field === 'amount_debited').map(mapRules),
    status: query.rules.filter(rule => rule.field === 'status').map(mapRules),
    balance_status: query.rules.filter(rule => rule.field === 'balance_status').map(mapRules),
    date_created: query.rules.filter(rule => rule.field === 'date_created').map(mapRules),
    auto_now_date_added: query.rules.filter(rule => rule.field === 'auto_now_date_added').map(mapRules),
    transaction_id: query.rules.filter(rule => rule.field === 'transaction_id').map(mapRules),
    client_name: query.rules.filter(rule => rule.field === 'client_name').map(mapRules),
    client_id: query.rules.filter(rule => rule.field === 'client_id').map(mapRules),
  }
}

const getPaymentsAdvOpts = query => {
  return {
    combinator: {and: 'AND', or: 'OR'}[query.combinator],
    branch_id: query.rules.filter(rule => rule.field === 'branch_id').map(mapRules),
    currency_id: query.rules.filter(rule => rule.field === 'currency_id').map(mapRules),
    amount_paid: query.rules.filter(rule => rule.field === 'amount_paid').map(mapRules),
    principal_amount_paid: query.rules.filter(rule => rule.field === 'principal_amount_paid').map(mapRules),
    interest_amount_paid: query.rules.filter(rule => rule.field === 'interest_amount_paid').map(mapRules),
    fees: query.rules.filter(rule => rule.field === 'fees').map(mapRules),
    penalty: query.rules.filter(rule => rule.field === 'penalty').map(mapRules),
    money_to_be_refunded: query.rules.filter(rule => rule.field === 'money_to_be_refunded').map(mapRules),
    date_paid: query.rules.filter(rule => rule.field === 'date_paid').map(mapRules),
    date_created: query.rules.filter(rule => rule.field === 'date_created').map(mapRules),
    receipt_number: query.rules.filter(rule => rule.field === 'receipt_number').map(mapRules),
    notes: query.rules.filter(rule => rule.field === 'notes').map(mapRules),
  }
}

const getAdvOpts = base_entity => {
  return {
    CLIENT: getClientAdvOpts,
    GROUP: getGroupAdvOpts,
    LOAN: getLoanAdvOpts,
    INSTALLMENT: getInstallmentAdvOpts,
    TXN: getTxnAdvOpts,
    NOK: getNokAdvOpts,
    ADDRESS: getAddressAdvOpts,
    MEMBER: getMemberAdvOpts,
    COLLATERAL: getCollateralAdvOpts,
    JOURNAL: getJournalAdvOpts,
    PAYMENT: getPaymentsAdvOpts,
  }[base_entity]
}

export {getOperators, getAdvOpts, processBackEndSearch};