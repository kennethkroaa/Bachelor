import FormSection from "@components/form/FormSection";
import DynamicLink from "@components/router/DynamicLink";
import KiskbaCardTitle from "@components/ui/KiskbaCardTitle";
import { CompoundButton, IColumn, Stack } from "office-ui-fabric-react";

export const dividendColumns: IColumn[] = [{
    key: 'VPSnumber',
    name: 'VPS (CSD)',
    fieldName: 'VPSnumber',
    minWidth: 80,
    maxWidth: 80,
    isResizable: false
}, {
    key: 'dateOfPayment',
    name: 'Date',
    fieldName: 'dateOfPayment',
    minWidth: 60,
    maxWidth: 60,
    isResizable: false,
    onRender: ({ dateOfPayment }) => {
        if(!dateOfPayment) return;
        
        const { year, month, day } = dateOfPayment;

        return (
            <span>{year}-{month}-{day}</span>
        )
    }
}, {
    key: 'ISINnumber',
    name: 'ISIN',
    fieldName: 'ISINnumber',
    minWidth: 100,
    maxWidth: 100,
    isResizable: false
}, {
    key: 'nameOfNorwegianCompany',
    name: 'Norwegian Company',
    fieldName: 'nameOfNorwegianCompany',
    minWidth: 100,
    maxWidth: 240,
    isResizable: false
}, {
    key: 'amount',
    name: 'Gross (NOK)',
    fieldName: 'amount',
    minWidth: 100,
    maxWidth: 150,
    isResizable: false
}, {
    key: 'withholdingTax',
    name: 'Withholding tax (25%)',
    fieldName: 'withholdingTax',
    minWidth: 100,
    maxWidth: 150,
    isResizable: false
}, {
    key: 'refundClaim',
    name: 'Refund claim (10%)',
    fieldName: 'refundClaim',
    minWidth: 100,
    maxWidth: 100,
    isResizable: false
}]

const FormOverview: React.FunctionComponent<any> = (props) => {
    const {
        kiskbaForm,
        form
    } = props;

    const CustomLink = (props: any) => (
        <DynamicLink 
            pathname={`/form/[formType]/${props.path}`}
            query={{
                formType: form.name
            }}
            as={`/form/${form.name}/${props.path}`}
            passHref
        >
            <a>
                <CompoundButton
                    secondaryText={props.secondaryText}
                    primary={props.primary}
                    onClick={props.onClick}
                >
                    {props.title}
                </CompoundButton>
            </a>
        </DynamicLink>
    );

    const OverviewSection = () => {
        return (
            <Stack horizontal tokens={{childrenGap: 24}} style={{marginTop: 24}} >
                <CustomLink
                    primary
                    form={form}
                    path="fill"
                    title="Fill out form"
                    secondaryText="Click here to navigate to the Fill Form page, or press the Fill Form button under Navigation."
                />
            </Stack>
        )
    }

    const sections = [
        {
            title: 'Information',
            id: 'info',
            description: 'This overview section could give the user some general information about the form he or she is about to fill out. ',
            component: OverviewSection
        }
    ];

    return (
        <div style={{padding: '48px'}}>
            <Stack tokens={{childrenGap: 24}}>
                <KiskbaCardTitle
                    title="Overview"
                    description={form.component.description}
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

export default FormOverview;