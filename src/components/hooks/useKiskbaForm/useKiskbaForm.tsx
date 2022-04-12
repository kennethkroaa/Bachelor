import { IKiskbaForm } from "@data/forms/types";
import { formStepper } from "@data/steppers/formStepper";
import { initializeForm } from "@store/form/reducer";
import { RootState } from "@store/rootReducer";
import resolver from "@util/ValidationResolver";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

/*
    Earlier in the project we used section refs to be able to highlight
    what section you were on whenever you clicked on an input.
    We noticed much later that this at one point broke, and we didn't have
    the adequate time to look at it.  
*/

const useKiskbaForm = (form: IKiskbaForm, id?: string) => {
    const dispatch = useDispatch();

    /* Current selected section displayed on SideRail */
    const [ 
        selectedSection, 
        setSelectedSection 
    ] = useState<string>("");

    /* Display an error message */
    const [ 
        displayErrorMessageBar, 
        setDisplayErrorMessageBar 
    ] = useState<boolean>(false);
    
    const data = useSelector(
        (state: RootState) => state.form.data[(id as any)]
    );

    /* React-hook-form configuration */
    const methods = useForm<IKiskbaForm>(
        {
            validationResolver: resolver,
            validationContext: { 
                abortEarly: false,
                schema: form.validator
            },
            mode: 'onBlur',
            reValidateMode: 'onBlur',
            defaultValues: data ? data.values : {}
        }
    );

    useEffect(() => {
        /* Populate section references from form data */
        form.sections.forEach((value: any) => {
            sectionRefFields.push({
                sectionName: value.title,
                sectionFields: value.fields
            })
        })

        if(!data){
            dispatch(initializeForm({
                id: id,
                stepper: formStepper
            }));
        }
    })

    /* Array to hold refs of section cards for scroll functionality */
    const sectionRefs: any = [];
    /* Array to hold references to a sections name and fields so we
    correctly know where to show errors in SideRail */
    const sectionRefFields: any = [];

    /* Added to every field so we know which section we are in on click */
    const inputClick = (section: string) => {
        setSelectedSection(section);
    }

    return {
        selectedSection,
        setSelectedSection,
        displayErrorMessageBar,
        setDisplayErrorMessageBar,
        methods,
        inputClick,
        sectionRefs,
        sectionRefFields,
        data
    }
};

export default useKiskbaForm;