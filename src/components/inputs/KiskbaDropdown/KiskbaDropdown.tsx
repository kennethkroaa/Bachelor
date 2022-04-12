import { Callout, css, DefaultButton, DirectionalHint, Dropdown, FontIcon, getId, Icon, IconButton, IDropdownOption, IDropdownProps, Stack, Text } from 'office-ui-fabric-react';
import React, { useState } from 'react';
import { getClassNames, getTokens } from './KiskbaDropdown.styles';
import { KiskbaDropdownProps } from './KiskbaDropdown.types';

const KiskbaDropdown: React.FunctionComponent<KiskbaDropdownProps> = (props) => {
    const [ isCalloutVisible, setCalloutVisible ] = useState(false);

    const classes = getClassNames();

    const descriptionId: string = getId('description');
    const iconButtonId: string = getId('iconButton');

    const onIconClick = (): void => {
        setCalloutVisible(!isCalloutVisible);
    }

    const onDismiss = (): void => {
        setCalloutVisible(false);
    }

    const RenderDescription = (descriptionProps: any) => {
        const classes = getClassNames();
    
        const errorList = props.errors?.map((error: string) => (
            <Text key={error} className={classes.errorMessage}>
                <FontIcon iconName={"Error"} className={classes.errorMessageIcon}/>
                {error}
            </Text>
        ));
    
        return (
            <Stack>
                <Text className={classes.description}>
                    {props.description}
                </Text>
                {errorList}
            </Stack>
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

    const onRenderPlaceholder = (placeholderProps?: IDropdownProps) => {
        return (
            <>
                <Icon 
                    className={classes.prefixIcon} 
                    iconName={props.prefixIcon} 
                    aria-hidden="true" 
                />
                <span className={classes.placeholder}>
                    {placeholderProps && placeholderProps.placeholder}
                </span>
            </>
        );
    };

    const onRenderTitle = (titleProps?: IDropdownOption[]) => {
        return (
            <>
                {titleProps && 
                    <>
                        {props.flag ?
                            (
                                <span className={
                                    css(`flag-icon flag-icon-${titleProps[0].key}`, classes.flagIcon)
                                }></span>
                            ) : (
                                <Icon 
                                    className={classes.prefixIcon} 
                                    iconName={props.prefixIcon} 
                                    aria-hidden="true" 
                                />
                            )
                        }
                        <span className={css(props.flag && classes.selected, !props.flag && classes.test)}>
                            {titleProps && titleProps[0].text}
                        </span>
                    </>
                }
            </>
        )
    }

    return (
        <>
            <Dropdown 
                { ...props }
                defaultSelectedKey={props.value?.toLowerCase()}
                selectedKey={props.value?.toLowerCase()}
                onRenderLabel={onRenderLabel}
                onRenderPlaceholder={onRenderPlaceholder}
                onRenderTitle={onRenderTitle}
                calloutProps={{
                    calloutMaxHeight: 400
                }}
            />
            <RenderDescription/>
        </>
    )
}

KiskbaDropdown.displayName = "KiskbaDropdown";

KiskbaDropdown.defaultProps = {
    calloutDirection: DirectionalHint.topRightEdge,
    icon: "Info",
    iconButtonTitle: "Info",
    iconButtonAriaLabel: "Info"
}

export default KiskbaDropdown;