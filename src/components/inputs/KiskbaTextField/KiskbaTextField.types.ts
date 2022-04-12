import { DirectionalHint, ITextFieldProps } from "office-ui-fabric-react";

/**
 * KiskbaTextField component props.
 * {@docCategory KiskbaTextField}
 */
export interface KiskbaTextFieldProps extends ITextFieldProps {
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
     * Unique identifier identifier
     */
    id: string;
    /**
     * Unique name identifier used for react-hook-form
     */
    name: string;
    /**
     * Input type
     */
    type: string;
    /**
     * Web browser auto-complete name
     */
    autoComplete?: string;
}