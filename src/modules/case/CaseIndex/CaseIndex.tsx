import FormSection from "@components/form/FormSection";
import { getCaseRequest } from "@store/case/reducer";
import { RootState } from "@store/rootReducer";
import { DefaultButton, DetailsList, DetailsListLayoutMode, DetailsRow, getTheme, IColumn, IDetailsFooterProps, IDetailsRowBaseProps, ITextFieldStyleProps, ITextFieldStyles, SelectionMode, Separator, Stack, StackItem, TextField, Checkbox } from "office-ui-fabric-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export const dividendColumns: IColumn[] = [{
    key: 'vpsnumber',
    name: 'VPS (CSD)',
    fieldName: 'vpsnumber',
    minWidth: 50,
    maxWidth: 80,
    isResizable: true
}, {
    key: 'dateOfPayment',
    name: 'Date',
    fieldName: 'dateOfPayment',
    minWidth: 50,
    maxWidth: 80,
    isResizable: true
}, {
    key: 'isinnumber',
    name: 'ISIN',
    fieldName: 'isinnumber',
    minWidth: 100,
    maxWidth: 140,
    isResizable: true
}, {
    key: 'nameOfNorwegianCompany',
    name: 'Norwegian Company',
    fieldName: 'nameOfNorwegianCompany',
    minWidth: 80,
    maxWidth: 312,
    isResizable: true
}, {
    key: 'amount',
    name: 'Gross (NOK)',
    fieldName: 'amount',
    minWidth: 80,
    maxWidth: 80,
    isResizable: true,
}, {
    key: 'withholdingTax',
    name: 'Withholding tax (25%)',
    fieldName: 'withholdingTax',
    minWidth: 150,
    maxWidth: 150,
    isResizable: true
}, {
    key: 'refundClaim',
    name: 'Refund claim (10%)',
    fieldName: 'refundClaim',
    minWidth: 80,
    maxWidth: 130,
    isResizable: true
}]

const fieldStyles = (props: ITextFieldStyleProps): Partial<ITextFieldStyles> => {
    const theme = getTheme();

    return {
        subComponentStyles: {
            label: {
                root: {
                    color: theme.palette.black,
                }
            }
        },
        field: {
            backgroundColor: 'white',
            color: theme.palette.black,
            fontSize: '12px'
        },
        fieldGroup: {
            borderColor: theme.semanticColors.inputBorder
        }
    }
}

const stackTokens = {
    childrenGap: 12
}

const CaseIndex = (props: any) => {
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(getCaseRequest(props.id));
    }, []);
    
    const { requestInProgress, data, files } = useSelector(
        (state: RootState) => state.case
    );
    
    /* 
        Since this page was made in a huge hurry, we don't have any
        proper data management regarding the type of form/whether or not
        data exists/and some problems with data not existing on page load
        due to the async nature of it.
        We simply return an empty page until data is available.
    */
    if (!data || Object.entries(data).length === 0) return null;

    console.log(data);

    /* Claimant Name */
    const { 
        firstName: claimantFirstName,
        middleName: claimantMiddleName, 
        lastName: claimantLastName 
    } = data.claimant.fullName;

    /* Claimant Address Data */
    const { 
        city: claimantCity, 
        countryOfResidence: { 
            originCountry: claimantCountry 
        }, 
        postalCode: claimantPostalCode, 
        streetAddress: claimantStreetAddress 
    } = data.claimant.address;

    const DownloadButton = (props: any) => {
        return (
            <Stack horizontal tokens={{childrenGap: 12}}>
            <Checkbox 
                styles={{
                    root: {
                        position: 'relative', 
                        top: '10px',
                    }
                }} 
            />
            <DefaultButton
                { ...props }
                style={{
                    position: 'relative',
                    top: '4px',
                    width: '100%'
                }}
                iconProps={{ iconName: 'Download' }} 
                ariaLabel="Download file"
                href={props.location}
                target="_blank"
                download
            />      
            </Stack>      
        )
    }

    //Renderer for the list footer items
    const renderDetailsFooterItemColumnAmount: IDetailsRowBaseProps['onRenderItemColumn'] = (item, index, column) => {
        if (column) {
            return (
                <div>
                    {column.name == "Gross (NOK)" && 
                        <b> {data.sumGrossAmount} </b>
                    }
                    {column.name == "Withholding tax (25%)" && 
                        <b> {data.sumDividendWithholdingTax} </b>
                    }
                    {column.name == "Refund claim (10%)" && 
                        <b> {data.sumDividendRefundClaim} </b>
                    }
                </div>
            );
        }

        return undefined;
    };
      
    //Render custom footer details list
    const onRenderDetailsFooter = (detailsFooterProps: IDetailsFooterProps | undefined): JSX.Element => {
        return (
            <div>
                <DetailsRow
                    {...detailsFooterProps}
                    columns={detailsFooterProps?.columns}
                    item={{}}
                    itemIndex={-1}
                    groupNestingDepth={detailsFooterProps?.groupNestingDepth}
                    onRenderItemColumn={renderDetailsFooterItemColumnAmount}
                />
            </div>
        );
    }

    const TwoColumnStack = (props: any) => (
        <Stack horizontal tokens={stackTokens}>
            <StackItem grow={3}>
                <TextField 
                    label={props.firstLabel}
                    disabled 
                    defaultValue={props.firstValue}
                    styles={fieldStyles}
                />
            </StackItem>
            <StackItem grow={3}>
                <TextField 
                    label={props.secondLabel}
                    disabled 
                    defaultValue={props.secondValue}
                    styles={fieldStyles}
                />
            </StackItem>
        </Stack>
    );

    const ClaimantSection = () => {
        return (
            <Stack>
                <TwoColumnStack
                    firstLabel="Full name"
                    firstValue={`${claimantFirstName} ${claimantMiddleName} ${claimantLastName}`}
                    secondLabel="Email"
                    secondValue={data.claimant.email}
                />
                <TwoColumnStack
                    firstLabel="Phone"
                    firstValue={data.claimant.telephone}
                    secondLabel="Tax Identification Number"
                    secondValue={data.claimant.tin}
                />
                <TwoColumnStack
                    firstLabel="City"
                    firstValue={claimantCity}
                    secondLabel="Street Address"
                    secondValue={claimantStreetAddress}
                />
                <TwoColumnStack
                    firstLabel="Postal Code"
                    firstValue={claimantPostalCode}
                    secondLabel="Country"
                    secondValue={claimantCountry}
                />                
            </Stack>
        )
    }

    const RepresentativeSection = () => {
        /* Representative Name */
        const { 
            firstName: repFirstName,
            middleName: repMiddleName, 
            lastName: repLastName
        } = data.representative.representativeFullName;

        /* Representative Address Data */
        const { 
            city: repCity, 
            countryOfResidence: { 
                originCountry: repCountry 
            }, 
            postalCode: repPostalCode, 
            streetAddress: repStreetAddress 
        } = data.representative.address;

        /* Contact Name */
        const { 
            firstName: contactFirstName,
            middleName: contactMiddleName, 
            lastName: contactLastName
        } = data.representative.contactFullName;

        return (
            <Stack>
                <TextField 
                    label="Full Name"
                    disabled 
                    defaultValue={`${repFirstName} ${repMiddleName} ${repLastName}`}
                    styles={fieldStyles}
                />
                <TwoColumnStack
                    firstLabel="Email"
                    firstValue={data.representative.email}
                    secondLabel="Contact"
                    secondValue={`${contactFirstName} ${contactMiddleName} ${contactLastName}`}
                />             
                <TwoColumnStack
                    firstLabel="City"
                    firstValue={repCity}
                    secondLabel="Street Address"
                    secondValue={repStreetAddress}
                />
                <TwoColumnStack
                    firstLabel="Postal Code"
                    firstValue={repPostalCode}
                    secondLabel="Country"
                    secondValue={repCountry}
                /> 
            </Stack>
        )
    }

    const PaymentDetails = () => {
        return (
            <Stack>
                <TextField 
                    label="Account Holder"
                    disabled 
                    defaultValue="Ola Nordmann"
                    styles={fieldStyles}
                />
                <TwoColumnStack
                    firstLabel="Bank Name"
                    firstValue="Generic Bank"
                    secondLabel="Bank Address"
                    secondValue="Generic Bank Address"
                />       
                <TwoColumnStack
                    firstLabel="Payment Reference"
                    firstValue="Missing information"
                    secondLabel="SWIFT / BIC"
                    secondValue="SPSONO22"
                />   
                <TextField 
                    label="IBAN"
                    disabled 
                    defaultValue="SE35 5000 0000 0549 1000 0003"
                    styles={fieldStyles}
                />           
            </Stack>
        )
    }

    const Dividends = () => {
        return (
            <>
                <Stack horizontal>
                    Double Taxation Treaty between Norway and&nbsp;
                    <div style={{fontWeight: 500}}> CountryName </div>
                </Stack>
                <DetailsList
                    items={data.dividends}
                    columns={dividendColumns}
                    selectionMode={SelectionMode.none}
                    compact={true}
                    layoutMode={DetailsListLayoutMode.fixedColumns}
                    onRenderDetailsFooter={onRenderDetailsFooter}
                />
            </>
        )
    }

    const FilesSection = () => {
        return (
            <Stack verticalFill tokens={{childrenGap: 8}}>
                {Object.entries(files).map(([key, value]) => {
                    return (
                        <>
                            <Separator> {(key).charAt(0).toUpperCase() + (key).slice(1)} </Separator>
                            <Stack tokens={{childrenGap: 8}}>
                                {Object.entries(value as any).map(([key2, value2]) => (
                                    <DownloadButton 
                                        text={key2} 
                                        location={value2}
                                    />
                                ))}
                            </Stack>
                        </>
                    )
                })}
            </Stack>
        )
    }

    const claimantSections = [
        {
            title: 'Claimant',
            id: 'ClaimantSection',
            component: ClaimantSection
        },
        {
            title: 'Representative',
            id: 'ClaimantSection2',
            component: RepresentativeSection
        },
        {
            title: 'Payment Details',
            id: 'PaymentDetails',
            component: PaymentDetails
        }, {
            title: 'Dividends',
            id: 'Dividends',
            component: Dividends
        }
    ];

    const fileSection = {
        title: 'Files',
        id: 'FileSection',
        component: FilesSection
    }

    const Header = () => {
        return (
            <div style={{marginTop: '-24px', marginBottom: '-10px'}}>
                <Stack horizontal horizontalAlign="space-between">
                    <StackItem>
                        Form submitted on
                        <div style={{fontWeight: 500}}> {data.date} </div>
                    </StackItem>
                    <StackItem>
                        Status
                        <div style={{fontWeight: 500}}> {data.status} </div>
                    </StackItem>
                </Stack>
            </div>
        )
    }

    return (
        <div style={{padding: '12px'}}>
            <Stack tokens={{childrenGap: 12}}>
                <FormSection
                    index={0}
                    hideIndex
                    section={{title: '', id: ''}}
                    Component={Header}
                />
                <Stack horizontal tokens={{childrenGap: 18}}>
                    <Stack grow={4} tokens={{childrenGap: 18}}>
                        <Stack horizontal tokens={{childrenGap: 18}}>
                            <StackItem grow={2}>
                                <FormSection
                                    index={0}
                                    hideIndex
                                    section={claimantSections[0]}
                                    Component={claimantSections[0].component}
                                />
                            </StackItem>
                            {data.representative &&
                                <StackItem grow={2}>
                                    <FormSection
                                        index={0}
                                        hideIndex
                                        section={claimantSections[1]}
                                        Component={claimantSections[1].component}
                                    />
                                </StackItem>
                            }

                            <StackItem grow={4}>
                                <FormSection
                                    index={0}
                                    hideIndex
                                    section={claimantSections[2]}
                                    Component={claimantSections[2].component}
                                />
                            </StackItem>
                        </Stack>
                        <FormSection
                            index={0}
                            hideIndex
                            section={claimantSections[3]}
                            Component={claimantSections[3].component}
                        />
                    </Stack>
                    <Stack grow={7}>
                        <StackItem verticalFill>
                            <FormSection
                                index={0}
                                hideIndex
                                section={fileSection}
                                Component={fileSection.component}
                            />
                        </StackItem>
                    </Stack>
                </Stack>
            </Stack>
        </div>
    )
}

export default CaseIndex;