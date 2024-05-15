import {registerPageType} from "core";
import {PrepareGridPage} from "../../components/grid-page/GridPage.tsx";
import {Action, ActionEntityInfo} from "@apibrew/client/nano/model/action";
import {NanoActionForm} from "../../components/nano-action/NanoActionForm.tsx";

registerPageType('Nano Action', 'nano-action', PrepareGridPage<Action>({
    entityInfo: ActionEntityInfo,
    recordForm: NanoActionForm,
    gridColumns: ['name', 'language', 'version']
}))
