import { setCaseStatusRequest } from "@store/case/reducer";
import { CommandBar, getTheme, ICommandBarItemProps } from "office-ui-fabric-react";
import { Col, Row } from "react-grid-system";
import { useDispatch } from "react-redux";
import SimpleLayout from "../SimpleLayout/SimpleLayout";
import { getClassNames } from "./CaseLayout.styles";

const CaseLayout: React.FunctionComponent<any> = (props) => {
    const { id, content } = props;
    const dispatch = useDispatch();
    const classes = getClassNames();
    const ContentComponent = content; //PascalCase content prop to use as a component

    const setStatus = (status: string) => {
        dispatch(setCaseStatusRequest({
            id: id,
            status: status
        }))
    }

    const commandBarItems: ICommandBarItemProps[] = [
        {
            key: 'setStatus',
            buttonStyles: { root: { backgroundColor: getTheme().palette.neutralLight }},
            text: 'Set Status',
            iconProps: { iconName: 'PageEdit' },
            subMenuProps: {
                items: [
                    {
                        key: 'pending',
                        text: 'Pending',
                        iconProps: { 
                            iconName: 'More',
                            styles: {
                                root: {
                                    color: getTheme().palette.blueLight,
                                }
                            }
                        },
                        onClick: () => setStatus("Pending")
                    },
                    {
                        key: 'inprogress',
                        text: 'In Progress',
                        iconProps: { 
                            iconName: 'ProgressRingDots' ,
                            styles: {
                                root: {
                                    color: getTheme().palette.orangeLight,
                                }
                            }
                        },
                        onClick: () => setStatus("InProgress")
                    },
                    {
                        key: 'declined',
                        text: 'Declined',
                        iconProps: { 
                            iconName: 'ErrorBadge',
                            styles: {
                                root: {
                                    color: getTheme().palette.red,
                                }
                            }
                        },
                        onClick: () => setStatus("Declined")
                    },
                    {
                        key: 'approved',
                        text: 'Approved',
                        iconProps: { 
                            iconName: 'DocumentApproval',
                            styles: {
                                root: {
                                    color: getTheme().palette.green,
                                }
                            }
                        },
                        onClick: () => setStatus("Approved")
                    }
                ]
            }
        }
    ];
    
    const commandBarFabricStyles = {
        root: {
            backgroundColor: getTheme().palette.neutralLight
        }
    };

    const RenderFormCommandBar = () => (
        <Row className={classes.commandBarContainer} style={{marginRight: 0}}>
            <Col sm={6} style={{ position: 'relative', left: '20px' }}>
                <CommandBar
                    styles={commandBarFabricStyles}
                    items={commandBarItems}
                    ariaLabel=""
                />
            </Col>
        </Row>
    )
    
    return (
        <SimpleLayout
            onRenderHeader={<RenderFormCommandBar/>}
            onRenderContent={
                <ContentComponent
                    id={id}
                />
            }
        />
    )
}

export default CaseLayout;