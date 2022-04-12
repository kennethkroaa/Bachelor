import { mergeStyleSets } from '@uifabric/merge-styles';
import { getTheme } from '@uifabric/styling';

export const getClassNames = () => {
    const theme = getTheme();

    return mergeStyleSets({
        description: {
            paddingBottom: '8px',
            position: 'relative',
            bottom: '12px'
        }
    })
}