import FormSectionContent from "@components/form/FormSectionContent";
import { Col, Row } from "react-grid-system";
import { FormSectionStackProps } from "./FormSectionStack.types";

/*
    FormSectionStack splits a section into columns defined in a data object
*/

const FormSectionStack = ({ columns, sectionTitle, onInputClick }: FormSectionStackProps) => (
    <Row>
        {columns.map((column: any, columnIndex: any) => (
            <Col { ...column.properties } key={columnIndex}>
                <FormSectionContent 
                    onInputClick={onInputClick} 
                    sectionTitle={sectionTitle} 
                    item={column}
                />
            </Col>
        ))}
    </Row>
)

export default FormSectionStack;