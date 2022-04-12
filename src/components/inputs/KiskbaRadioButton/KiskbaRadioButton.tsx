import { ChoiceGroup, DirectionalHint, IChoiceGroupOption, TextField } from 'office-ui-fabric-react';
import React from 'react';
import { KiskbaRadioButtonProps } from './KiskbaRadioButton.types';

const options: IChoiceGroupOption[] = [
    { key: 'StandardPursuant', 
    text: "Pursuant to the standard double taxation treaty rate"},
    { key: 'NonStandardPursuant', 
    text: "Pursuant to the taxation rate of the special provision in Article",
    onRenderField: (props, render) => {
        return (
            <div>
                {render!(props)}
                <TextField label="Insert article here"/>
            </div>
        )
    }}
]

const KiskbaRadioButton: React.FunctionComponent<KiskbaRadioButtonProps> = (props) => {
    return (
        <ChoiceGroup
            { ...props }
            required={true}
        />
    )
}

KiskbaRadioButton.defaultProps = {
    calloutDirection: DirectionalHint.topCenter,
    icon: "Info",
    iconButtonTitle: "Info",
    iconButtonAriaLabel: "Info"
}

export default KiskbaRadioButton;