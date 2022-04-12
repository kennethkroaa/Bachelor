import { mergeStyleSets } from '@uifabric/merge-styles';
import { getTheme } from '@uifabric/styling';
import KiskbaBannerProps from "./KiskbaBanner.types";

export const getClassNames = (props: KiskbaBannerProps) => {
    const palette = getTheme().palette;

    return mergeStyleSets({
        root: {
            position: 'relative',
            width: '100%',
            height: '64px',
            backgroundColor: palette.themeSecondary
        },
        pageTitleContainer: {
            alignItems: 'center',
            justifyContent: 'center',
            display: 'flex',
            color: 'white'
        },
        pageTitleLink: {
            color: 'inherit', 
            textDecoration: 'inherit'
        },
        text: {
            color: 'white'
        },
        bannerIcon: {
            backgroundColor: 'white',
            color: 'black',
            borderRadius: '50%',
            border: '8px solid white',
            marginLeft: '8px'
        }
    })
}