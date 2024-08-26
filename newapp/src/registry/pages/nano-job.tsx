import {registerPageType} from "core";
import {Job, JobEntityInfo} from "@apibrew/client/nano/model/job";
import {PrepareGridPage} from "../../dashboard/components/grid-page/GridPage.tsx";
import {NanoJobForm} from "../../dashboard/components/nano-job/NanoJobForm.tsx";

registerPageType('Nano Job', 'nano-job', PrepareGridPage<Job>({
    entityInfo: JobEntityInfo,
    recordForm: NanoJobForm,
    gridColumns: ['name', 'language', 'version']
}))
