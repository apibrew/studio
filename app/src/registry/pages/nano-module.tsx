import {registerPageType} from "core";
import {PrepareGridPage} from "../../components/grid-page/GridPage.tsx";
import {Module, ModuleEntityInfo} from "@apibrew/client/nano/model/module";
import {NanoModuleForm} from "../../components/nano-module/NanoModuleForm.tsx";

registerPageType('Nano Module', 'nano-module', PrepareGridPage<Module>({
    entityInfo: ModuleEntityInfo,
    recordForm: NanoModuleForm,
    gridColumns: ['name', 'language', 'version']
}))
