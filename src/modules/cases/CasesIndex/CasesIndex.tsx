import KiskbaTableCases from '@components/tables/KiskbaTableCases';
import KiskbaCard from '@components/ui/KiskbaCard';
import KiskbaCardTitle from '@components/ui/KiskbaCardTitle';
import { Router } from '@i18n';
import { getCasesRequest } from '@store/cases/reducer';
import { RootState } from '@store/rootReducer';
import { Card } from '@uifabric/react-cards';
import { KiskbaAnimationStyles } from '@util/Animation';
import { CheckboxVisibility, DetailsRow, Dropdown, getTheme, IColumn, IconButton, IDetailsListProps, IDetailsRowStyles, IDropdownOption, SelectionMode, Stack, StackItem, Text, TooltipHost } from 'office-ui-fabric-react';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const displayItemOptions: IDropdownOption[] = [
    { key: '10', text: '10' },
    { key: '20', text: '20' },
    { key: '30', text: '30' },
    { key: '40', text: '40' },
    { key: '50', text: '50' },
]

const CasesIndex = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCasesRequest());
    }, [])

    const columns: IColumn[] = [
        {
            key: "claimant",
            fieldName: "claimant",
            name: "Name",
            minWidth: 100,
            onRender: ({ claimant }) => {
                const { firstName, middleName, lastName } = claimant.fullName;
    
                return (
                    <>
                        {firstName} {middleName} {lastName}
                    </>
                )
            }
        },
        {
            key: "tin",
            fieldName: "tin",
            name: "Tax Identification Number",
            minWidth: 180,
            onRender: ({ claimant }) => (
                <>
                    {claimant.tin}
                </>
            )
        },
        {
            key: "representative",
            fieldName: "representative",
            name: "Representative",
            minWidth: 140,
            onRender: ({ representative }) => {
                if(!representative) return (<> No representative </>);
    
                const { firstName, middleName, lastName } = representative.representativeFullName;
    
                return (
                    <>
                        {firstName} {middleName} {lastName}
                    </>
                )
            }
        },
        {
            key: "status",
            fieldName: "status",
            name: "Case Status",
            minWidth: 140,
        },
        {
            key: "originCountry",
            fieldName: "originCountry",
            name: "Origin Country",
            minWidth: 140,
            onRender: ({ originCountry }) => (
                <>
                    {originCountry.originCountry}
                </>
            )
        },
        {
            key: "date",
            fieldName: "date",
            name: "Submission Date",
            minWidth: 140
        },
        {
            key: "formType",
            fieldName: "formType",
            name: "Form Type",
            minWidth: 140,
            onRender: ({ refundCompany, refundExemptionMethod }) => (
                <>
                    {refundCompany && 
                        <div> Company </div> 
                    }
    
                    { refundExemptionMethod != null ? <div>Exemption Method</div> : <div></div> }
                    { refundExemptionMethod == null && refundCompany == null ? <div>Person</div> : <div></div> }
                </>
            )
        },
        {
            key: "id",
            fieldName: "",
            name: "",
            minWidth: 100,
            onRender: ({ refundPersonId }) => (
                <IconButton
                    style={{
                        marginTop: '-10px',
                        marginBottom: '-10px',
                        position: 'relative',
                        top: '4px'
                    }}
                    iconProps={{ iconName: 'PageHeaderEdit' }} 
                    title="Go to case" 
                    ariaLabel="Go to case"
                    onClick={() => onCaseButtonClick(refundPersonId)}
                />
            )
        }
    ];

    const { requestInProgress, list } = useSelector(
        (state: RootState) => state.cases
    );

    /*
        Bandaid on the async nature of our data, don't do anything
        until our data has been fetched
    */
    if(list.length == 0) return null;

    const onCaseButtonClick = (caseId: number) => {
        Router.push({
            pathname: `/case/[id]`,
            query: {
                id: caseId
            },
        }, `/case/${caseId}`)
    };

    const onRenderRow: IDetailsListProps['onRenderRow'] = (props) => {
        const customStyles: Partial<IDetailsRowStyles> = {};

        if (props) {
            if (props.itemIndex % 2 === 0) {
                // Every other row renders with a different background color
                customStyles.root = { backgroundColor: getTheme().palette.themeLighterAlt };
            }
    
            return <DetailsRow {...props} styles={customStyles} />;
        }

        return null;
    }

    return (
        <div style={{padding: '24px'}}>
            <Stack tokens={{childrenGap: 24}} style={{paddingTop: '12px'}}>
                <KiskbaCardTitle
                    title="Cases"
                    description="Pagination and filtering has been implemented on the backend, but we did not have sufficient time to implement it here."
                />
                <KiskbaCard
                    animation={KiskbaAnimationStyles.slideUpIn100}
                    animationDelay={`100ms`}
                >
                    <Card.Item>
                        <StackItem align="center">
                            Displaying {list.totalElements} items
                        </StackItem>
                        <KiskbaTableCases
                            items={list.content}
                            columns={columns}
                            selectionMode={SelectionMode.multiple}
                            selectionPreservedOnEmptyClick={true}
                            checkboxVisibility={CheckboxVisibility.always}
                            enableShimmer={false}
                            ariaLabelForShimmer="Cases are being fetched"
                            ariaLabelForGrid="Case details"
                            ariaLabelForSelectionColumn="Toggle selection"
                            ariaLabelForSelectAllCheckbox="Toggle selection for all items"
                            checkButtonAriaLabel="Row checkbox"
                            listProps={{}}
                            onRenderRow={onRenderRow}
                            compact
                        />
                    </Card.Item>
                    <Card.Item>
                        <Stack horizontal horizontalAlign="start">
                            <StackItem>
                                <Text style={{position: 'relative', top: '54px'}}>
                                    Page {list.pageable.pageNumber + 1} / {list.totalPages}
                                </Text>
                            </StackItem>
                        </Stack>
                        <Stack horizontal horizontalAlign="end">
                            <StackItem align="center">
                                <Card.Item>
                                    <Stack verticalAlign="end" horizontal>
                                        <div style={{paddingRight: 32}}>
                                            <Dropdown
                                                placeholder=""
                                                label="Rows per page"
                                                defaultSelectedKey="10"
                                                options={displayItemOptions}
                                            />
                                        </div>
                                        <TooltipHost
                                            content="First Page"
                                            id="firstPageChevron"
                                            calloutProps={{ gapSpace: 0 }}
                                        >
                                            <IconButton 
                                                iconProps={{ iconName: 'chevronLeftEnd6' }} 
                                                title="First Page" 
                                                ariaLabel="First Page"
                                            />
                                        </TooltipHost>
                                        <TooltipHost
                                            content="Previous Page"
                                            id="previousPageChevron"
                                            calloutProps={{ gapSpace: 0 }}
                                        >
                                            <IconButton 
                                                iconProps={{ iconName: 'chevronLeftSmall' }} 
                                                title="Previous Page" 
                                                ariaLabel="Previous Page"
                                            />
                                        </TooltipHost>
                                        <TooltipHost
                                            content="Next Page"
                                            id="nextPageChevron"
                                            calloutProps={{ gapSpace: 0 }}
                                        >
                                            <IconButton 
                                                iconProps={{ iconName: 'chevronRightSmall' }} 
                                                title="Next Page" 
                                                ariaLabel="Next Page"
                                            />
                                        </TooltipHost>
                                        <TooltipHost
                                            content="Last Page"
                                            id="lastPageChevron"
                                            calloutProps={{ gapSpace: 0 }}
                                        >
                                            <IconButton 
                                                iconProps={{ iconName: 'chevronRightEnd6' }} 
                                                title="Last Page" 
                                                ariaLabel="Last Page"
                                            />
                                        </TooltipHost>
                                    </Stack>
                                </Card.Item>
                            </StackItem>
                        </Stack>
                    </Card.Item>
                </KiskbaCard>
            </Stack>
        </div>
    );
};

export default CasesIndex;