import * as React from "react";
import {createRoot} from "react-dom/client";
import {createBrowserRouter, Link, RouterProvider,} from "react-router-dom";
import Button from "@mui/material/Button";

const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <div>
                <h1>Hello World</h1>
                <Link to="about">About Us</Link>
            </div>
        ),
    },
    {
        path: "about",
        element: <div>
            <Link to="/">Home</Link>
            <Button variant='contained'>aaa</Button>
            About
        </div>,
    },
]);

createRoot(document.getElementById("root")!).render(
    <RouterProvider router={router}/>
);
