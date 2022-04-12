/**
 * FormSectionStack component props.
 * {@docCategory FormSectionStack}
 */

export interface FormSectionStackProps {
    /**
     * Array of section components to display
     */
    columns: [];
    /**
     * Title to display
     */
    sectionTitle: any;
    /**
     * Function to call when an input in this section is clicked
     */
    onInputClick: any;
}