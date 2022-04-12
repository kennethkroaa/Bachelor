import FormLayout from "@components/layouts/FormLayout/FormLayout";
import SiteLayout from "@components/layouts/SiteLayout";
import formModules from "@data/forms";
import FormSubmission from "@modules/form/FormSubmission";
import { useRouter } from "next/router";

const FormSubmissionPage = () => {
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
            <FormLayout form={form} content={FormSubmission}>
            </FormLayout>
        </SiteLayout>
    )   
}

FormSubmissionPage.getInitialProps = async () => ({
    namespacesRequired: ['common'],
})

export default FormSubmissionPage;