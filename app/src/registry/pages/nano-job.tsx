import {registerPageType} from "core";
import {PrepareGridPage} from "../../components/grid-page/GridPage.tsx";
import {Job, JobEntityInfo} from "@apibrew/client/nano/model/job";
import {NanoJobForm} from "../../components/nano-job/NanoJobForm.tsx";

registerPageType('Nano Job', 'nano-job', PrepareGridPage<Job>({
    entityInfo: JobEntityInfo,
    recordForm: NanoJobForm,
    gridColumns: ['name', 'language', 'version']
}))
