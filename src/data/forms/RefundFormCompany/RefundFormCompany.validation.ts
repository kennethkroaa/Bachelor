import { object, string } from 'yup'

export const RefundFormCompanyValidation =  object().shape({
    // CLAIMANT
    ClaimantFirstName: string()
        .required("Firstname can not be empty."),
    ClaimantMiddleName: string(),
    ClaimantLastName: string()
        .required("Lastname can not be empty."),
    ClaimantEmail: string()
        .email("Email must be valid.")
        .required("Email can not be empty."),
    ClaimantPhone: string()
        //.matches(/^[0-9\b]+$/, "Phone number can only be numeric.")
        .required("Phone number can not be empty."),
    ClaimantAddress: string()
        .required("Claimant Address can not be empty"),
    ClaimantCity: string()
        .required("Claimant City can not be empty"),
    ClaimantCountry: string()
        .required("Claimant country can not be empty."),
    ClaimantPostalCode: string()
        .required("Claimant postal code can not be empty."),            
    TaxIdentificationNumber: string()
        .required("Tax Identification Number can not be empty."),

    // REPRESENTATIVE         
    RepresentativeFirstName: string(),
    RepresentativeMiddleName: string(),
    RepresentativeLastName: string(),
    ContactFirstName: string(),
    ContactMiddleName: string(),
    ContactLastName: string(),
    RepresentativeEmail: string(),
    RepresentativeAddress: string(),
    RepresentativeCity: string(),
    RepresentativeCountry: string(),
    RepresentativePostalCode: string(),

    // DOUBLE TAXATION TREATY
    DoubleTaxationTreatyCountry: string()
        .required("Double Taxation Treaty country can not be empty."),
    
    // PAYMENTDETAILS
    BankName: string()
        .required("Bank name can not be empty."),
    BankAddress: string()
        .required("Bank address can not be empty."),
    AccountHolderFirstName: string()
        .required("Account holder first name can not be empty"),
    AccountHolderMiddleName: string(),
    AccountHolderLastName: string()
        .required("Account holder last name can not be empty"),
    IBAN: string()
        .required("IBAN can not be empty."),
    SWIFTorBIC: string()
        .required("SWIFT/BIC code can not be empty."),
    PaymentReference: string()
        .required("Payment reference can not be empty."),
})