import FormLayout from "@components/layouts/FormLayout/FormLayout";
import SiteLayout from "@components/layouts/SiteLayout";
import formModules from "@data/forms";
import FormReceipt from "@modules/form/FormReceipt";
import { useRouter } from "next/router";

const FormReceiptPage = () => {
    const router = useRouter();
    const { formType } = router.query;

    const form = formModules.find((formModule) => {
        return formModule.name == formType ? 
            formType : undefined;
    });

    if(!form)
        return (<div>Error</div>)

    return (
        <SiteLayout title="Form">
            <FormLayout form={form} content={FormReceipt}>
            </FormLayout>
        </SiteLayout>
    )   
}

FormReceiptPage.getInitialProps = async () => ({
    namespacesRequired: ['common'],
})

export default FormReceiptPage;