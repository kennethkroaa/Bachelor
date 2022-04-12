import { mergeStyleSets } from '@uifabric/merge-styles';
import { getTheme } from '@uifabric/styling';

export const getClassNames = () => {
    const palette = getTheme().palette;

    return mergeStyleSets({
        siteRoot: {
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'stretch'
        },
        // Element that wraps everything except for the header
        siteWrapper: {
            flexGrow: 1,
            margin: '0 auto',
            width: '100%',
            maxWidth: '100%',
            position: 'relative',
            display: 'flex',
            flexDirection: 'column'
        },
        siteContent: {
            position: 'relative',
            outline: 'none'
        }
    })
}