import FormSection from "@components/form/FormSection";
import KiskbaCardTitle from "@components/ui/KiskbaCardTitle";
import { Router } from '@i18n';
import { CompoundButton, Stack } from "office-ui-fabric-react";
import { useDispatch } from "react-redux";
import { formReset } from "@store/form/reducer";

const FormSubmission: React.FunctionComponent<any> = (props) => {
    const { kiskbaForm } = props;

    const dispatch = useDispatch();

    const returnHome = () => {
        Router.push('/')
        dispatch(formReset());
    }

    const ReceiptSection = () => {
        return (
            <Stack horizontal tokens={{childrenGap: 24}} style={{marginTop: 24}}>
                <CompoundButton 
                    secondaryText="Return to the home page."
                    onClick={returnHome}
                >
                    Home
                </CompoundButton>

                <CompoundButton 
                    secondaryText="Downloads a copy of your receipt."
                    primary
                >
                    Download Receipt
                </CompoundButton>
            </Stack>
        )
    }

    const sections = [
        {
            title: 'Your form has been submitted.',
            id: 'formsubmitted',
            description: 'You can download a copy of your receipt by pressing the Download Receipt button. (A receipt has not been implemented.)',
            component: ReceiptSection
        }
    ];

    return (
        <div style={{padding: '48px'}}>
            <Stack tokens={{childrenGap: 24}}>
                <KiskbaCardTitle
                    title="Receipt"
                />

                {sections.map((section: any, sectionIndex: number) => (
                    <div 
                        ref={(ref) => {kiskbaForm.sectionRefs[section.title] = ref}}  
                        key={sectionIndex}
                    >
                        <FormSection
                            hideIndex
                            index={sectionIndex} 
                            section={section}
                            Component={section.component}
                            onInputClick={kiskbaForm.inputClick}
                        />
                    </div>
                ))}
            </Stack>
        </div>
    );
}

export default FormSubmission;