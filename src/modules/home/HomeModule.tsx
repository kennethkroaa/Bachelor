import FormSection from '@components/form/FormSection';
import ColumnLayout from '@components/layouts/ThreeColumnLayout/ThreeColumnLayout';
import DynamicLink from '@components/router/DynamicLink';
import KiskbaCardTitle from '@components/ui/KiskbaCardTitle';
import KiskbaNavigation from '@components/ui/KiskbaNavigation';
import { Router, useTranslation, Link } from '@i18n';
import Head from 'next/head';
import { CompoundButton, Stack, MessageBar, MessageBarType, MessageBarButton } from 'office-ui-fabric-react';
import React from 'react';
import { Col, Row } from 'react-grid-system';

const navGroups = [
    {
        name: 'Home',
        links: [
            {
                key: 'home',
                name: 'Home Page',
                icon: 'Home',
                url: ''
            }
        ]
    }
]

const HomeModule = () => {
    const { t } = useTranslation();

    const CaseHandlerSection = () => {
        return (
            <Stack horizontal tokens={{childrenGap: 24}}>
                <CompoundButton 
                    secondaryText="Individual cases can be managed through this page."
                    onClick={() => Router.push('/cases')}
                >
                    Case Handler
                </CompoundButton>
                <CompoundButton 
                    secondaryText="Missing UI. Links directly to an API page that displays relevant statistics."
                    href="https://api-test.jyhne.no/claimant/2020/stats"
                >
                    Statistics
                </CompoundButton>
            </Stack>
        )
    }

    const FormsSection = () => {
        return (
            <Stack style={{paddingTop: '10px'}} horizontal tokens={{childrenGap: 24}}>
                <FormLink 
                    form="RefundFormPerson"
                    title="Person Refund Form"
                    secondaryText="Private persons can apply for a refund on their dividend payments here."
                />
                <FormLink 
                    form="RefundFormCompany"
                    title="Company Refund Form"
                    secondaryText="Companies can apply for a refund on their divident payments here."
                />
                <FormLink 
                    form="RefundFormExemption"
                    title="Exemption Refund Form"
                    secondaryText="Shareholders can apply for a refund through the tax exemption method here."
                />
            </Stack>
        )
    }

    const RenderNavigation = () => {
        return (
            <Col style={{
                top: 64,
                marginTop: 160,
                marginBottom: 0,
                position: 'sticky',                    
            }}>
                <Row>
                    <Col></Col>
                    <Col style={{
                        marginRight: 48
                    }}>
                        <KiskbaNavigation
                            ariaLabel="Navigation"
                            groups={navGroups}
                            initialSelectedKey="home"
                            useCurrentPath={false}
                        />
                    </Col>
                </Row>
            </Col>
        );
    }


    const sections = [
        {
            title: 'Case Handler',
            id: 'CaseHandler',
            component: CaseHandlerSection
        },
        {
            title: 'Forms',
            id: 'Forms',
            component: FormsSection
        }
    ];

    const FormLink = (props: any) => (
        <DynamicLink 
            pathname='/form/[formType]/overview'
            query={{
                formType: props.form
            }}
            as={`/form/${props.form}/overview`}
            passHref
        >
            <a>
                <CompoundButton 
                    secondaryText={props.secondaryText}
                >
                    {props.title}
                </CompoundButton>
            </a>
        </DynamicLink>
    );

    const HomeContent = () => (
        <div style={{padding: '48px'}}>
            <Stack tokens={{childrenGap: 24}}>
                <KiskbaCardTitle
                    title="Home"
                    description="This page serves as a simple home page to navigate between the case handler and our different implemented forms."
                />

                <Stack style={{marginTop: '0px'}} tokens={{childrenGap: 8}}>
                    <MessageBar
                        messageBarType={MessageBarType.warning}
                        isMultiline={true}
                    >
                        There seems to be some bizarre bug in production that makes animations spin instead of
                        displaying correctly, unless you open dev tools and close it again (Ctrl + Shift + I in Chrome).
                    </MessageBar>
                    <MessageBar
                        messageBarType={MessageBarType.warning}
                        isMultiline={true}
                    >
                        Although we have created data and layouts for all the forms, Person Refund Form is the only one that can currently be successfully submitted.
                    </MessageBar>
                </Stack>

                {sections.map((section: any, sectionIndex: number) => (
                    <div key={sectionIndex}>
                        <FormSection
                            index={sectionIndex}
                            hideIndex
                            section={section}
                            Component={section.component}
                        />
                    </div>
                ))}
            </Stack>
        </div>
    )

    return (
        <>
            <Head>
                <title>{t('home.routes.home')}</title>
                <meta name="description" content="This is a generic description."/>
                <meta charSet="utf-8" />
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>

            <ColumnLayout
                onRenderHeader={<div></div>}
                onRenderNavigation={<RenderNavigation/>}
                onRenderContent={<HomeContent/>}
                onRenderSideRail={<div></div>}
            />
        </>
    );
};

export default HomeModule;