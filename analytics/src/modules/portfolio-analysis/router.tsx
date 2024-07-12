import {Layout} from "./Layout.tsx";
import {MarginSimulatorPage} from "./pages/margin-simulator/MarginSimulatorPage.tsx";

export const portfolioAnalysis = [
    {
        path: 'portfolio-analysis',
        element: <Layout/>,
        children: [
            {
                path: 'margin-simulator',
                element: <MarginSimulatorPage/>
            }
        ],
    },
]
