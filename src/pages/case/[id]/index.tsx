import CaseLayout from "@components/layouts/CaseLayout";
import SiteLayout from "@components/layouts/SiteLayout";
import CaseIndex from "@modules/case/CaseIndex";
import { useRouter } from "next/router";
import React from "react";

const Case = () => {
    const router = useRouter();
    const { id } = router.query;

    return (
        <SiteLayout title={"Case #" + id}>
            <CaseLayout id={id} content={CaseIndex}>
            </CaseLayout>
        </SiteLayout>
    )
}

Case.getInitialProps = async () => ({
    namespacesRequired: ['common'],
})

export default Case;