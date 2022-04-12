import CasesLayout from '@components/layouts/CasesLayout/CasesLayout'
import SiteLayout from '@components/layouts/SiteLayout'
import { withTranslation } from '@i18n'
import CasesIndex from '@modules/cases/CasesIndex'

const CaseIndexPage = () => (
    <SiteLayout title="Case Management">
        <CasesLayout content={CasesIndex}>
        </CasesLayout>
    </SiteLayout>
)

CaseIndexPage.getInitialProps = async () => ({
    namespacesRequired: ['common'],
})

export default withTranslation('common')(CaseIndexPage)
