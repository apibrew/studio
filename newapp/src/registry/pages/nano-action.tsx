import {registerPageType} from "core";
import {Action, ActionEntityInfo} from "@apibrew/client/nano/model/action";
import {PrepareGridPage} from "../../dashboard/components/grid-page/GridPage.tsx";
import {NanoActionForm} from "../../dashboard/components/nano-action/NanoActionForm.tsx";

registerPageType('Nano Action', 'nano-action', PrepareGridPage<Action>({
    entityInfo: ActionEntityInfo,
    recordForm: NanoActionForm,
    gridColumns: ['name', 'language', 'version']
}))
