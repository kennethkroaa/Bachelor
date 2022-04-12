import { Router } from '@i18n';
import { deleteFormData, setFormData } from "@store/form/reducer";
import faker from "faker";
import { DefaultButton, IContextualMenuProps, INavLink, Nav, Stack } from "office-ui-fabric-react";
import { useDispatch } from "react-redux";
import { getClassNames } from "./KiskbaNavigation.styles";
import { KiskbaNavigationProps } from "./KiskbaNavigation.types";

/*
    Ideally, Nav's linkAs prop should be used to change the button into
    into a proper Next.js <Link> for prefetching, but won't spend the time
    basically recreating the style
*/

const KiskbaNavigation: React.FunctionComponent<KiskbaNavigationProps> = (props) => {
    const { kiskbaForm, form } = props;

    const classes = getClassNames();
    const dispatch = useDispatch();

    const onLinkClick = (
        ev?: React.MouseEvent<HTMLElement>, 
        item?: INavLink
    ) => {
        //Do not use standard link routing
        ev?.preventDefault();

        if(props.useCurrentPath){
            Router.push({
                pathname: `/${item?.base}/[${item?.query}]/${item?.page}`,
                query: Router.query
            }, `/${item?.base}/${Router.query[item?.query]}/${item?.page}`)
        }
    }

    const addDummyData = () => {
        kiskbaForm.methods.setValue([
            {
                originCountry: {
                    originCountry: faker.address.countryCode()
                }
            },
            {
                claimant: {
                    email: faker.internet.email(),
                    telephone: faker.phone.phoneNumberFormat().split("-").join(""),
                    fullName: {
                        firstName: faker.name.firstName(),
                        lastName: faker.name.lastName()
                    },
                    address: {
                        streetAddress: faker.address.streetAddress(),
                        city: faker.address.city(),
                        postalCode: faker.address.zipCode().split("-").join(""),
                        countryOfResidence: {
                            originCountry: faker.address.countryCode()
                        }
                    },
                    TIN: faker.random.number(999999999)
                }
            },
            {
                paymentDetails: {
                    bankName: faker.company.companyName(),
                    paymentReference: "Payment Reference",
                    bankAddress: faker.address.streetAddress(),
                    accountHolder: {
                        firstName: faker.name.firstName(),
                        lastName: faker.name.lastName()
                    },
                    IBAN: faker.finance.iban(),
                    BIC: faker.finance.bic()
                }
            },
            {
                representative: {
                    email: faker.internet.email(),
                    contactName: faker.name.findName(),
                    representativeFullName: {
                        firstName: faker.name.firstName(),
                        lastName: faker.name.lastName()
                    },
                    address: {
                        streetAddress: faker.address.streetAddress(),
                        city: faker.address.city(),
                        postalCode: faker.address.zipCode().split("-").join(""),
                        countryOfResidence: {
                            originCountry: faker.address.countryCode()
                        }
                    },
                    contactFullName: {
                        firstName: faker.name.firstName(),
                        lastName: faker.name.lastName()                     
                    }
                }
            },
        ]) 

        dispatch(setFormData({
            id: form.name,
            values: kiskbaForm.methods.getValues({nest: true})
        }));
    }

    const removeDummyData = () => {
        dispatch(deleteFormData(form.name));

        //reset() didn't always agree with me, not going to debug why as of now 
        kiskbaForm.methods.setValue([
            {
                claimant: {
                    email: '',
                    telephone: '',
                    fullName: {
                        firstName: '',
                        lastName: ''
                    },
                    address: {
                        streetAddress: '',
                        city: '',
                        postalCode: '',
                        countryOfResidence: {
                            originCountry: ''
                        }
                    },
                    TIN: ''
                }
            },
            {
                paymentDetails: {
                    bankName: '',
                    paymentReference: '',
                    bankAddress: '',
                    accountHolder: {
                        firstName: '',
                        lastName: ''
                    },
                    IBAN: '',
                    BIC: ''
                }
            },
            {
                originCountry: {
                    originCountry: ''
                }
            },
            {
                representative: {
                    email: '',
                    contactName: '',
                    fullName: {
                        firstName: '',
                        lastName: ''
                    },
                    address: {
                        streetAddress: '',
                        city: '',
                        postalCode: '',
                        countryOfResidence: {
                            originCountry: ''
                        }
                    }
                }
            }
        ]) 
    }
    
    const menuProps: IContextualMenuProps = {
        items: [
            {
                key: 'removedummy',
                text: 'Clear all fields',
                iconProps: { iconName: 'Delete' },
                onClick: removeDummyData
            }
        ],
    };

    const navFabricStyles: any = {
        root: {
            width: '256px'
        },
        chevronButton: {
            fontSize: '14px', 
            fontWeight: 600
        },
        chevronIcon: {
            fontWeight: 600
        },
        groupContent: {
            marginBottom: '8px',
            animation: 'none'
        }
    }

    return (
        <Stack tokens={{childrenGap: 12}}>
            { form && 
                <Stack horizontal tokens={{childrenGap: 12}}>
                    <DefaultButton
                        text="Dummy Data"
                        primary
                        split
                        splitButtonAriaLabel="See 2 options"
                        aria-roledescription="split button"
                        menuProps={menuProps}
                        onClick={addDummyData}
                    />
                </Stack>
            }
            <span className={classes.titleText}>
                Navigation    
            </span>
            <Nav
                {...props}
                onLinkClick={onLinkClick}
                styles={navFabricStyles}
            />
        </Stack>
    )
}

export default KiskbaNavigation;