import FormSectionContent from "@components/form/FormSectionContent";
import KiskbaCard from "@components/ui/KiskbaCard";
import { Card } from "@uifabric/react-cards";
import { KiskbaAnimationStyles } from "@util/Animation";
import { Stack, Text } from "office-ui-fabric-react";
import { IKiskbaFormItem } from "src/data/forms/types";
import { FormSectionProps } from "./FormSection.types";

/**
 *  FormSection is compromised of a parent Card component, with
    FormSectionContent or FormSectionStack for Flex-based content as children

    These are used to display sections that can be linked together with
    KiskbaSiderail for displaying functionality such as "On this page"

    Can either display content based on section IKiskbaFormSection prop 
    or a custom Component prop
*/

const FormSection = ({ section, index, onInputClick, Component, hideIndex = false }: FormSectionProps) => (
    <KiskbaCard
        animation={KiskbaAnimationStyles.slideUpIn100}
        animationDelay={`${index * 100}ms`} 
    >
        {/* Card Title and Description  */}
        <Card.Item>
            <Stack tokens={{ childrenGap: 12 }}>
                <Text variant={"xLarge"}>
                    {!hideIndex && `${index + 1}.`} {section.title}
                </Text>
                {section.description &&
                    <Text>{section.description}</Text>
                }
            </Stack>
        </Card.Item>
        {/* Card Content */}
        <Card.Item>
            <Stack tokens={{ childrenGap: 8 }}>
                {Component ? (
                    <Component/>
                ) : (
                    <>
                        {section?.items?.map((item: IKiskbaFormItem, itemIndex: number) => (
                            <FormSectionContent 
                                item={item} 
                                sectionTitle={section.title} 
                                onInputClick={onInputClick}
                                key={itemIndex}
                            />
                        ))}
                    </>
                )}
            </Stack>
        </Card.Item>
    </KiskbaCard>
)

export default FormSection;