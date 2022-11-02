const mapRules = rule => {
  const exceptFields = ['branch_id', 'date_of_birth', 'registration_date'];

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

const getAdvOpts = query => {
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
    branch_ids: query.rules.filter(rule => rule.field === 'branch_id').map(mapRules),
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
    bank_account_number: query.rules.filter(rule => rule.field === 'account_number').map(mapRules),
    bank_account_name: query.rules.filter(rule => rule.field === 'bank_name').map(mapRules),
    bank_account_branch: query.rules.filter(rule => rule.field === 'bank_branch').map(mapRules),
  }
}

export {mapRules, getAdvOpts};