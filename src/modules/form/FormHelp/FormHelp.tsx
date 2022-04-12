import FormSection from "@components/form/FormSection";
import KiskbaCardTitle from "@components/ui/KiskbaCardTitle";
import { Stack } from "office-ui-fabric-react";

const FormHelp: React.FunctionComponent<any> = (props) => {
    const {
        kiskbaForm,
        form
    } = props;

    const formHelp = form.help;

    return (
        <div style={{padding: '48px'}}>
            <Stack tokens={{childrenGap: 24}}>
                <KiskbaCardTitle
                    title={formHelp.title}
                    description={formHelp.description}
                />

                {formHelp.sections.map((section: any, sectionIndex: number) => (
                    <div 
                        ref={(ref) => {kiskbaForm.sectionRefs[section.title] = ref}}  
                        key={sectionIndex}
                    >
                        <FormSection
                            key={section.id}
                            index={sectionIndex} 
                            section={section}
                            onInputClick={kiskbaForm.inputClick}
                        />
                    </div>
                ))}
            </Stack>
        </div>
    );
}

export default FormHelp;