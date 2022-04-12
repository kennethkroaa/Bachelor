import FormSection from "@components/form/FormSection";
import KiskbaCardTitle from "@components/ui/KiskbaCardTitle";
import { Stack } from "office-ui-fabric-react";

const FormFiles: React.FunctionComponent<any> = (props) => {
    const {
        kiskbaForm,
        form
    } = props;

    const FilesSection = () => {
        return (
            <div></div>
        )
    }

    const sections = [
        {
            title: 'Uploaded',
            id: 'uploaded',
            description: 'Some well-written text here.',
            component: FilesSection
        }
    ];

    return (
        <div style={{padding: '48px'}}>
            <Stack tokens={{childrenGap: 24}}>
                <KiskbaCardTitle
                    title="Files"
                    description={form.component.description}
                />

                {sections.map((section: any, sectionIndex: number) => (
                    <div 
                        ref={(ref) => {kiskbaForm.sectionRefs[section.title] = ref}}  
                        key={sectionIndex}
                    >
                        <FormSection
                            hideIndex
                            index={sectionIndex} 
                            section={section}
                            Component={section.component}
                            onInputClick={kiskbaForm.inputClick}
                        />
                    </div>
                ))}
            </Stack>
        </div>
    );
}

export default FormFiles;