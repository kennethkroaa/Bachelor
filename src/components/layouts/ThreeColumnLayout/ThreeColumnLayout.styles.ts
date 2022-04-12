import { mergeStyleSets } from '@uifabric/merge-styles';
import { getTheme } from 'office-ui-fabric-react';

export const getClassNames = () => {
    const theme = getTheme();
    
    return mergeStyleSets({
        columnLayoutContainer: {

        },
        columnLayoutContent: {
            backgroundColor: theme.palette.neutralLighter
        },
        columnLayoutSideRail: {
            backgroundColor: theme.palette.neutralLighter
        },
        columnLayoutNavigation: {

        }
    })
}