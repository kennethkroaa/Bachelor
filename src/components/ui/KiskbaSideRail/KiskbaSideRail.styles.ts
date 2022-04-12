import { mergeStyleSets } from '@uifabric/merge-styles';
import { FontWeights, getFocusOutlineStyle, getTheme } from 'office-ui-fabric-react';

export const getClassNames = () => {
    const theme = getTheme();

    return mergeStyleSets({
        section: {
            width: "302px",
            selectors: {
                '&:last-child': {
                    marginBottom: 0
                }
            }
        },
        sectionTitle: {
            fontSize: theme.fonts.mediumPlus.fontSize,
            fontWeight: FontWeights.semibold,
            color: theme.palette.neutralSecondary,
            marginTop: 0,
            paddingLeft: 8
        },
        links: {
            marginTop: 8,
            padding: 0,
            cursor: 'pointer'
        },
        linkWrapper: {
            display: 'flex',
            fontSize: theme.fonts.medium.fontSize,
            selectors: {
                div: [
                    {
                        fontWeight: 600,
                        selectors: {
                            '&:hover': { background: theme.palette.neutralLight }
                        }
                    },
                    getFocusOutlineStyle(theme, 1)
                ]
            }
        },
        sectionLinkWrapper: {
            position: 'relative'
        },
        sectionLink: {
            color: theme.palette.neutralPrimary,
            borderLeft: '2px solid transparent',
            paddingLeft: 6, // 8px - 2px border
            paddingTop: 6,
            paddingBottom: 6,
            selectors: {
                '&:focus': {
                    color: theme.palette.neutralPrimary
                }
            }
        },
        sectionLinkActive: {
            borderColor: theme.palette.themePrimary
        },
        errorMessage: {
            color: 'rgb(164, 38, 44)',
            paddingTop: '5px',
            fontSize: 12,
        },
        errorMessageIcon: {
            fontSize: 16,
            position: 'relative',
            paddingRight: '6px',
            top: '3px'
        },
        stepCheckIcon: {
            fontSize: 16,
            position: 'relative',
            paddingRight: '6px',
            top: '3px',
            color: theme.palette.green
        },
        disabledStep: {
            color: 'grey',
            selectors: {
                '&:focus': {
                    color: 'grey'
                }
            }
        }
    })
}