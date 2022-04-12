import { AnimationStyles, FontWeights, getTheme, mergeStyleSets } from "office-ui-fabric-react";

export const getClassNames = () => {
    const theme = getTheme();

    return mergeStyleSets({
        errorMessage: {
            color: 'rgb(164, 38, 44)',
            paddingTop: '5px',
            fontSize: 12,
            ...AnimationStyles.slideDownIn10
        },
        errorMessageIcon: {
            fontSize: 16,
            position: 'relative',
            paddingRight: '6px',
            top: '3px'
        },
        description: {
            position: 'relative',
            top: '2px',
            fontWeight: FontWeights.semibold,
            fontSize: 11
        },
        iconButton: {
            marginBottom: -3
        },
        labelStack: {
            padding: 20 
        },
        prefixIcon: {
            fontSize: 16
        }
    })
}