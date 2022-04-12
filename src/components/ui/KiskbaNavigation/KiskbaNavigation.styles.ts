import { mergeStyleSets } from "office-ui-fabric-react"

export const getClassNames = () => {
    return mergeStyleSets({
        titleText: {
            fontSize: '16px',
            fontWeight: 600,
            color: 'rgb(96, 94, 92)',
            paddingTop: '12px'
        }
    })
}