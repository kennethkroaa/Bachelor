import FormSection from "@components/form/FormSection";
import DynamicLink from "@components/router/DynamicLink";
import KiskbaTable from "@components/tables/KiskbaTable";
import KiskbaCardTitle from "@components/ui/KiskbaCardTitle";
import { Router } from "@i18n";
import { formSubmissionRequest, setReceiptStep } from "@store/form/reducer";
import { RootState } from "@store/rootReducer";
import bytes from "bytes";
import { Checkbox, CompoundButton, FontIcon, IColumn, ProgressIndicator, SelectionMode, Separator, Stack } from "office-ui-fabric-react";
import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export const dividendColumns: IColumn[] = [{
    key: 'VPSnumber',
    name: 'VPS (CSD)',
    fieldName: 'VPSnumber',
    minWidth: 50,
    maxWidth: 80,
    isResizable: false
}, {
    key: 'dateOfPayment',
    name: 'Date',
    fieldName: 'dateOfPayment',
    minWidth: 50,
    maxWidth: 80,
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
    maxWidth: 140,
    isResizable: false
}, {
    key: 'nameOfNorwegianCompany',
    name: 'Norwegian Company',
    fieldName: 'nameOfNorwegianCompany',
    minWidth: 80,
    maxWidth: 312,
    isResizable: false
}, {
    key: 'amount',
    name: 'Gross (NOK)',
    fieldName: 'amount',
    minWidth: 80,
    maxWidth: 80,
    isResizable: false,
    onRender: ({ amount }) => (
        <span
            style={{
                display: 'block',
                textAlign: 'right',
            }}
        >
            {amount}
        </span>
    )
}, {
    key: 'withholdingTax',
    name: 'Withholding tax (25%)',
    fieldName: 'withholdingTax',
    minWidth: 150,
    maxWidth: 150,
    isResizable: false,
    onRender: ({ withholdingTax }) => (
        <span
            style={{
                display: 'block',
                textAlign: 'right',
            }}
        >
            {withholdingTax}
        </span>
    )
}, {
    key: 'refundClaim',
    name: 'Refund claim (10%)',
    fieldName: 'refundClaim',
    minWidth: 80,
    maxWidth: 80,
    isResizable: false,
    onRender: ({ refundClaim }) => (
        <span
            style={{
                display: 'block',
                textAlign: 'right',
            }}
        >
            {refundClaim}
        </span>
    )
}]

const FormSubmission: React.FunctionComponent<any> = (props) => {
    const {
        kiskbaForm,
        form
    } = props;

    const fileColumns: IColumn[]  = [
        {
            key: 'fileicon',
            name: 'File Type',
            iconName: 'Page',
            isIconOnly: true,
            fieldName: 'name',
            minWidth: 16,
            maxWidth: 16,
            onRender: (file: File) => {
                /* 
                    We *could* go by file.type and use Fabric UI's icons for different file types,
                    but this involves some specific license and rules to go with.
                */
                return (
                    <FontIcon iconName="Page"/>
                )
            }
        },
        {
            key: 'filename',
            name: 'File name',
            fieldName: 'name',
            isResizable: false,
            minWidth: 100
        },
        {
            key: 'filesize',
            name: 'File size',
            fieldName: 'size',
            isResizable: false,
            minWidth: 50,
            onRender: (item: File) => {
                return (
                    <>
                        {/* Format byte size to something readable */}
                        {bytes(item.size, { 
                            unitSeparator: ' ',
                            fixedDecimals: true,
                            decimalPlaces: 2
                        })}
                    </>
                )
            }
        }
    ]
    
    const dispatch = useDispatch();

    const OverviewSection = () => {
        const { files, dividends } = kiskbaForm.methods.getValues();
        
        return (
            <>
                <Separator>
                    Dividends
                </Separator>
                <KiskbaTable
                    items={dividends}
                    columns={dividendColumns}
                    selectionMode={SelectionMode.none}
                    compact={true}
                />
                {Object.entries(files).map(([key, value]) => {
                    if(!value) return null;

                    return (
                        <Stack key={key}>
                            {/* 
                                Quick workaround since we only have
                                residency/authority/receipts as dropzone names
                            */}
                            <Separator>
                                {(key).charAt(0).toUpperCase() + (key).slice(1)}
                            </Separator>
                            <KiskbaTable
                                items={(value as any)}
                                columns={fileColumns}
                                selectionMode={SelectionMode.none}
                                compact={true}
                            />   
                        </Stack>
                    )
                })}
            </>
        )
    }

    const requestInProgress = useSelector(
        (state: RootState) => state.form.requestInProgress
    );

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

    const onSubmitSuccess = () => {
        Router.push({
            pathname: `/form/[formType]/receipt`,
            query: {
                formType: form.name
            },
        }, `/form/${form.name}/receipt`)
    }

    const onSubmitFailure = () => {
        dispatch(setReceiptStep(form.name));

        Router.push({
            pathname: `/form/[formType]/receipt`,
            query: {
                formType: form.name
            },
        }, `/form/${form.name}/receipt`)
    }

    const onSubmitClick = () => {
        dispatch(
            formSubmissionRequest({
                values: kiskbaForm.methods.getValues(),
                onSuccess: onSubmitSuccess,
                onFailure: onSubmitFailure
            })
        );
    }

    const SubmitSection = () => {
        const [ confirmed, setConfirmed ] = useState(false);

        const onChange = useCallback((ev?: React.FormEvent<HTMLElement>, checked?: boolean): void => {
            setConfirmed(checked!);
          }, []);

        return (
            <Stack style={{marginTop: 8, marginBottom: 8}}>
                <Checkbox 
                    label="I confirm that I have uploaded all the required documents."
                    checked={confirmed}
                    onChange={onChange}
                />

                <Stack horizontal tokens={{childrenGap: 24}} style={{marginTop: 24}} >
                    <CustomLink 
                        form={form}
                        path="fill"
                        title="Return"
                        secondaryText="Click here if you are unsatisfied and wish to return back to edit your form."
                    />
                    <CompoundButton
                        title="Submit"
                        secondaryText="Click here if you are satisfied and wish to submit your form."
                        onClick={onSubmitClick}
                        primary
                        disabled={!confirmed}
                    >
                        Submit
                    </CompoundButton>
                </Stack>
            </Stack>
        )
    }

    const sections = [
        {
            title: 'Overview',
            id: 'Overview',
            description: 'Below is an overview of the files and dividends you have enclosed to be submitted together with the form.',
            component: OverviewSection
        },
        {
            title: 'Confirmation',
            id: 'Confirmation',
            description: "Before you submit your form, you must confirm that you are absolutely sure you have uploaded the necessary files.",
            component: SubmitSection
        }
    ];

    return (
        <div style={{padding: '48px'}}>
            <Stack tokens={{childrenGap: 24}}>
                <KiskbaCardTitle
                    title="Submission"
                />
                
                {requestInProgress &&
                    <ProgressIndicator label="Submitting form"/>
                }

                {sections.map((section: any, sectionIndex: number) => (
                    <div 
                        ref={(ref) => {kiskbaForm.sectionRefs[section.title] = ref}}  
                        key={sectionIndex}
                    >
                        <FormSection
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