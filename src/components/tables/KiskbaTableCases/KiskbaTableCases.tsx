import { ShimmeredDetailsList } from "office-ui-fabric-react";
import { getClassNames } from "./KiskbaTableCases.styles";
import { KiskbaTableCasesProps } from "./KiskbaTableCases.types";

const KiskbaTableCases: React.FunctionComponent<KiskbaTableCasesProps> = (props) => {
    const classes = getClassNames();

    return (
        <ShimmeredDetailsList
            {...props}
        />
    )
}

export default KiskbaTableCases;