import FormLayout from "@components/layouts/FormLayout/FormLayout";
import SiteLayout from "@components/layouts/SiteLayout";
import formModules from "@data/forms";
import FormFill from "@modules/form/FormFill";
import { useRouter } from "next/router";

const FormFillPage = () => {
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
            <FormLayout form={form} content={FormFill}>
            </FormLayout>
        </SiteLayout>
    )   
}

FormFillPage.getInitialProps = async () => ({
    namespacesRequired: ['common'],
})

export default FormFillPage;