import { DetailsList } from "office-ui-fabric-react";
import { getClassNames } from "./KiskbaTable.styles";
import { KiskbaTableProps } from "./KiskbaTable.types";

const KiskbaTable: React.FunctionComponent<KiskbaTableProps> = (props) => {
    const classes = getClassNames();

    return (
        <>
            <DetailsList { ...props }/>
        </>
    )
}

export default KiskbaTable;