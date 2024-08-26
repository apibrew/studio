import {registerPageType} from "core";
import {PrepareGridPage} from "../../dashboard/components/grid-page/GridPage.tsx";
import {File, FileEntityInfo} from "../../dashboard/model/file.ts";
import {FileUploadForm} from "../../dashboard/components/storage/FileForm.tsx";

registerPageType('Storage', 'storage', PrepareGridPage<File>({
    entityInfo: FileEntityInfo,
    recordForm: FileUploadForm,
    gridColumns: ['name', 'version']
}))
