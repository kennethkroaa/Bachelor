import { getTheme, mergeStyleSets } from "office-ui-fabric-react";

export const getClassNames = () => {
    const theme = getTheme();

    return mergeStyleSets({
        commandBarContainer: {
            backgroundColor: theme.palette.neutralLight
        },
        navColumn: {
            marginRight: 64
        },
        navContainer: {
            top: 64,
            marginTop: 160,
            marginBottom: 0,
            position: 'sticky',
        },
    })
}