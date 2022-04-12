import KiskbaNavigation from "@components/ui/KiskbaNavigation";
import { Router } from "@i18n";
import { useRouter } from "next/router";
import { CommandBar, getTheme, ICommandBarItemProps } from "office-ui-fabric-react";
import { useEffect, useState } from "react";
import { Col, Row } from "react-grid-system";
import TwoColumnLayout from "../TwoColumnLayout/TwoColumnLayout";
import { getClassNames } from "./CasesLayout.styles";

const commandBarItems: ICommandBarItemProps[] = [
    {
        key: 'ex1',
        buttonStyles: { root: { backgroundColor: getTheme().palette.neutralLight }},
        text: 'Example Action 1',
        iconProps: { iconName: 'DocumentSet' }
    },
    {
        key: 'ex2',
        buttonStyles: { root: { backgroundColor: getTheme().palette.neutralLight }},
        text: 'Example Action 2',
        iconProps: { iconName: 'DocumentSet' }
    }
];

/*
    All inquiries
    Unresolved inquiries
    Resolved inquiries
    Processed inquiries
*/

const navGroups = [
    {
        name: 'Case Management',
        links: [
            {
                key: 'allInquiries',
                name: 'All inquiries',
                icon: 'DocumentSet',
                url: '',
                base: '',
                query: '',
                page: ''
            },
            {
                key: 'unresolvedInquiries',
                name: 'Unresolved inquiries',
                icon: 'DocumentSet',
                url: '',
                base: '',
                query: '',
                page: ''
            },
            {
                key: 'resolvedInquiries',
                name: 'Resolved inquiries',
                icon: 'DocumentSet',
                url: '',
                base: '',
                query: '',
                page: ''
            },
            {
                key: 'processedInquiries',
                name: 'Processed inquiries',
                icon: 'DocumentSet',
                url: '',
                base: '',
                query: '',
                page: ''              
            }
        ]
    }
]

const CasesLayout: React.FunctionComponent<any> = (props) => {
    const { content } = props;
    
    const classes = getClassNames();

    const [navKey, setNavKey] = useState<any>("");

    const ContentComponent = content; //PascalCase content prop to use as a component

    const router = useRouter();

    const commandBarFabricStyles = {
        root: {
            backgroundColor: getTheme().palette.neutralLight
        }
    };

    const RenderFormCommandBar = () => (
        <Row className={classes.commandBarContainer} style={{marginRight: 0}}>
            <Col sm={3}></Col>
            <Col sm={6} style={{ position: 'relative', left: '20px' }}>
                <CommandBar
                    styles={commandBarFabricStyles}
                    items={commandBarItems}
                    ariaLabel=""
                />
            </Col>
        </Row>
    )

    useEffect(() => {
        //Silly workaround to check if path has a hash
        //Next.js has no default handling of hash in routes other than
        //onHashChange which doesn't reload page
        if(!router.asPath.includes("#"))
            setNavKey(router.pathname.split('/').pop());
    });

    Router.events.on("customHashChange", (hash: string) => {
        setNavKey(hash);
    })

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
                            selectedKey={navKey}
                            useCurrentPath={true}
                        />
                    </Col>
                </Row>
            </Col>
        );
    }

    return (
        <TwoColumnLayout
            onRenderHeader={<RenderFormCommandBar/>}
            onRenderNavigation={<RenderNavigation/>}
            onRenderContent={
                <ContentComponent/>
            }
        />
    )
}

export default CasesLayout;