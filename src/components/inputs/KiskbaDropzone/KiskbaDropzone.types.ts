import { DropzoneOptions } from 'react-dropzone';

export interface KiskbaDropzoneProps extends DropzoneOptions {
    id?: string;
    name?: string;
}