import { AnimationStyles, FontWeights, getTheme, mergeStyleSets } from "office-ui-fabric-react";

export const getTokens = () => {
    return {
        labelStack: {
            childrenGap: '20'
        }
    }
}

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
            fontSize: 16,
            backgroundColor: '#F3F2F1',
            width: '36px',
            textAlign: 'center',
            marginLeft: '-8px'
        },
        flagIcon: {
            //marginRight: '8px',
            border: '8px solid #F3F2F1',
            marginLeft: '-8px'
        },
        placeholder: {
            position: 'relative',
            left: 12,
            bottom: 3
        },
        selected: {
            position: 'relative',
            left: 12,
        },
        test: {
            position: 'relative',
            left: 12,
            bottom: 3
        }
    })
}