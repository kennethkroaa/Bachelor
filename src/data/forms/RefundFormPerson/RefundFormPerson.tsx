import KiskbaDropdown from '@components/inputs/KiskbaDropdown';
import KiskbaDropzone from '@components/inputs/KiskbaDropzone';
import KiskbaTextField from '@components/inputs/KiskbaTextField';
import KiskbaTableDividends from '@components/tables/KiskbaTableDividends';
import { getCodeList } from 'country-list';
import { IColumn, IDropdownOption, SelectionMode } from 'office-ui-fabric-react';
import { IKiskbaForm } from '../types';
import { RefundFormPersonValidation } from './RefundFormPerson.validation';

const options: IDropdownOption[] = 
    Object.entries(getCodeList()).map((key): IDropdownOption => {
        return {
            selected: false,
            key: key[0],
            text: key[1]
        }
    }
)

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

export const dividendItems = [];

export const RefundFormPersonHelp: IKiskbaForm = {
    title: "Help",
    description: "This page will help you with properly filling out the form.",
    sections: [
        {
            title: "About",
            id: "About",
            description: "This section is about the form."
        },
        {
            title: "Filling out a form",
            id: "FillHelp",
            description: "This section is about filling out a form."
        },
        {
            title: "File attachements",
            id: "AttachementHelp",
            description: "This section is about file attachements."
        }
    ],
}

export const RefundFormPerson: IKiskbaForm = {
    title: "Form",
    description: "Applicant for refund of Norwegian withholding tax under a Double Taxation Treaty",
    validator: RefundFormPersonValidation,
    sections: [
        {
            title: "Claimant",
            id: "Claimant",
            fields: [
                "claimant.fullName.firstName",
                "claimant.fullName.middleName",
                "claimant.fullName.lastName",
                "claimant.email",
                "claimant.telephone",
                "claimant.address.streetAddress",
                "claimant.address.city",
                "claimant.address.postalCode",
                "claimant.address.countryOfResidence.originCountry",
                "claimant.TIN"
            ],
            items: [
                {
                    columns: [
                        {
                            properties: {
                                sm: 4
                            },
                            component: KiskbaTextField,
                            KiskbaTextField: {
                                id: "ClaimantFirstName",
                                name: "claimant.fullName.firstName",
                                type: "text",
                                label: "First Name",
                                required: true,
                                prefixIcon: "Contact",
                                calloutText: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
                                description: "The first name of the representative"
                            }
                        },
                        {
                            properties: {
                                sm: 4
                            },
                            component: KiskbaTextField,
                            KiskbaTextField: {
                                id: "ClaimantMiddleName",
                                name: "claimant.fullName.middleName",
                                type: "text",
                                label: "Middle Name",
                                required: false,
                                prefixIcon: "Contact",
                                calloutText: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
                                description: "The middle name of the representative"
                            }
                        },
                        {
                            properties: {
                                sm: 4
                            },
                            component: KiskbaTextField,
                            KiskbaTextField: {
                                id: "ClaimantLastName",
                                name: "claimant.fullName.lastName",
                                type: "text",
                                label: "Last Name",
                                required: true,
                                prefixIcon: "Contact",
                                calloutText: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
                                description: "The last name of the representative"
                            }
                        }
                    ]
                },
                {
                    component: KiskbaTextField,
                    KiskbaTextField: {
                        id: "ClaimantEmail",
                        name: "claimant.email",
                        type: "email",
                        label: "Email",
                        required: true,
                        prefixIcon: "Mail",
                        calloutText: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
                        description: "The claimants email address."
                    }
                },
                {
                    component: KiskbaTextField,
                    KiskbaTextField: {
                        id: "ClaimantPhone",
                        name: "claimant.telephone",
                        type: "tel",
                        autoComplete: "tel",
                        label: "Phone",
                        required: true,
                        prefixIcon: "CellPhone",
                        calloutText: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
                        description: "The claimants phone number."
                    }
                },
                {
                    columns: [
                        {
                            properties: {
                                sm: 6
                            },
                            component: KiskbaTextField,
                            KiskbaTextField: {
                                id: "ClaimantAddress",
                                name: "claimant.address.streetAddress",
                                type: "text",
                                autoComplete: "address",
                                label: "Street Address",
                                required: true,
                                prefixIcon: "Street",
                                calloutText: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
                                description: "The current address of the claimant."
                            }
                        },
                        {
                            component: KiskbaTextField,
                            KiskbaTextField: {
                                id: "ClaimantCity",
                                name: "claimant.address.city",
                                type: "text",
                                autoComplete: "city",
                                label: "City",
                                required: true,
                                prefixIcon: "CityNext",
                                calloutText: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
                                description: "The current city of the claimant."
                            }
                        }
                    ]
                },
                {
                    columns: [
                        {
                            properties: {
                                sm: 6
                            },
                            component: KiskbaTextField,
                            KiskbaTextField: {
                                id: "ClaimantPostalCode",
                                name: "claimant.address.postalCode",
                                autoComplete: "postal-code",
                                type: "text",
                                label: "Postal Code",
                                required: true,
                                prefixIcon: "PostUpdate",
                                calloutText: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
                                description: "The current postal address of the claimant."
                            }
                        },
                        {
                            component: KiskbaDropdown,
                            KiskbaDropdown: {
                                id: "ClaimantCountry",
                                name: "claimant.address.countryOfResidence.originCountry",
                                label: "Country",
                                placeholder: "Select country...",
                                options: options,
                                calloutText: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
                                prefixIcon: "MapPin",
                                description: "The current country of the claimant.",
                                flag: true,
                                required: true
                            }
                        }
                    ]
                },
                {
                    component: KiskbaTextField,
                    KiskbaTextField: {
                        id: "TaxIdentificationNumber",
                        name: "claimant.TIN",
                        type: "text",
                        label: "TIN (Tax Identification Number)",
                        required: true,
                        prefixIcon: "ContactCard",
                        calloutText: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
                        description: "The claimants Tax Identification Number."
                    }
                }
            ]
        },
        {
            title: "Certificate of Residency",
            id: "CertificateOfResidency",
            description: "Please enclose your Certificate of Residency below.",
            fields: [""],
            items: [
                {
                    component: KiskbaDropzone,
                    KiskbaDropzone: {
                        id: "ResidencyDropzone",
                        name: "files.residency"
                    }    
                }
            ]
        },
        {
            title: "Representative",
            id: "Representative",
            description: "We give the below representative permission to submit this application on our behalf and to be the recipient of all communication in this regard.",
            fields: [
                "representative.representativeFullName.firstName",
                "representative.representativeFullName.middleName",
                "representative.representativeFullName.lastName",
                "representative.email",
                "representative.contactFullName.firstName",
                "representative.contactFullName.middleName",
                "representative.contactFullName.lastName",
                "representative.address.streetAddress",
                "representative.address.city",
                "representative.address.postalCode",
                "representative.address.countryOfResidence.originCountry"
            ],
            items: [
                {
                    columns: [
                        {
                            properties: {
                                sm: 4
                            },
                            component: KiskbaTextField,
                            KiskbaTextField: {
                                id: "RepresentativeFirstName",
                                name: "representative.representativeFullName.firstName",
                                type: "text",
                                label: "First Name",
                                required: false,
                                prefixIcon: "Contact",
                                calloutText: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
                                description: "The first name of the representative"
                            }
                        },
                        {
                            properties: {
                                sm: 4
                            },
                            component: KiskbaTextField,
                            KiskbaTextField: {
                                id: "RepresentativeMiddleName",
                                name: "representative.representativeFullName.middleName",
                                type: "text",
                                label: "Middle Name",
                                required: false,
                                prefixIcon: "Contact",
                                calloutText: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
                                description: "The middle name of the representative"
                            }
                        },
                        {
                            properties: {
                                sm: 4
                            },
                            component: KiskbaTextField,
                            KiskbaTextField: {
                                id: "RepresentativeLastName",
                                name: "representative.representativeFullName.lastName",
                                type: "text",
                                label: "Last Name",
                                required: false,
                                prefixIcon: "Contact",
                                calloutText: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
                                description: "The last name of the representative"
                            }
                        }
                    ]
                },
                {
                    component: KiskbaTextField,
                    KiskbaTextField: {
                        id: "RepresentativeEmail",
                        name: "representative.email",
                        type: "email",
                        label: "Email",
                        prefixIcon: "Mail",
                        calloutText: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
                        description: "The email address of the representative."
                    }
                },
                {
                    columns: [
                        {
                            properties: {
                                sm: 4
                            },
                            component: KiskbaTextField,
                            KiskbaTextField: {
                                id: "ContactFirstName",
                                name: "representative.contactFullName.firstName",
                                type: "text",
                                label: "Contact First Name",
                                required: false,
                                prefixIcon: "Contact",
                                calloutText: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
                                description: "The first name of the contact"
                            }
                        },
                        {
                            properties: {
                                sm: 4
                            },
                            component: KiskbaTextField,
                            KiskbaTextField: {
                                id: "ContactMiddleName",
                                name: "representative.contactFullName.middleName",
                                type: "text",
                                label: "Contact Middle Name",
                                required: false,
                                prefixIcon: "Contact",
                                calloutText: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
                                description: "The middle name of the contact"
                            }
                        },
                        {
                            properties: {
                                sm: 4
                            },
                            component: KiskbaTextField,
                            KiskbaTextField: {
                                id: "ContactLastName",
                                name: "representative.contactFullName.lastName",
                                type: "text",
                                label: "Contact Last Name",
                                required: false,
                                prefixIcon: "Contact",
                                calloutText: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
                                description: "The last name of the contact"
                            }
                        }
                    ]
                },
                {
                    columns: [
                        {
                            properties: {
                                sm: 6
                            },
                            component: KiskbaTextField,
                            KiskbaTextField: {
                                id: "RepresentativeAddress",
                                name: "representative.address.streetAddress",
                                type: "text",
                                autoComplete: "address",
                                label: "Street Address",
                                required: false,
                                prefixIcon: "Street",
                                calloutText: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
                                description: "The current address of the representative."
                            }
                        },
                        {
                            component: KiskbaTextField,
                            KiskbaTextField: {
                                id: "RepresentativeCity",
                                name: "representative.address.city",
                                type: "text",
                                autoComplete: "city",
                                label: "City",
                                required: false,
                                prefixIcon: "CityNext",
                                calloutText: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
                                description: "The current city of the representative."
                            }
                        }
                    ]
                },
                {
                    columns: [
                        {
                            properties: {
                                sm: 6
                            },
                            component: KiskbaTextField,
                            KiskbaTextField: {
                                id: "RepresentativePostalCode",
                                name: "representative.address.postalCode",
                                autoComplete: "postal-code",
                                type: "text",
                                label: "Postal Code",
                                required: false,
                                prefixIcon: "PostUpdate",
                                calloutText: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
                                description: "The current postal address of the representative."
                            }
                        },
                        {
                            component: KiskbaDropdown,
                            KiskbaDropdown: {
                                id: "RepresentativeCountry",
                                name: "representative.address.countryOfResidence.originCountry",
                                label: "Country",
                                placeholder: "Select country...",
                                options: options,
                                calloutText: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
                                prefixIcon: "MapPin",
                                description: "The current country of the representative.",
                                flag: true,
                                required: false
                            }
                        }
                    ]
                },
            ]
        },
        {
            title: "Representative Authority",
            id: "RepresentativeAuthority",
            description: "Please enclose a document of the representatives authority to submit this form. This is only required when a representative is given permission to submit this application on behalf of the recipient.",
            fields: [""],
            items: [
                {
                    component: KiskbaDropzone,
                    KiskbaDropzone: {
                        id: "AuthorityDropzone",
                        name: "files.authority"
                    }    
                }
            ]
        },
        {
            title: "Double Taxation Treaty",
            id: "DoubleTaxationTreaty",
            description: "Application for refund of Norwegian withholding tax under the Double Taxation Treaty between Norway and the selected country below.",
            fields: ["originCountry.originCountry"],
            items: [
                {
                    component: KiskbaDropdown,
                    KiskbaDropdown: {
                        id: "DoubleTaxationTreatyCountry",
                        name: "originCountry.originCountry",
                        label: "Country",
                        placeholder: "Select country...",
                        options: options,
                        calloutText: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
                        prefixIcon: "MapPin",
                        description: "The country with whom Norway has a Double Taxation Treaty with.",
                        flag: true,
                        required: true
                    }   
                }
            ]
        },
        {
            title: "Dividends",
            id: "Dividends",
            description: "Note that you only need to supply us with the gross amount in NOK, and we will calculate the withholding tax and refund claim amounts for you. Remember to enclose credit advices from the bank for each dividend payment.",
            fields: [],
            items: [
                {
                    component: KiskbaTableDividends,
                    KiskbaTableDividends: {
                        id: "DividendsTable",
                        name: "dividends",
                        items: dividendItems,
                        columns: dividendColumns,
                        selectionMode: SelectionMode.none,
                        compact: true
                    }
                }
            ]
        },
        {
            title: "Dividend Receipt(s)",
            id: "DividendReceipts",
            description: "Please enclose your dividend receipts below.",
            fields: [""],
            items: [
                {
                    component: KiskbaDropzone,
                    KiskbaDropzone: {
                        id: "DividendsDropzone",
                        name: "files.receipts"
                    }    
                }
            ]
        },
        {
            title: "Payment details",
            id: "Payment",
            description: "The account must be able to receive payments in NOK.",
            fields: [
                "paymentDetails.bankName",
                "paymentDetails.bankAddress",
                "paymentDetails.IBAN",
                "paymentDetails.BIC",
                "paymentDetails.paymentReference",
                "paymentDetails.accountHolder.firstName",
                "paymentDetails.accountHolder.middleName",
                "paymentDetails.accountHolder.lastName"
            ],
            items: [
                {
                    component: KiskbaTextField,
                    KiskbaTextField: {
                        id: "BankName",
                        name: "paymentDetails.bankName",
                        type: "text",
                        label: "Name of the Bank",
                        required: true,
                        prefixIcon: "Bank",
                        calloutText: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
                        description: "The name of the bank for which the account is created."
                    }
                },
                {
                    component: KiskbaTextField,
                    KiskbaTextField: {
                        id: "BankAddress",
                        name: "paymentDetails.bankAddress",
                        type: "text",
                        label: "Bank Address",
                        required: true,
                        prefixIcon: "MapPin",
                        calloutText: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
                        description: "The address of the bank for which the account is created."
                    }
                },
                {
                    columns: [
                        {
                            properties: {
                                sm: 4
                            },
                            component: KiskbaTextField,
                            KiskbaTextField: {
                                id: "AccountHolderFirstName",
                                name: "paymentDetails.accountHolder.firstName",
                                type: "text",
                                label: "Account Holder First Name",
                                required: true,
                                prefixIcon: "Contact",
                                calloutText: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
                                description: "The first name of the account holder"
                            }
                        },
                        {
                            properties: {
                                sm: 4
                            },
                            component: KiskbaTextField,
                            KiskbaTextField: {
                                id: "AccountHolderMiddleName",
                                name: "paymentDetails.accountHolder.middleName",
                                type: "text",
                                label: "Account Holder Middle Name",
                                required: false,
                                prefixIcon: "Contact",
                                calloutText: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
                                description: "The middle name of the account holder"
                            }
                        },
                        {
                            properties: {
                                sm: 4
                            },
                            component: KiskbaTextField,
                            KiskbaTextField: {
                                id: "AccountHolderLastName",
                                name: "paymentDetails.accountHolder.lastName",
                                type: "text",
                                label: "Account Holder Last Name",
                                required: true,
                                prefixIcon: "Contact",
                                calloutText: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
                                description: "The last name of the account holder"
                            }
                        }
                    ]
                },
                {
                    component: KiskbaTextField,
                    KiskbaTextField: {
                        id: "IBAN",
                        name: "paymentDetails.IBAN",
                        type: "text",
                        label: "IBAN",
                        required: true,
                        prefixIcon: "ContactCard",
                        calloutText: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
                        description: "The number that identifies an overseas bank account."
                    }
                },
                {
                    component: KiskbaTextField,
                    KiskbaTextField: {
                        id: "SWIFTorBIC",
                        name: "paymentDetails.BIC",
                        type: "text",
                        label: "SWIFT / BIC",
                        required: true,
                        prefixIcon: "ContactCard",
                        calloutText: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
                        description: "A code that identifies the specific bank of the bank account in the transaction."
                    }
                },
                {
                    component: KiskbaTextField,
                    KiskbaTextField: {
                        id: "PaymentReference",
                        name: "paymentDetails.paymentReference",
                        type: "text",
                        label: "Payment Reference",
                        required: true,
                        prefixIcon: "PaymentCard",
                        calloutText: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
                        description: "Missing information."
                    }
                }
            ]
        },
        {
            title: "Additional information",
            id: "AdditionalInfo",
            description: "Here you can supply additional information that is not required to submit the form.",
            fields: ["reference"],
            items: [
                {
                    component: KiskbaTextField,
                    KiskbaTextField: {
                        id: "Reference",
                        name: "reference",
                        type: "text",
                        label: "Reference",
                        prefixIcon: "PageList",
                        calloutText: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
                        description: "A reference to an internal case number."
                    }    
                }
            ]
        }
    ]
}