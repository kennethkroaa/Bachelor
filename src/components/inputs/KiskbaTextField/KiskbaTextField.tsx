import { Callout, DefaultButton, DirectionalHint, FontIcon, getId, getInputFocusStyle, IconButton, ITextFieldStyleProps, ITextFieldStyles, Stack, Text, TextField, TooltipHost } from 'office-ui-fabric-react';
import React, { useState } from 'react';
import { getClassNames, getTokens } from './KiskbaTextField.styles';
import { KiskbaTextFieldProps } from './KiskbaTextField.types';

const onRenderDescription = (descriptionProps: any) => {
    const classes = getClassNames();

    return (
        <Stack>
            <Text className={classes.description}>
                {descriptionProps.description}
            </Text>
            {descriptionProps.errors && 
                <>
                    {descriptionProps.errors.map((error: string) => (
                        <Text key={error} className={classes.errorMessage}>
                            <FontIcon iconName={"Error"} className={classes.errorMessageIcon}/>
                            {error}
                        </Text>
                    ))}
                </>
            }
        </Stack>
    )
}

const onRenderPrefix = (prefixProps: any) => {
    const classes = getClassNames();

    return (
        <FontIcon iconName={prefixProps.prefixIcon} className={classes.prefixIcon}/>
    )
}

const KiskbaTextField: React.FunctionComponent<KiskbaTextFieldProps> = (props) => {
    const [ isCalloutVisible, setCalloutVisible ] = useState(false);

    const descriptionId: string = getId('description');
    const iconButtonId: string = getId('iconButton');
    const tooltipId: string = getId('tooltip');

    const onIconClick = (): void => {
        setCalloutVisible(!isCalloutVisible);
    }

    const onDismiss = (): void => {
        setCalloutVisible(false);
    }

    const getStyles = (styleProps: ITextFieldStyleProps): Partial<ITextFieldStyles> => {
        return {
            fieldGroup: [
                props.errors && props.errors.length > 0 && [
                    {
                        borderColor: styleProps.theme.semanticColors.errorText,
                    },
                    {
                        selectors: {
                            '&:hover': {
                                borderColor: styleProps.theme.semanticColors.errorText
                            }
                        }
                    },
                    styleProps.focused &&
                    getInputFocusStyle(styleProps.theme.semanticColors.errorText, styleProps.theme.effects.roundedCorner2)
                ]
            ]
        };
    }

    const onRenderLabel = (labelProps: any, defaultRender: any) => {
        const tokens = getTokens();
        const classes = getClassNames();
        
        return (
            <>
                <Stack horizontal>
                    <span>{defaultRender(labelProps)}</span>
                    <TooltipHost
                        content={props.iconButtonTitle}
                        directionalHint={DirectionalHint.rightCenter}
                        id={tooltipId}
                    >
                    <IconButton
                        id={iconButtonId}
                        iconProps={{ iconName: props.icon }}
                        ariaLabel={props.iconButtonAriaLabel}
                        onClick={onIconClick}
                        className={classes.iconButton}
                    />
                    </TooltipHost>
                </Stack>
                {isCalloutVisible && (
                    <Callout
                        target={`#${props.id}`}
                        setInitialFocus={true}
                        directionalHint={props.calloutDirection}
                        //onDismiss={_onDismiss}
                        ariaDescribedBy={descriptionId}
                        role="alertdialog"
                        calloutMaxWidth={640}
                    >
                        <Stack 
                            tokens={tokens.labelStack} 
                            horizontalAlign="start"
                            className={classes.labelStack}
                        >
                            <span id={descriptionId}>{props.calloutText}</span>
                            <DefaultButton onClick={onDismiss}>Close</DefaultButton>
                        </Stack>
                    </Callout>
                )}
            </>
        )
    };

    return (
        <TextField 
            { ...props }
            onRenderPrefix={props.prefixIcon ? onRenderPrefix : undefined}
            onRenderDescription={onRenderDescription}
            onRenderLabel={onRenderLabel}
            styles={getStyles}
        />
    )
}

KiskbaTextField.defaultProps = {
    calloutDirection: DirectionalHint.topCenter,
    icon: "Info",
    iconButtonTitle: "Info",
    iconButtonAriaLabel: "Info"
}

export default KiskbaTextField;