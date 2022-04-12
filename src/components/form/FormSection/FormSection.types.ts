import { IKiskbaFormSection } from "@data/forms/types";

/**
 * FormSection component props.
 * {@docCategory FormSection}
 */
export interface FormSectionProps {
    /**
     * Hide section index in title
     */
    hideIndex?: boolean;
    /**
     * Reference to a form section object
     */
    section: IKiskbaFormSection;
    /**
     * Section index
     */
    index: number;
    /**
     * Function to call when an input in this section is clicked
     */
    onInputClick?: any;
    /**
     * Optional component to display instead
     */
    Component?: React.FunctionComponent;
}