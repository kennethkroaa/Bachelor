import FormSection from "@components/form/FormSection";
import KiskbaCardTitle from "@components/ui/KiskbaCardTitle";
import { Router } from "@i18n";
import { setFormData, setSubmissionStep } from "@store/form/reducer";
import { scrollToTop } from "@util/Scroll";
import { MessageBar, MessageBarType, PrimaryButton, Stack } from "office-ui-fabric-react";
import { useDispatch } from "react-redux";

const FormFill: React.FunctionComponent<any> = (props) => {
    const {
        kiskbaForm,
        form
    } = props;

    const dispatch = useDispatch();

    const formContent = form.component;

    const submitSectionData = {
        title: 'Submit',
        id: 'Submit',
        description: "Pressing next will validate the form and check for errors before going to the next step.",
    }

    const onSubmit = () => {
        dispatch(setSubmissionStep(form.name));

        Router.push({
            pathname: '/form/[formType]/submission',
            query: Router.query
        }, `/form/${Router.query.formType}/submission`)
    }

    /* Display a MessageBar if submit validation fails */
    const RenderMessageBar = () => {
        return kiskbaForm.displayErrorMessageBar && (
            <div style={{marginBottom: '24px'}}>
                <MessageBar 
                    messageBarType={MessageBarType.error} 
                    isMultiline={false} 
                    dismissButtonAriaLabel="Close"
                >
                    Some errors were found during form validation.
                </MessageBar>
            </div>
        )
    }

    const SubmitSection = () => {
        return (
            <Stack horizontal>
                <PrimaryButton 
                    style={{marginTop: 8}}
                    type="submit"
                    text="Next"
                    onClick={async () => {
                        const valid = await kiskbaForm.methods.triggerValidation();
                        
                        if(!valid){
                            kiskbaForm.setDisplayErrorMessageBar(true);
                            scrollToTop();
                        } else {
                            dispatch(setFormData({
                                id: form.name,
                                values: kiskbaForm.methods.getValues({nest: true})
                            }));

                            onSubmit();
                        }
                    }}
                />
            </Stack>
        )
    }
    
    return (
        <div style={{padding: '48px'}}>
            <RenderMessageBar/>

            <form noValidate>
                <Stack tokens={{childrenGap: 24}}>
                    <KiskbaCardTitle
                        title={formContent.title}
                        description={formContent.description}
                    />

                    {formContent.sections.map((section: any, sectionIndex: number) => (
                        <div 
                            ref={(ref) => {kiskbaForm.sectionRefs[section.title] = ref}}  
                            key={sectionIndex}
                        >
                            <FormSection
                                key={section.id}
                                index={sectionIndex} 
                                section={section}
                                onInputClick={kiskbaForm.inputClick}
                            />
                        </div>
                    ))}

                    <div ref={(ref) => {kiskbaForm.sectionRefs["Submit"] = ref}}>
                        <FormSection
                            index={formContent.sections.length} 
                            section={submitSectionData}
                            Component={SubmitSection}
                            onInputClick={kiskbaForm.inputClick}
                        />
                    </div>
                </Stack>
            </form>
        </div>
    );
}

export default FormFill;