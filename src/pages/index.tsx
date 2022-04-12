import SiteLayout from '@components/layouts/SiteLayout'
import { withTranslation } from '@i18n'
import HomeModule from '../modules/home/HomeModule'

const IndexPage = () => (
    <SiteLayout title="Index Page">
        <HomeModule/>
    </SiteLayout>
)

IndexPage.getInitialProps = async () => ({
    namespacesRequired: ['common'],
})

export default withTranslation('common')(IndexPage)
