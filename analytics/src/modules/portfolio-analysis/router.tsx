import {Layout} from "./Layout.tsx";
import {MarginSimulatorPage} from "./pages/margin-simulator/MarginSimulatorPage";
import {MarginSimulator2Page} from "./pages/margin-simulator-2/MarginSimulatorPage";

export const portfolioAnalysis = [
    {
        path: 'portfolio-analysis',
        element: <Layout/>,
        children: [
            {
                path: 'margin-simulator',
                element: <MarginSimulatorPage/>
            },
            {
                path: 'margin-simulator-2/:id',
                element: <MarginSimulator2Page/>
            },
        ],
    },
]
