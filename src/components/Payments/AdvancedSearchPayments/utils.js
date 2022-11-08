const mapRules = rule => {
    const exceptFields = ['branch_id', 'date_created'];
  
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
        date_created: query.rules.filter(rule => rule.field === 'date_created').map(mapRules),
        amount_paid: query.rules.filter(rule => rule.field === 'amount_paid').map(mapRules),
        principal_amount_paid: query.rules.filter(rule => rule.field === 'principal_amount_paid').map(mapRules),
        interest_amount_paid: query.rules.filter(rule => rule.field === 'interest_amount_paid').map(mapRules),
        fees: query.rules.filter(rule => rule.field === 'fees').map(mapRules),
        penalty: query.rules.filter(rule => rule.field === 'penalty').map(mapRules),
        payment_method: query.rules.filter(rule => rule.field === 'payment_method').map(mapRules),
        payment_type: query.rules.filter(rule => rule.field === 'payment_type').map(mapRules),
        branch_ids: query.rules.filter(rule => rule.field === 'branch_id').map(mapRules),
    }
  }
  
  export {mapRules, getAdvOpts};