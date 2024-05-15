import {registerPageType} from "core";
import {PrepareGridPage} from "../../components/grid-page/GridPage.tsx";
import {CronJob, CronJobEntityInfo} from "@apibrew/client/nano/model/cron-job";
import {NanoCronJobForm} from "../../components/nano-cron-job/NanoCronJobForm.tsx";

registerPageType('Nano Cron Job', 'nano-cron-job', PrepareGridPage<CronJob>({
    entityInfo: CronJobEntityInfo,
    recordForm: NanoCronJobForm,
    gridColumns: ['name', 'language', 'version']
}))
