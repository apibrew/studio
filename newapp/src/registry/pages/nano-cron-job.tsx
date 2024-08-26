import {registerPageType} from "core";
import {CronJob, CronJobEntityInfo} from "@apibrew/client/nano/model/cron-job";
import {PrepareGridPage} from "../../dashboard/components/grid-page/GridPage.tsx";
import {NanoCronJobForm} from "../../dashboard/components/nano-cron-job/NanoCronJobForm.tsx";

registerPageType('Nano Cron Job', 'nano-cron-job', PrepareGridPage<CronJob>({
    entityInfo: CronJobEntityInfo,
    recordForm: NanoCronJobForm,
    gridColumns: ['name', 'language', 'version']
}))
