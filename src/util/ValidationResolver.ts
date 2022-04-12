const reducer = (total: any, currentValue: any) => {
    let path = currentValue.path;
    
    if(!total[path])
        total[path] = {
            message: []
        };

    total[path].message.push(currentValue.errors[0])

    return total;
}
  
const resolver = (data: any, validationContext: any) => {
    let innerErrors: any;

    try {
        validationContext.schema.validateSync(data, {
            ...validationContext
        });
    } catch(errors){
        innerErrors = errors.inner;
    }

    const validationErrors = innerErrors !== undefined ?
        innerErrors.reduce(reducer, {}) : {};

    return {
        values: validationErrors ? {} : {},
        errors: validationErrors
    }
};

export default resolver;