import { Callout, ComboBox, css, DefaultButton, FontIcon, getId, IconButton, Stack, StackItem, Text } from "office-ui-fabric-react";
import React, { useState } from "react";
import { getClassNames, getTokens } from "./KiskbaComboBox.styles";
import { KiskbaComboBoxProps } from "./KiskbaComboBox.types";

const KiskbaComboBox: React.FunctionComponent<KiskbaComboBoxProps> = (props) => {
    const [ isCalloutVisible, setCalloutVisible ] = useState(false);
    const [ isFocused, setFocused ] = useState(false);

    const classes = getClassNames();
    
    const descriptionId: string = getId('description');
    const iconButtonId: string = getId('iconButton');

    const comboBoxFabricStyles = {
        root: {
            selectors: {
                ':after': {
                    borderLeft: 'none'
                },
            }
        },
        rootPressed: {
            selectors: {
                ':after': {
                    borderLeft: 'none'
                }
            }                                
        },
        rootFocused: {
            selectors: {
                ':after': {
                    borderLeftStyle: 'none'
                }
            }                                
        }
    }

    const onIconClick = (): void => {
        setCalloutVisible(!isCalloutVisible);
    }

    const onDismiss = (): void => {
        setCalloutVisible(false);
    }

    /* Fabric ComboBox has no onRenderPlaceholder, so we have to do some
       css trickery for an icon */
    const RenderPlaceholder = () => {
        return (
            <div className={classes.placeholder}>
                <FontIcon 
                    className={css(
                        classes.prefixIcon,
                        isFocused && classes.prefixIconFocused
                    )} 
                    iconName={props.prefixIcon}
                />
            </div>
        )
    }

    const onRenderLabel = (labelProps: any, defaultRender: any) => {
        const tokens = getTokens();
        const classes = getClassNames();
        
        return (
            <>
                <Stack horizontal>
                    <span>
                        {defaultRender(labelProps)}
                    </span>
                    <IconButton
                        id={iconButtonId}
                        iconProps={{ iconName: props.icon }}
                        title={props.iconButtonTitle}
                        ariaLabel={props.iconButtonAriaLabel}
                        onClick={onIconClick}
                        className={classes.iconButton}
                    />
                </Stack>
                {isCalloutVisible && (
                    <Callout
                        target={`#${iconButtonId}`}
                        setInitialFocus={true}
                        directionalHint={props.calloutDirection}
                        //onDismiss={_onDismiss}
                        ariaDescribedBy={descriptionId}
                        role="alertdialog"
                    >
                        <Stack 
                            tokens={tokens.labelStack} 
                            horizontalAlign="start"
                            className={classes.labelStack}
                        >
                            <span id={descriptionId}>{props.calloutText}</span>
                            <DefaultButton 
                                onClick={onDismiss}
                            >
                                Close
                            </DefaultButton>
                        </Stack>
                    </Callout>
                )}
            </>
        )
    };

    const RenderDescription = () => {
        return (
            <Stack>
                <Text className={classes.description}>
                    {props.description}
                </Text>
            </Stack>
        )
    }

    return (
        <>
            <Stack horizontal verticalAlign="end">
                <RenderPlaceholder/>
                <StackItem grow>
                    <ComboBox
                        {...props}
                        onRenderLabel={onRenderLabel}
                        onFocus={() => setFocused(true)}
                        onBlur={() => setFocused(false)}
                        persistMenu={true}
                        styles={comboBoxFabricStyles}
                    />
                </StackItem>
            </Stack>
            
            <RenderDescription/>
        </>
    )
}

export default KiskbaComboBox;