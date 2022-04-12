import { Col, Container, Row } from "react-grid-system";
import { getClassNames } from "./ThreeColumnLayout.styles";

const ColumnLayout: React.FunctionComponent<any> = (props) => {
    const classes = getClassNames();

    const {
        onRenderHeader,
        onRenderNavigation,
        onRenderContent,
        onRenderSideRail
    } = props;

    /* React-grid-system doesn't always agree with classNames so this is kind of all over the place */
    return (
        <Container fluid style={{
            paddingLeft: '0px',
            paddingRight: '0px',
            flexGrow: 1,
            display: 'flex'
        }}>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                flex: 'auto'
            }}>
                {/* Content that spans across the top */}
                {onRenderHeader}
                {/* Stack for nav/content/siderail */}
                <Row style={{
                    marginLeft: '0px',
                    marginRight: '0px',
                    flex: 'auto'
                }} className={classes.columnLayoutContainer}>
                    {/* Navigation stack */}
                    <Col 
                        sm={3}
                        className={classes.columnLayoutNavigation}
                    >
                        {onRenderNavigation} 
                    </Col>
                    {/* Content stack */}
                    <Col
                        sm={6}
                        className={classes.columnLayoutContent}
                    >
                        {onRenderContent}
                    </Col>
                    {/* SideRail stack */}
                    <Col
                        sm={3} 
                        className={classes.columnLayoutSideRail}
                    >
                        {onRenderSideRail}
                    </Col>
                </Row>
            </div>
        </Container>
    )
}

export default ColumnLayout;