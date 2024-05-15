import {registerPageType} from "core";
import {PrepareGridPage} from "../../components/grid-page/GridPage.tsx";
import {Code, CodeEntityInfo} from "@apibrew/client/nano/model/code";
import {NanoForm2} from "../../components/nano-form/NanoForm2.tsx";

registerPageType('Nano Code', 'nano-code', PrepareGridPage<Code>({
    entityInfo: CodeEntityInfo,
    recordForm: NanoForm2,
    gridColumns: ['name', 'language', 'version']
}))
