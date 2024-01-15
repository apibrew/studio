import React from "react";

export interface RootLayoutProps {
    children: React.ReactNode;
}

export function RootLayout(props: RootLayoutProps) {
    return <>
        {props.children}
    </>
}