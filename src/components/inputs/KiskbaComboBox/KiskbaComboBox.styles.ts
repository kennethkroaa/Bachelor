import { FontWeights, getTheme, mergeStyleSets } from "office-ui-fabric-react";

export const getTokens = () => {
    return {
        labelStack: {
            childrenGap: '20'
        }
    }
}

export const getClassNames = () => {
    const { semanticColors, effects } = getTheme();

    const root = {
        textColor: semanticColors.inputText,
        borderColor: semanticColors.inputBorder,
        borderHoveredColor: semanticColors.inputBorderHovered,
        borderPressedColor: semanticColors.inputFocusBorderAlt,
        borderFocusedColor: semanticColors.inputFocusBorderAlt,
        backgroundColor: semanticColors.inputBackground,
        erroredColor: semanticColors.errorText
    };

    return mergeStyleSets({
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
        placeholder: {
            marginLeft: '8px',
        },
        prefixIcon: {
            borderWidth: '1px',
            borderColor: root.borderColor,
            borderStyle: 'solid',
            borderRadius: effects.roundedCorner2,
            borderRight: 'none',
            fontSize: 16,
            backgroundColor: '#F3F2F1',
            textAlign: 'center',
            marginLeft: '-8px',
            width: '36px',
            height: '30px',
            display: 'grid',
            alignItems: 'center'
        },
        prefixIconFocused: {
            borderWidth: '2px',
            borderColor: root.borderFocusedColor,
            borderStyle: 'solid',
            borderRadius: effects.roundedCorner2,
            borderRight: 'none',
            height: '28px'
        }
    })
}