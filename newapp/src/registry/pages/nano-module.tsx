import {registerPageType} from "core";
import {Module, ModuleEntityInfo} from "@apibrew/client/nano/model/module";
import {PrepareGridPage} from "../../dashboard/components/grid-page/GridPage.tsx";
import {NanoModuleForm} from "../../dashboard/components/nano-module/NanoModuleForm.tsx";

registerPageType('Nano Module', 'nano-module', PrepareGridPage<Module>({
    entityInfo: ModuleEntityInfo,
    recordForm: NanoModuleForm,
    gridColumns: ['name', 'language', 'version']
}))
