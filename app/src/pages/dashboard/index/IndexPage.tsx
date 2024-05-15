import {Grid} from "@mui/material";
import {PageLayout} from "../../../layout/PageLayout";

import {WelcomeWidget} from "../../../components/widgets/WelcomeWidget";
import {HealthWidget} from "../../../components/widgets/HealthWidget";
import {IntegrationsWidget} from "../../../components/widgets/IntegrationsWidget";
import {GeneralStatsWidget} from "../../../components/widgets/GeneralStatsWidget";

export default function IndexPage() {

    const widgets = [
        <WelcomeWidget/>,
        <HealthWidget/>,
        <IntegrationsWidget/>,
        <GeneralStatsWidget/>
    ]

    return <>
        <PageLayout>
            <Grid container spacing={3}>
                {widgets.map((widget, i) => <Grid item key={i} xs={12} sm={6}>{widget}</Grid>)}
            </Grid>
        </PageLayout>
    </>
}
