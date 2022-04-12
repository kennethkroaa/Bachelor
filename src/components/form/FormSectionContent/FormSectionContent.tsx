import FormSectionStack from "@components/form/FormSectionStack";
import { Controller, FieldError, useFormContext } from "react-hook-form";
import { FormSectionContentProps } from "./FormSectionContent.types";

/*
    FormSectionContent takes care of either splitting up a section into Flex-based
    columns based on props, or displaying a react-hook-form controlled input component

    Errors and values are handled through a components displayName, which is not ideal
    in a production environment as names can be scrambled, but a workaround for this
    PoC is to use a mix of both middleware and adding displayNames manually to ensure
    things work as expected
*/

/*
    At the end of the project, we noticed errors no longer showed up
    This was due to editing the form from pure ids to nested ids,
    such as ClaimantFirstName to claimant.fullName.firstName

    To workaround this with very little time left, we found an Object
    function that gets values by a string value, and use this to fetch
    errors instead

    https://stackoverflow.com/questions/6491463/accessing-nested-javascript-objects-and-arays-by-string-path
*/
//@ts-ignore
Object.byString = function(o, s) {
    s = s.replace(/\[(\w+)\]/g, '.$1'); // convert indexes to properties
    s = s.replace(/^\./, '');           // strip a leading dot
    var a = s.split('.');
    for (var i = 0, n = a.length; i < n; ++i) {
        var k = a[i];
        if (k in o) {
            o = o[k];
        } else {
            return;
        }
    }
    return o;
}

const FormSectionContent = ({ item, sectionTitle, onInputClick }: FormSectionContentProps) => {
    const { 
        control,
        errors
    } = useFormContext(); //Context is hooked up to FormLayout

    const component = item["component"];
    const columns = item["columns"];
    const componentValues = component ? item[component?.displayName] : {};

    let errorMessages: any = [];

    if(!columns){
        //@ts-ignore
        const values = Object.byString(errors, componentValues.name);

        if(values)
            errorMessages = (values as FieldError).message;
    }

    return (
        <>
            {columns ? 
                <FormSectionStack 
                    onInputClick={onInputClick} 
                    sectionTitle={sectionTitle} 
                    columns={columns}
                />
            : 
                <Controller
                    { ...componentValues }
                    onClick={() => onInputClick(sectionTitle)}
                    errors={errorMessages}
                    control={control}
                    as={component}
                />
            }
        </>
    )
}

export default FormSectionContent;