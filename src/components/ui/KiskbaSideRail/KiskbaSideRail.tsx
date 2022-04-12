import { scrollToRef } from '@util/Scroll';
import { css, FocusZone, FocusZoneDirection, FontIcon, Stack, Text } from 'office-ui-fabric-react';
import React, { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { getClassNames } from './KiskbaSideRail.styles';
import { IKiskbaSideRailProps, ISideRailLink } from './KiskbaSideRail.types';

const KiskbaSideRail: React.FunctionComponent<IKiskbaSideRailProps> = (props) => {
    const [ sections, setSections ] = useState<ISideRailLink[]>([]);
    const { errors } = useFormContext();
    const classes = getClassNames();

    /* Populate siderail with section names and refs on component load */
    useEffect(() => {
        const values = Object.entries(props.refs).map((key, value) => {
            return {
                text: key[0],
                ref: key[1],
                selected: value == 0 ? true : false
            } as ISideRailLink
        })
        
        setSections(values);
    }, []);

    /* Check current selected section from props and set selected section accordingly */
    useEffect(() => {
        const section = props.selectedSection;

        //Selected section starts as an empty string due to the first one being selected by default
        /*
        if(section){
            setSections(sections.map(item => 
                item.text === section ? 
                { ...item, selected: true} : 
                { ...item, selected: false}
            ))
        }
        */
    }, [props.selectedSection])

    /* Set and scroll to clicked section */
    const onSectionClick = (section: ISideRailLink): void => {
        scrollToRef(section.ref);
        
        setSections(sections.map(item => 
            item.text === section.text ? 
            { ...item, selected: true} : 
            { ...item, selected: false}
        ))
    }

    /* Render errors in the siderail that appear in each section */
    const RenderErrors = ( { sectionName }: any ) => {
        const sectionErrors: string[] = [];

        /*
            At the end of the project, as with FormSection, we noticed errors
            didn't properly work after changing names from e.g.
            ClaimantFirstName to claimant.fullName.firstName. Due to this,
            we have to make a hacky quick workaround to make it work
            through Object.byString (defined in FormSection)
            *NOT* ideal. But theres a couple days to delivery and it needs to work!
        */
        props.fields.map((field: any) => {
            if(field.sectionName === sectionName){
                field.sectionFields.map((sectionField: any) => {
                    //@ts-ignore
                    const error = Object.byString(errors, sectionField);

                    if(error){
                        error.message.map((message: string) => {
                            sectionErrors.push(message);                      
                        })
                    }
                })
            }
        });

        /*
        //Gets the field ID and error messages associated to the field
        for(let [errorField, errorMessages] of Object.entries(errors)){
            //Loop through all existing field names
            props.fields.map((field: any) => {
                //Make sure we're only checking for the current section
                if(sectionName === field.sectionName){
                    //If this section contains the field ID, add errors to array
                    if(field.sectionFields.includes(errorField)){
                        (errorMessages as any).message.map((message: string) => {
                            sectionErrors.push(message);                      
                        })
                    }
                }
            })
        }
        */

        return (
            <>
                {sectionErrors.map((message: string) => {
                    return (
                        <Text className={classes.errorMessage} key={message}>
                            <FontIcon 
                                iconName={"Error"} 
                                className={classes.errorMessageIcon}
                            />
                            {message}
                        </Text>
                    )
                })}
            </>
        )
    }

    //TODO: "Stepper" functionality
    const RenderStepperList = () => {
        const steps = props.stepper.map((step: any) => (
            <li
                key={step.title} 
                className={css(classes.linkWrapper, classes.sectionLinkWrapper)}
            >
                <div className={css(
                    classes.sectionLink,
                    step.disabled && classes.disabledStep
                )}>
                    {step.completed && 
                        <FontIcon 
                            iconName={"SkypeCircleCheck"} 
                            className={classes.stepCheckIcon}
                        />
                    }
                    {step.title}
                </div>
            </li>
        ));

        return (
            <div className={classes.section}>
                <Text as="h3" className={classes.sectionTitle}>
                    Steps
                </Text>
                <ul className={classes.links}>
                    {steps}                  
                </ul>
            </div>
        )        
    }

    /* Render the list of sections and their errors */
    const RenderSectionList = () => {
        const links = sections.map((section: ISideRailLink) => (
            <li 
                key={section.text} 
                className={css(classes.linkWrapper, classes.sectionLinkWrapper)}
                onClick={() => onSectionClick(section)}
            >
                <div className={css(
                    classes.sectionLink, 
                    section.selected && classes.sectionLinkActive
                )}>
                    <Stack>
                        {section.text}
                        <RenderErrors sectionName={section.text}/>
                    </Stack>
                </div>
            </li>
        ));

        return (
            <div className={classes.section}>
                <Text as="h3" className={classes.sectionTitle}>
                    On this page
                </Text>
                <ul className={classes.links}>
                    {links}
                </ul>
            </div>
        )
    }

    return (
        <FocusZone direction={FocusZoneDirection.vertical}>
            {props.stepper && <RenderStepperList/>}
            <RenderSectionList/>
        </FocusZone>
    )
}

export default KiskbaSideRail;