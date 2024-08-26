import {PropertyFormProps, registerSpecialPropertyForm} from "core";
import {Type} from "@apibrew/client/model/resource";
import {FileUploadForm} from "../../dashboard/components/storage/FileForm.tsx";

const FileEditor = (props: PropertyFormProps<object>) => <FileUploadForm value={props.value as any}
                                                                         onChange={updated => props.onChange(updated, true)}/>



// special types
registerSpecialPropertyForm<object>("File Editor", Type.REFERENCE, FileEditor, m => m.property?.reference === 'storage/File')

