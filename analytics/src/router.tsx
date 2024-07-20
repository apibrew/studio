// import {dashboardRoutes} from "app";
import {DashboardPage} from "./dashboard.tsx";
import {TaskSchedulerPage} from "./pages/task-scheduler/TaskScheduler.tsx";
import {RunPage} from "./pages/task-scheduler/RunPage.tsx";
import {CalculatorPage} from "./pages/calculator/CalculatorPage.tsx";
import {portfolioAnalysis} from "./modules/portfolio-analysis/router.tsx";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {dashboardRoutes} from "app";


export const routes = [
    {
        path: '/',
    },
    {
        ...dashboardRoutes,
        path: '/dashboard',
        element: <DashboardPage/>,
        children: [
            ...dashboardRoutes.children,
            {
                path: 'visualizations',
                element: <div>Visualizations</div>,
            },
            {
                path: 'task-scheduler',
                element: <TaskSchedulerPage/>
            },
            {
                path: 'task-scheduler/runs/:id',
                element: <RunPage/>
            },
            {
                path: 'calculator',
                element: <CalculatorPage/>
            },
            ...portfolioAnalysis
        ]
    }
]
const router = createBrowserRouter(routes)

export function Router() {
    return <RouterProvider router={router}/>
}

