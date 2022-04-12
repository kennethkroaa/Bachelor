import { getTheme, mergeStyleSets } from "office-ui-fabric-react";

export const getClassNames = () => {
    const theme = getTheme();

    return mergeStyleSets({
        container: {
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            paddingBottom: "18px",
            paddingTop: "12px",
            marginTop: '16px',
            borderWidth: "2px",
            borderRadius: "2px",
            borderColor: "#bcbcbc",
            borderStyle: "dashed",
            outline: "none",
            transition: "border .24s ease-in-out"
        },
        containerText: {
            fontWeight: "500",
            fontSize: "16px",
            pointerEvents: 'none'
        },
        uploadIcon: {
            fontSize: "64px",
            color: "#bcbcbc",
            pointerEvents: 'none'
        },
        fileBrowserButton: {
            fontWeight: "500",
            fontSize: "16px",
            margin: "0",
            padding: "0",
            pointerEvents: 'auto',
            color: theme.palette.blue
        },
        dragAccept: {
            borderColor: theme.palette.greenLight,
            background: 'rgb('
        },
        dragReject: {
            borderColor: '#ff1744'
        },
        dragActive: {
            borderColor: 'red'
        }
    })
}