import KiskbaTextField from "@components/inputs/KiskbaTextField";
import KiskbaTable from "@components/tables/KiskbaTable";
import resolver from "@util/ValidationResolver";
import { DatePicker, DefaultButton, DetailsRow, DetailsRowCheck, Dialog, DialogFooter, DialogType, IDatePickerStrings, IDetailsFooterProps, IDetailsRowBaseProps, IDetailsRowCheckStyles, PrimaryButton, Stack } from "office-ui-fabric-react";
import { useState } from "react";
import { Controller, useForm, useFormContext } from "react-hook-form";
import { number, object, string } from "yup";
import { KiskbaTableDividendsProps } from "./KiskbaTableDividends.types";

const DayPickerStrings: IDatePickerStrings = {
    months: [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
    ],
  
    shortMonths: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  
    days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  
    shortDays: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
  
    goToToday: 'Go to today',
    prevMonthAriaLabel: 'Go to previous month',
    nextMonthAriaLabel: 'Go to next month',
    prevYearAriaLabel: 'Go to previous year',
    nextYearAriaLabel: 'Go to next year',
    closeButtonAriaLabel: 'Close date picker',
  
    isRequiredErrorMessage: 'Date of dividend payment is required.'
};

//Used for displaying the correct format inside the input field
const onFormatDate = (dateOfPayment?: Date): string => {
    return dateOfPayment ? (dateOfPayment.getFullYear()) + '-' + (dateOfPayment.getMonth() + 1) + '-' + dateOfPayment.getDate() : "";
};

//Used to format the date as required on the backend
const formatDateData = (dateOfPayment: Date) => {
    return {
        year: dateOfPayment.getFullYear(),
        month: (dateOfPayment.getMonth() + 1),
        day: dateOfPayment.getDate()
    }
};

//Used to format a NOK value with a thounsands separator
//https://stackoverflow.com/questions/2901102/how-to-print-a-number-with-commas-as-thousands-separators-in-javascript
const numberWithCommas = (x: number) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

/*
    We do not have added support for dialogs og separate panels with inputs
    in our form data, so we have to use React-Hook-Form with a custom validator
    inside this component as well
*/
export const dividendValidator = object().shape({
    VPSnumber: string()
        .required("VPS can not be empty.")
        .min(5, "VPS must be at least 5 characters long.")
        .max(15, "VPS can not be longer than 15 characters."),
    ISINnumber: string()
        .required("ISIN can not be empty.")
        .min(12, "ISIN must be exactly 12 characters long.")
        .max(12, "ISIN can not be longer than 12 characters."),
    nameOfNorwegianCompany: string()
        .required("The name of the Norwegian Company can not be empty."),
    amount: number()
        .required("Gross amount can not be empty.")
});

const KiskbaTableDividends: React.FunctionComponent<KiskbaTableDividendsProps> = (props) => {
    const { items } = props;
    const { setValue } = useFormContext();

    const [ show, setDialogState ] = useState<boolean>(false);
    const [ dateValue, setDateValue ] = useState<Date | null | undefined>(null);

    const [ sumDividendValues, setSumDividendValues ] = useState({
        amount: 0,
        refundClaim: 0,
        withholdingTax: 0
    })

    const showDialog = (): void => setDialogState(true);
    const closeDialog = (): void => setDialogState(false);

    //onSubmit is only called whenever validation is successful
    const onSubmit = () => addDividend();

    const onSelectDate = (dateOfPayment: Date | null | undefined): void => {
        setDateValue(dateOfPayment);
    };
    
    //React-Hook-Form for this component
    const methods = useForm({
        validationResolver: resolver,
        validationContext: { 
            abortEarly: false,
            schema: dividendValidator
        },
        mode: 'onBlur',
        reValidateMode: 'onChange',
    });

    /*
        When adding a dividend, we trigger the hooks validation to check for any errors.
        Only if it is valid do we push the dividend to array that holds all our dividends,
        and close the dialog.
    */
    const addDividend = async () => {
        const valid = await methods.triggerValidation();

        if(valid){
            const dividendValues = methods.getValues();

            const percentages = {
                amount: parseInt(dividendValues.amount), // 100%
                withholdingTax: Math.ceil(((25 / 100) * dividendValues.amount)), // 25%
                refundClaim: Math.ceil(((10 / 100) * dividendValues.amount)) // 10%
            }

            items.push({
                VPSnumber: dividendValues.VPSnumber,
                dateOfPayment: formatDateData(dateValue!),
                ISINnumber: dividendValues.ISINnumber,
                nameOfNorwegianCompany: dividendValues.nameOfNorwegianCompany,
                //We add dividends to the array comma separated, and then remove commas later when we POST our data
                amount: numberWithCommas(dividendValues.amount),
                withholdingTax: numberWithCommas(percentages.withholdingTax),
                refundClaim: numberWithCommas(percentages.refundClaim)
            })

            setSumDividendValues({ 
                ...sumDividendValues,
                amount: sumDividendValues.amount + percentages.amount,
                refundClaim: sumDividendValues.refundClaim + percentages.refundClaim,
                withholdingTax: sumDividendValues.withholdingTax + percentages.withholdingTax
            });

            /*
                We have to manually set the dividends value from our form data, due to not having
                a way to set up custom input controllers for custom components
            */
            setValue("dividends", items);

            closeDialog();
        }
    }

    //Renderer for the list footer column names
    const renderDetailsFooterItemColumn: IDetailsRowBaseProps['onRenderItemColumn'] = (item, index, column) => {
        if (column) {
            return (
                <div>
                    {column.name == "Gross (NOK)" && 
                        <b>Total gross</b>
                    }
                    {column.name == "Withholding tax (25%)" && 
                        <b>Total withholding tax</b>
                    }
                    {column.name == "Refund claim (10%)" && 
                        <b>Total refund claim</b>
                    }
                </div>
            );
        }

        return undefined;
    };

    //Renderer for the list footer items
    const renderDetailsFooterItemColumnAmount: IDetailsRowBaseProps['onRenderItemColumn'] = (item, index, column) => {
        if (column) {
            return (
                <div>
                    {column.name == "Gross (NOK)" && 
                        <b> {numberWithCommas(sumDividendValues.amount)} </b>
                    }
                    {column.name == "Withholding tax (25%)" && 
                        <b> {numberWithCommas(sumDividendValues.withholdingTax)} </b>
                    }
                    {column.name == "Refund claim (10%)" && 
                        <b> {numberWithCommas(sumDividendValues.refundClaim)} </b>
                    }
                </div>
            );
        }

        return undefined;
    };
      
    //From Fabric UI custom DetailsList Footer example
    const detailsRowCheckStyles: Partial<IDetailsRowCheckStyles> = { root: { visibility: 'hidden' } };
    const onRenderCheckForFooterRow: IDetailsRowBaseProps['onRenderCheck'] = (props): JSX.Element => {
        return <DetailsRowCheck {...props} styles={detailsRowCheckStyles} selected={true} />;
    };

    //Render custom footer details list
    const onRenderDetailsFooter = (detailsFooterProps: IDetailsFooterProps | undefined): JSX.Element => {
        return (
            <>
                <DetailsRow
                    {...detailsFooterProps}
                    columns={detailsFooterProps?.columns}
                    item={{}}
                    itemIndex={-1}
                    groupNestingDepth={detailsFooterProps?.groupNestingDepth}
                    onRenderItemColumn={renderDetailsFooterItemColumn}
                    onRenderCheck={onRenderCheckForFooterRow}
                />
                <DetailsRow
                    {...detailsFooterProps}
                    columns={detailsFooterProps?.columns}
                    item={{}}
                    itemIndex={-1}
                    groupNestingDepth={detailsFooterProps?.groupNestingDepth}
                    onRenderItemColumn={renderDetailsFooterItemColumnAmount}
                    onRenderCheck={onRenderCheckForFooterRow}
                />
            </>
        );
    }

    return (
        <>
            <KiskbaTable 
                { ...props }
                onRenderDetailsFooter={onRenderDetailsFooter}
            />

            <Stack>
                <Stack horizontal>
                    <PrimaryButton 
                        style={{
                            marginTop: '24px'
                        }}
                        onClick={showDialog}
                    >
                        Add dividend
                    </PrimaryButton>
                </Stack>
            </Stack>

            <Dialog
                hidden={!show}
                onDismiss={closeDialog}
                dialogContentProps={{
                    type: DialogType.normal,
                    title: 'Add dividend',
                    closeButtonAriaLabel: 'Close',
                    subText: 'Add a dividend payment for the claimaint.'
                }}
                minWidth={512}
            >
                <form onSubmit={methods.handleSubmit(onSubmit)}>
                    <Stack tokens={{childrenGap: 12}} style={{paddingBottom: '24px'}}>
                        <DatePicker
                            label="Date of Dividend Payment"
                            placeholder="Select a date..."
                            isRequired={true}
                            strings={DayPickerStrings}
                            formatDate={onFormatDate}
                            value={dateValue!}
                            onSelectDate={onSelectDate}
                        />

                        <Controller
                            as={KiskbaTextField}
                            control={methods.control}
                            name="VPSnumber"
                            id="VPSnumber"
                            type="text"
                            label="VPS"
                            description="The account number of the Norwegian securities account."
                            required={true}
                            errors={(methods.errors?.VPSnumber as any)?.message}
                        />

                        <Controller
                            as={KiskbaTextField}
                            control={methods.control}
                            name="ISINnumber"
                            id="ISINnumber"
                            type="text"
                            label="ISIN"
                            description="The number that identifies the dividend."
                            required={true}
                            errors={(methods.errors?.ISINnumber as any)?.message}
                        /> 

                        <Controller
                            as={KiskbaTextField}
                            control={methods.control}
                            name="nameOfNorwegianCompany"
                            id="nameOfNorwegianCompany"
                            type="text"
                            label="Name of the Norwegian Company"
                            description="The name of the Norwegian company that has paid the dividend."
                            required={true} 
                            errors={(methods.errors?.nameOfNorwegianCompany as any)?.message}
                        /> 

                        <Controller
                            as={KiskbaTextField}
                            control={methods.control}
                            name="amount"
                            id="amount"
                            type="number"
                            label="Gross amount in NOK"
                            description="The gross amount that was paid for the dividend."
                            required={true} 
                            errors={(methods.errors?.amount as any)?.message}
                        /> 
                    </Stack>
                </form>

                <DialogFooter>
                    <PrimaryButton onClick={addDividend} text="Add" />
                    <DefaultButton onClick={closeDialog} text="Cancel" />      
                </DialogFooter>
            </Dialog>
        </>
    )
}

KiskbaTableDividends.displayName = "KiskbaTableDividends";

export default KiskbaTableDividends;