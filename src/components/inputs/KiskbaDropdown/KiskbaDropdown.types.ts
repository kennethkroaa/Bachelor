import { DirectionalHint, IDropdownProps } from "office-ui-fabric-react";

export interface KiskbaDropdownProps extends IDropdownProps {
    /**
     * Errors to display underneath the component
     */
    errors?: any[];
    /**
     * Icon to display
     */
    prefixIcon?: string;
    /**
     * Title attribute on icon button
     */
    iconButtonTitle?: string;
    /**
     * Aria-label for icon button
     */
    iconButtonAriaLabel?: string;
    /**
     * Name of icon displayed beside the label
     */
    icon?: string;
    /**
     * Description text shown underneath the input
     */
    description?: string;
    /**
     * Text shown inside Callout
     */
    calloutText?: string;
    /**
     * Direction to display callout
     * @defaultvalue DirectionalHint.topRightEdge
     */
    calloutDirection?: DirectionalHint;
    /**
     * Unique name identifier used for react-hook-form
     */
    name: string;
    /**
     * Selected dropdown value
     */
    value?: string;

    /**
     * Display a flag
     */
    flag?: boolean;
}