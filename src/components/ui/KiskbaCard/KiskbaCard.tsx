import { Card } from '@uifabric/react-cards';
import { css } from "office-ui-fabric-react";
import * as React from "react";
import { getClassNames, getTokens } from "./KiskbaCard.styles";
import { KiskbaCardProps } from "./KiskbaCard.types";

const KiskbaCard: React.FunctionComponent<KiskbaCardProps> = (props) => {
    const classes = getClassNames(props);
    const tokens = getTokens();
    
    return (
        <Card {...props} 
            tokens={tokens.cardTokens} 
            className={
                css(classes.card, 
                    props.animation && classes.cardAnimation)
            }
        >
            {props.children}
        </Card>
    )
}

export default KiskbaCard;