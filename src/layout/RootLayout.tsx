import React from "react";
import {Toaster} from "react-hot-toast";

export interface RootLayoutProps {
    children: React.ReactNode;
}

export function RootLayout(props: RootLayoutProps) {
    return <>
        <Toaster/>
        {props.children}
    </>
}