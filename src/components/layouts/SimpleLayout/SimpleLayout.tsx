import { Col, Container, Row } from "react-grid-system";
import { getClassNames } from "./SimpleLayout.styles";

const SimpleLayout: React.FunctionComponent<any> = (props) => {
    const classes = getClassNames();

    const {
        onRenderHeader,
        onRenderNavigation,
        onRenderContent
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
                {/* Stack for content */}
                <Row style={{
                    marginLeft: '0px',
                    marginRight: '0px',
                    flex: 'auto'
                }} className={classes.columnLayoutContainer}>
                    {/* Content stack */}
                    <Col
                        
                        className={classes.columnLayoutContent}
                    >
                        {onRenderContent}
                    </Col>
                </Row>
            </div>
        </Container>
    )
}

export default SimpleLayout;