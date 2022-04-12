import { Text } from "office-ui-fabric-react";
import * as React from "react";
import { getClassNames } from "./KiskbaCardTitle.styles";
import { KiskbaCardTitleProps } from "./KiskbaCardTitle.types";

const KiskbaCardTitle: React.FunctionComponent<KiskbaCardTitleProps> = (props) => {
    const { title, description } = props;
    const classes = getClassNames();

    return (
        <>
                <Text variant="xxLarge">
                    {title}
                </Text>
                {description && 
                    <Text variant="mediumPlus" className={classes.description}>
                        {description}
                    </Text>
                }
            </>
    )
}

export default KiskbaCardTitle;