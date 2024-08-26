import {registerPageType} from "core";
import {Code, CodeEntityInfo} from "@apibrew/client/nano/model/code";
import {PrepareGridPage} from "../../dashboard/components/grid-page/GridPage.tsx";
import {NanoForm2} from "app/src/components/nano-form/NanoForm2.tsx";

registerPageType('Nano Code', 'nano-code', PrepareGridPage<Code>({
    entityInfo: CodeEntityInfo,
    recordForm: NanoForm2,
    gridColumns: ['name', 'language', 'version']
}))
