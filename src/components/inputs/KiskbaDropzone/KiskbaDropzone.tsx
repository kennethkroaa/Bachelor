import KiskbaTable from '@components/tables/KiskbaTable';
import bytes from "bytes";
import { ActionButton, css, FontIcon, IColumn, SelectionMode, Stack, Text } from 'office-ui-fabric-react';
import { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useFormContext } from 'react-hook-form';
import { getClassNames } from './KiskbaDropzone.styles';
import { KiskbaDropzoneProps } from './KiskbaDropzone.types';

const KiskbaDropzone: React.FunctionComponent<KiskbaDropzoneProps> = (props) => {
    const [droppedFiles, setDroppedFiles] = useState<any>([]);
    const { setValue } = useFormContext();

    const fileColumns: IColumn[]  = [
        {
            key: 'fileicon',
            name: 'File Type',
            iconName: 'Page',
            isIconOnly: true,
            fieldName: 'name',
            minWidth: 16,
            maxWidth: 16,
            onRender: (file: File) => {
                /* 
                    We *could* go by file.type and use Fabric UI's icons for different file types,
                    but this involves some specific license and rules to go with.
                */
                return (
                    <FontIcon iconName="Page"/>
                )
            }
        },
        {
            key: 'filename',
            name: 'File name',
            fieldName: 'name',
            isResizable: false,
            minWidth: 100
        },
        {
            key: 'filesize',
            name: 'File size',
            fieldName: 'size',
            isResizable: false,
            minWidth: 100,
            onRender: (item: File) => {
                return (
                    <>
                        {/* Format byte size to something readable */}
                        {bytes(item.size, { 
                            unitSeparator: ' ',
                            fixedDecimals: true,
                            decimalPlaces: 2
                        })}
                    </>
                )
            }
        }, {
            key: 'remove',
            name: '',
            fieldName: 'remove',
            isResizable: false,
            minWidth: 80,
            onRender: (item: File) => {
                /* Button to remove a dropped file from the list */
                return (
                    <ActionButton
                        style={{
                            margin: '-10px',
                            padding: '-10px',
                            fontSize: '12px'
                        }}
                        iconProps={{iconName: 'Delete'}}
                        onClick={removeDroppedFile(item)}
                    >
                        Remove
                    </ActionButton>
                )
            }
        }
    ]

    const onDrop = (acceptedFiles: any) => {-
        setDroppedFiles([...droppedFiles, ...acceptedFiles]);

        //Due to our data format we haven't had time to set up proper handling
        //of custom data types, so we directly set the form data here as well
        setFormFiles([...droppedFiles, ...acceptedFiles]);
    };

    /*
        Ideally, we would upload files to the backend whenever somebody added a file to the Dropzone.
        We didn't focus development time on this, and currently /attempt/ to store the data URI
        inside the redux store. This doesn't go well when using large files as we exceed the 
        localStorage quota through Redux-Persist.
        Inside the form saga, we convert the data URI to a blob and send it to the backend.
    */
    const setFormFiles = (files: File[]) => {
        let fileValues: any = [];

        files.forEach((file) => {
            const reader = new FileReader();

            reader.onabort = () => console.log("File reading aborted");
            reader.onerror = () => console.log("File reading failed");
            reader.onload = () => {
                const binaryStr = reader.result;
                fileValues.push({
                    lastModified: file.lastModified,
                    name: file.name,
                    size: file.size,
                    type: file.type,
                    data: binaryStr
                })
            }

            reader.readAsDataURL(file);
        })

        //Set the React-Hook-Form value of this dropzone
        setValue((props.name as string), fileValues);
    }

    /* useDropzone hook that can take multiple files */
    const {
        open,
        getRootProps, 
        getInputProps, 
        isDragActive,
        isDragAccept,
        isDragReject
    } = useDropzone({
        onDrop,
        ...props,
        /* Ensure direct user interaction for file upload */
        noClick: true,
        noKeyboard: true,
        multiple: true
    });

    const classes = getClassNames();
    const { ref, ...rootProps } = getRootProps();

    const removeDroppedFile = (file: File) => (event: React.MouseEvent<HTMLButtonElement>) => {
        setDroppedFiles(droppedFiles.filter((droppedFile: any) => 
            droppedFile !== file
        ));
    }

    const removeAllDroppedFiles = () => {
        setDroppedFiles([]);
    }

    return (
        <Stack itemRef={ref}>
            <Stack 
                className={css(
                    classes.container,
                    isDragActive && classes.dragActive,
                    isDragAccept && classes.dragAccept,
                    isDragReject && classes.dragReject
                )} 
                { ...rootProps }
            >
                <input { ...getInputProps() }/>
                    
                <FontIcon iconName="CloudUpload" className={classes.uploadIcon} />

                <Text className={classes.containerText}>
                    Drag and drop or 
                    <ActionButton
                        className={classes.fileBrowserButton}
                        onClick={open}
                    >
                        browse
                    </ActionButton>
                    files to upload
                </Text>
            </Stack>
            {droppedFiles.length > 0 &&
                <KiskbaTable
                    items={droppedFiles}
                    columns={fileColumns}
                    selectionMode={SelectionMode.none}
                    compact={true}
                />
            }
        </Stack>
    )
};

export default KiskbaDropzone;