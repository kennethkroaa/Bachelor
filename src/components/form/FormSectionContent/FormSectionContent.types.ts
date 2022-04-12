/**
 * FormSectionContent component props.
 * {@docCategory FormSectionContent}
 */
export interface FormSectionContentProps {
    /**
     * Item object to display
     */
    item: any;
    /**
     * Title to display
     */
    sectionTitle: string;
    /**
     * Function to call when an input in this section is clicked
     */
    onInputClick: any;
}