const mapRules = rule => {
        const exceptFields = ['branch_id', 'group_date', 'registration_date'];
        // const exceptFields = ['branch_id', 'registration_date'];
        // const exceptFields = ['branch_id'];
    
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
            group_date: query.rules.filter(rule => rule.field === 'group_date').map(mapRules),
            reg_date: query.rules.filter(rule => rule.field === 'registration_date').map(mapRules),
            status: query.rules.filter(rule => rule.field === 'status').map(mapRules),
            group_name: query.rules.filter(rule => rule.field === 'group_name').map(mapRules),
            address: query.rules.filter(rule => rule.field === 'address').map(mapRules),
            group_phone_number: query.rules.filter(rule => rule.field === 'group_phone_number').map(mapRules),
            group_account_number: query.rules.filter(rule => rule.field === 'group_account_number').map(mapRules),
            group_id: query.rules.filter(rule => rule.field === 'group_id').map(mapRules),
            group_type: query.rules.filter(rule => rule.field === 'group_type__name').map(mapRules),
            branch_ids: query.rules.filter(rule => rule.field === 'branch_id').map(mapRules),
        }
    }
  
  export {mapRules, getAdvOpts};