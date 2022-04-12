import { KiskbaComboBoxProps } from "@components/inputs/KiskbaComboBox/KiskbaComboBox.types";
import { KiskbaDropdownProps } from "@components/inputs/KiskbaDropdown/KiskbaDropdown.types";
import { KiskbaDropzoneProps } from "@components/inputs/KiskbaDropzone/KiskbaDropzone.types";
import { KiskbaRadioButtonProps } from "@components/inputs/KiskbaRadioButton/KiskbaRadioButton.types";
import { KiskbaTextFieldProps } from "@components/inputs/KiskbaTextField/KiskbaTextField.types";
import { KiskbaTableProps } from "@components/tables/KiskbaTable/KiskbaTable.types";
import { KiskbaTableDividendsProps } from "@components/tables/KiskbaTableDividends/KiskbaTableDividends.types";
import { ColProps } from "react-grid-system";
import { ObjectSchema, Shape } from "yup";

export interface IKiskbaForm {
    validator?: ObjectSchema<Shape<object, any>>;
    title: string;
    description: string;
    sections: IKiskbaFormSection[];
}

export interface IKiskbaFormSection {
    title: string;
    id: string;
    description?: string;
    fields?: string[];
    items?: IKiskbaFormItem[];
}

export interface IKiskbaFormItem {
    component?: React.ReactNode;

    KiskbaDropzone?: KiskbaDropzoneProps;
    KiskbaTextField?: KiskbaTextFieldProps;
    KiskbaDropdown?: KiskbaDropdownProps;
    KiskbaComboBox?: KiskbaComboBoxProps;
    KiskbaTable?: KiskbaTableProps;
    KiskbaTableDividends?: KiskbaTableDividendsProps;
    KiskbaRadioButton?: KiskbaRadioButtonProps

    columns?: IKiskbaFormColumn[];
}

interface IKiskbaFormColumn extends IKiskbaFormItem {
    properties?: ColProps;
}