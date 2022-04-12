import { IKiskbaForm } from "@data/forms/types";

/**
 * useKiskbaForm props.
 * {@docCategory useKiskbaForm}
 */
export interface useKiskbaFormProps {
    /**
     * The form to control
     */
    form: IKiskbaForm;
    /**
     * The name of the form
     */
    id?: string;
}