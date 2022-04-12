import { object, string } from 'yup'

export const RefundFormPersonValidation =  object().shape({
    /* Claimant */
    claimant: object().shape({
        fullName: object().shape({
            firstName: string()
                .required("First name can not be empty."),
            middleName: string(),
            lastName: string()
                .required("Last name can not be empty")
        }),
        address: object().shape({
            streetAddress: string()
                .required("Claimant Address can not be empty"),
            city: string()
                .required("Claimant City can not be empty"),
            postalCode: string()
                .required("Claimant postal code can not be empty."),  
            countryOfResidence: object().shape({
                originCountry: string()
            })
        }),
        email: string()
            .email("Email must be valid.")
            .required("Email can not be empty."),
        telephone: string()
            .matches(/^[0-9\b]+$/, "Phone number can only be numeric.")
            .required("Phone number can not be empty."),
        TIN: string()
            .required("Tax Identification Number can not be empty."),
    }),

    /* Representative */
    representative: object().shape({
        representativeFullName: object().shape({
            firstName: string(),
            middleName: string(),
            lastName: string()
        }),
        address: object().shape({
            streetAddress: string(),
            city: string(),
            postalCode: string(),
            countryOfResidence: object().shape({
                originCountry: string()
            })
        }),
        contactName: object().shape({
            firstName: string(),
            middleName: string(),
            lastName: string()
        }),
        email: string()
            .email("Email must be valid.")
    }),

    /* Double Taxation Treaty */
    originCountry: object().shape({
        originCountry: string()
    }),

    /* Payment Details */
    paymentDetails: object().shape({
        bankName: string()
            .required("Bank name can not be empty."),
        bankAddress: string()
            .required("Bank address can not be empty."),
        accountHolder: object().shape({
            firstName: string()
                .required("Account holder first name can not be empty"),
            middleName: string(),
            lastName: string()
                .required("Account holder last name can not be empty"),
        }),
        IBAN: string()
            .required("IBAN can not be empty."),
        BIC: string()
            .required("SWIFT/BIC code can not be empty."),
        paymentReference: string()
            .required("Payment reference can not be empty.")
    })
})
