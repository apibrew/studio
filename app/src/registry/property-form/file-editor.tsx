import {PropertyFormProps, registerSpecialPropertyForm} from "core";
import {FileUploadForm} from "../../components/storage/FileUpload.tsx";
import {Type} from "@apibrew/client/model/resource";

const FileEditor = (props: PropertyFormProps<object>) => <FileUploadForm value={props.value as any}
                                                                         onChange={updated => props.onChange(updated, true)}/>



// special types
registerSpecialPropertyForm<object>("File Editor", Type.REFERENCE, FileEditor, m => m.property?.reference === 'storage/File')

