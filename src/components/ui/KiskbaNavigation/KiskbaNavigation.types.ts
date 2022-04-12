import { INavProps } from "office-ui-fabric-react";

export interface KiskbaNavigationProps extends INavProps {
    useCurrentPath: boolean;
    kiskbaForm?: any;
    form?: any;
}