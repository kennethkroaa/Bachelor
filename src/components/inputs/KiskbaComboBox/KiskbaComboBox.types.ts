import { DirectionalHint, IComboBoxProps } from "office-ui-fabric-react";

/**
 * KiskbaComboBox component props.
 * {@docCategory KiskbaComboBox}
 */
export interface KiskbaComboBoxProps extends IComboBoxProps {
    /**
     * Unique name identifier used for react-hook-form
     */
    name: string;
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
}