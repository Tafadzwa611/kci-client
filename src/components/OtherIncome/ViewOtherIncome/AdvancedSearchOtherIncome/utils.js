const mapRules = rule => {
    const exceptFields = ['branch_id', 'income_date', 'date_created'];
  
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
      income_date: query.rules.filter(rule => rule.field === 'income_date').map(mapRules),
      otherincome_name: query.rules.filter(rule => rule.field === 'otherincome_name').map(mapRules),
      reference: query.rules.filter(rule => rule.field === 'reference').map(mapRules),
      income_amount: query.rules.filter(rule => rule.field === 'income_amount').map(mapRules),
      description: query.rules.filter(rule => rule.field === 'description').map(mapRules),
      date_created: query.rules.filter(rule => rule.field === 'date_created').map(mapRules),
      branch_ids: query.rules.filter(rule => rule.field === 'branch_id').map(mapRules),
    }
  }
  
  export {mapRules, getAdvOpts};