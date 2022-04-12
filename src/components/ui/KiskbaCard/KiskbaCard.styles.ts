import { mergeStyleSets } from '@uifabric/merge-styles';
import { getTheme } from '@uifabric/styling';
import { KiskbaCardProps } from "./KiskbaCard.types";

export const getTokens = () => {
    return {
        cardTokens: {
            minWidth: 100,
            maxWidth: "none",
            childrenMargin: 24
        }
    }
}

export const getClassNames = (props: KiskbaCardProps) => {
    const theme = getTheme();

    return mergeStyleSets({
        card: {
            backgroundColor: 'white',
            outline: 'none'
        },
        cardAnimation: {
            animationDelay: props.animationDelay,
            ...props.animation
        }
    })
}