import useKiskbaForm from "@components/hooks/useKiskbaForm/useKiskbaForm";
import KiskbaNavigation from "@components/ui/KiskbaNavigation";
import KiskbaSideRail from "@components/ui/KiskbaSideRail";
import { Router } from "@i18n";
import { useRouter } from "next/router";
import { CommandBar, getTheme, ICommandBarItemProps } from "office-ui-fabric-react";
import React, { useEffect, useState } from "react";
import { Col, Row } from "react-grid-system";
import { FormContext } from "react-hook-form";
import ColumnLayout from "../ThreeColumnLayout/ThreeColumnLayout";
import { getClassNames } from "./FormLayout.styles";

const commandBarItems: ICommandBarItemProps[] = [
    {
        key: 'upload',
        buttonStyles: { root: { backgroundColor: getTheme().palette.neutralLight }},
        text: 'Attach',
        iconProps: { iconName: 'Attach' },
        subMenuProps: {
            items: [
                {
                    key: 'certificate',
                    text: 'Certificate of Residence',
                    iconProps: { iconName: 'TextDocument' }
                },
                {
                    key: 'docs',
                    text: 'Representative Permission',
                    iconProps: { iconName: 'TextDocument' }
                },
                {
                    key: 'docs',
                    text: 'Dividend Receipt(s)',
                    iconProps: { iconName: 'Documentation' }
                },
                {
                    key: 'docs',
                    text: 'Other',
                    iconProps: { iconName: 'Documentation' }
                }
            ]
        }
    },
    {
        key: 'print',
        buttonStyles: { root: { backgroundColor: getTheme().palette.neutralLight }},
        text: 'Print Version',
        iconProps: { iconName: 'Print' }
    }
];

const navGroups = [
    {
        name: 'Form',
        links: [
            {
                key: 'overview',
                name: 'Overview',
                icon: 'DocumentSet',
                url: '',
                base: 'form',
                query: 'formType',
                page: 'overview'
            },
            {
                key: 'fill',
                name: 'Fill Form',
                icon: 'PageHeaderEdit',
                url: '',
                base: 'form',
                query: 'formType',
                page: 'fill'
            },
            {
                key: 'files',
                name: 'Files',
                icon: 'Attach',
                url: '',
                base: 'form',
                query: 'formType',
                page: 'files'
            }
        ]
    }, {
        name: 'Help',
        links: [
            {
                key: 'FillHelp',
                name: 'Help for filling out a form',
                icon: 'Help',
                url: '',
                base: 'form',
                query: 'formType',
                page: 'help#FillHelp'
            },
            {
                key: 'AttachementHelp',
                name: 'Help for file attachements',
                icon: 'Help',
                url: '',
                base: 'form',
                query: 'formType',
                page: 'help#AttachementHelp'
            },
            {
                key: 'About',
                name: 'About the form',
                icon: 'Help',
                url: '',
                base: 'form',
                query: 'formType',
                page: 'help#About'
            }
        ]   
    }
]

const FormLayout: React.FunctionComponent<any> = (props) => {
    const {
        form,
        content
    } = props;

    const classes = getClassNames();

    const [navKey, setNavKey] = useState<any>("");

    const router = useRouter();
    const kiskbaForm = useKiskbaForm(form.component, form.name);

    const ContentComponent = content; //PascalCase content prop to use as a component

    //Override fabric ui command bad styling
    const commandBarFabricStyles = {
        root: {
            backgroundColor: getTheme().palette.neutralLight
        }
    };

    useEffect(() => {
        //Silly workaround to check if path has a hash
        //Next.js has no default handling of hash in routes other than
        //onHashChange which doesn't reload page
        if(!router.asPath.includes("#"))
            setNavKey(router.pathname.split('/').pop());
    });

    /* Set navigation key whenever hash changes */
    Router.events.on("customHashChange", (hash: string) => {
        setNavKey(hash);
    })

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
                            form={form}
                            kiskbaForm={kiskbaForm}
                        />
                    </Col>
                </Row>
            </Col>
        );
    }

    const RenderSideRail = () => {
        return (
            <div className={classes.siderailContainer}>
                <KiskbaSideRail
                    fields={kiskbaForm.sectionRefFields}
                    refs={kiskbaForm.sectionRefs}
                    selectedSection={kiskbaForm.selectedSection}
                    stepper={kiskbaForm.data?.stepper}
                />
            </div>
        )
    }

    /* All inputs are wrapped into a react-hook-form FormContext from here */
    return (
        <FormContext {...kiskbaForm.methods}>
            <ColumnLayout
                onRenderHeader={<RenderFormCommandBar/>}
                onRenderNavigation={<RenderNavigation/>}
                onRenderContent={
                    <ContentComponent 
                        kiskbaForm={kiskbaForm}
                        form={form}
                    />
                }
                onRenderSideRail={<RenderSideRail/>}
            />
        </FormContext>
    )
}

export default FormLayout;