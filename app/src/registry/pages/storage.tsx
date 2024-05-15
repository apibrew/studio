import {registerPageType} from "core";
import {PrepareGridPage} from "../../components/grid-page/GridPage.tsx";
import {File, FileEntityInfo} from "../../model/file";
import {FileUploadForm} from "../../components/storage/FileForm.tsx";

registerPageType('Storage', 'storage', PrepareGridPage<File>({
    entityInfo: FileEntityInfo,
    recordForm: FileUploadForm,
    gridColumns: ['name', 'version']
}))
