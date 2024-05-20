import {registerPageType} from "core";
import {ActionResourcePage} from "../../components/action-resource-page/ActionResourcePage.tsx";

registerPageType('Action Pages', 'action-pages', ActionResourcePage)
registerPageType('Action Pages', 'action-pages/:namespace/:resource', ActionResourcePage)
